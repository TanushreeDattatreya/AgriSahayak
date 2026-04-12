from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    with open(f"uploads/{file.filename}", "wb") as buffer:
        buffer.write(await file.read())

    return {"message": "Received"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
