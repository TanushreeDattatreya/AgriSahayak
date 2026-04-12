from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import assemblyai as aai
import ollama
from elevenlabs import generate, stream
import asyncio

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set API keys
aai.settings.api_key = "ASSEMBLYAI_API_KEY"
ELEVENLABS_API_KEY = "ELEVENLABS_API_KEY"

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

manager = ConnectionManager()

# Real-time transcription handler
def on_data(transcript: aai.RealtimeTranscript):
    if not transcript.text:
        return
    if isinstance(transcript, aai.RealtimeFinalTranscript):
        return transcript.text
    return None

# WebSocket endpoint for real-time communication
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Start transcription
            transcriber = aai.RealtimeTranscriber(
                sample_rate=16_000,
                on_data=on_data,
            )
            transcriber.connect()

            # Stream microphone input
            microphone_stream = aai.extras.MicrophoneStream(sample_rate=16_000)
            transcriber.stream(microphone_stream)

            # Wait for transcription
            while True:
                data = await websocket.receive_text()
                if data == "start":
                    transcriber.start()
                elif data == "stop":
                    transcriber.stop()
                    break

            # Get AI response
            response = ollama.chat(
                model="deepseek-r1:7b",
                messages=[{"role": "user", "content": transcript.text}],
            )
            ai_response = response["message"]["content"]

            # Stream AI response as audio
            audio_stream = generate(
                api_key=ELEVENLABS_API_KEY,
                text=ai_response,
                voice="Eleven Turbo v2",
                stream=True,
            )
            stream(audio_stream)

            # Send AI response to frontend
            await manager.send_message(ai_response, websocket)

    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Run the backend
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)