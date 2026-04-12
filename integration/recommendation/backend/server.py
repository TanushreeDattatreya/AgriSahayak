

# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from typing import List

# app = FastAPI()

# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allows all origins
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers
# )

# # Load the dataset (adjust path as needed)
# try:
#     df = pd.read_excel(r"C:\Users\swana\OneDrive\Desktop\Project Farming\integration\recommendation\backend\Schemes.xlsx")
#     df.fillna("", inplace=True)  # Replace NaN with empty strings
# except Exception as e:
#     raise HTTPException(status_code=500, detail=f"Error loading dataset: {str(e)}")

# # Create a combined text field from various scheme attributes
# df["combined_text"] = (
#     df["Purpose"] + " " +
#     df["Financial Support"] + " " +
#     df["Type of Benefit"] + " " +
#     df["Target Group"] + " " +
#     df["Eligibility Criteria"] + " " +
#     df["Mandatory Requirement"].astype(str) + " " +
#     df["Voluntary Option"].astype(str) + " " +
#     df["Special Features"]
# )

# # Initialize and fit the TF-IDF vectorizer on the combined text
# tfidf = TfidfVectorizer(stop_words="english")
# tfidf_matrix = tfidf.fit_transform(df["combined_text"])

# # Pydantic model for request body
# class QueryRequest(BaseModel):
#     queries: List[str]

# # Function to recommend schemes based on multiple user queries
# def recommend_schemes(user_queries, top_n=3):
#     all_recommendations = []
#     for query in user_queries:
#         # Transform the user query into the TF-IDF vector space
#         query_vec = tfidf.transform([query])
#         # Calculate cosine similarity between the query and all schemes
#         similarity_scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
#         # Get the indices of the top matching schemes
#         top_indices = similarity_scores.argsort()[::-1][:top_n]
#         recommendations = df.iloc[top_indices][["Scheme Name", "Purpose", "Financial Support"]]
#         all_recommendations.extend(recommendations.to_dict(orient="records"))
#     # Remove duplicates
#     unique_recommendations = [dict(t) for t in {tuple(d.items()) for d in all_recommendations}]
#     return unique_recommendations[:top_n]

# # Endpoint to handle user queries
# @app.post("/recommend-schemes/")
# async def get_recommendations(query_request: QueryRequest):
#     try:
#         # Get recommendations for the user queries
#         recommendations = recommend_schemes(query_request.queries, top_n=3)
#         return {"queries": query_request.queries, "recommendations": recommendations}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Run the FastAPI app
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load the dataset (adjust path as needed)
try:
    df = pd.read_excel(r"C:\Users\swana\OneDrive\Desktop\Project Farming\integration\recommendation\backend\Schemes.xlsx")
    df.fillna("", inplace=True)  # Replace NaN with empty strings
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error loading dataset: {str(e)}")

# Create a combined text field from various scheme attributes
df["combined_text"] = (
    df["Purpose"] + " " +
    df["Financial Support"] + " " +
    df["Type of Benefit"] + " " +
    df["Target Group"] + " " +
    df["Eligibility Criteria"] + " " +
    df["Mandatory Requirement"].astype(str) + " " +
    df["Voluntary Option"].astype(str) + " " +
    df["Special Features"]
)

# Initialize and fit the TF-IDF vectorizer on the combined text
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(df["combined_text"])

# Pydantic model for request body
class QueryRequest(BaseModel):
    queries: List[str]

# Function to recommend schemes based on multiple user queries
def recommend_schemes(user_queries, top_n=3):
    all_recommendations = []
    for query in user_queries:
        # Transform the user query into the TF-IDF vector space
        query_vec = tfidf.transform([query])
        # Calculate cosine similarity between the query and all schemes
        similarity_scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
        # Get the indices of the top matching schemes
        top_indices = similarity_scores.argsort()[::-1][:top_n]
        recommendations = df.iloc[top_indices][["Scheme Name", "Purpose", "Financial Support", "Eligibility Criteria", "Target Group"]]
        all_recommendations.extend(recommendations.to_dict(orient="records"))
    # Remove duplicates
    unique_recommendations = [dict(t) for t in {tuple(d.items()) for d in all_recommendations}]
    return unique_recommendations[:top_n]

# Endpoint to handle user queries
@app.post("/recommend-schemes/")
async def get_recommendations(query_request: QueryRequest):
    try:
        # Get recommendations for the user queries
        recommendations = recommend_schemes(query_request.queries, top_n=3)
        return {"queries": query_request.queries, "recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)