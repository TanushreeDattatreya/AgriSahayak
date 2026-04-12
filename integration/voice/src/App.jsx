import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const VoiceAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to WebSocket server
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);

        // Listen for AI responses
        newSocket.on('ai_response', (data) => {
            setConversation((prev) => [...prev, { speaker: 'AI', text: data }]);
        });

        return () => newSocket.close();
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleVoiceInput = () => {
        if (socket) {
            // Send a message to start transcription
            socket.emit('start');
        }
    };

    return (
        <div>
            <button onClick={togglePopup} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                Voice Assistant
            </button>
            {isOpen && (
                <div style={{ position: 'fixed', bottom: '80px', right: '20px', width: '300px', height: '400px', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    <div style={{ padding: '10px', height: 'calc(100% - 60px)', overflowY: 'auto' }}>
                        {conversation.map((msg, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <strong>{msg.speaker}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleVoiceInput} style={{ width: '100%', padding: '10px' }}>
                        Start Speaking
                    </button>
                </div>
            )}
        </div>
    );
};

export default VoiceAssistant;