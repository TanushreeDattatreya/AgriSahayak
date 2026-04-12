from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from pydantic import BaseModel
import tweepy
import yaml

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # Allow requests from your React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load credentials
creds = yaml.load(open(r'C:\Users\swana\OneDrive\Desktop\Project Farming\integration\social posting\xand\social_credentials.yml'), Loader=yaml.FullLoader)

# Pydantic model for request body
class TweetRequest(BaseModel):
    message: str
    media_path: str = None

# Twitter connection functions
def twitConnection(creds):
    consumer_key = creds['twitter']['consumer_key']
    consumer_secret = creds['twitter']['consumer_secret']
    access_token = creds['twitter']['access_token']
    access_secret = creds['twitter']['access_secret']
    
    client = tweepy.Client(
        consumer_key=consumer_key, consumer_secret=consumer_secret,
        access_token=access_token, access_token_secret=access_secret
    )
    return client

def twitConnection_v1(creds):
    consumer_key = creds['twitter']['consumer_key']
    consumer_secret = creds['twitter']['consumer_secret']
    access_token = creds['twitter']['access_token']
    access_secret = creds['twitter']['access_secret']
    
    auth = tweepy.OAuth1UserHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_secret)
    return tweepy.API(auth)

# Endpoint to post a tweet
@app.post("/post_tweet")
async def post_tweet(tweet_request: TweetRequest):
    try:
        client = twitConnection(creds)
        client_v1 = twitConnection_v1(creds)

        if tweet_request.media_path:
            media = client_v1.media_upload(filename=tweet_request.media_path)
            media_id = media.media_id
            response = client.create_tweet(text=tweet_request.message, media_ids=[media_id])
        else:
            response = client.create_tweet(text=tweet_request.message)

        return {"status": "success", "tweet_id": response.data['id']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)