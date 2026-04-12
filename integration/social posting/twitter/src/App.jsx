import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [mediaPath, setMediaPath] = useState('');
  const [response, setResponse] = useState('');

  const handlePostTweet = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/post_tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          media_path: mediaPath,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponse(`Tweet posted successfully! Tweet ID: ${data.tweet_id}`);
      } else {
        setResponse(`Error: ${data.detail}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Twitter Poster</h1>
      <div>
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Media Path (optional):
          <input
            type="text"
            value={mediaPath}
            onChange={(e) => setMediaPath(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handlePostTweet}>Post Tweet</button>
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;