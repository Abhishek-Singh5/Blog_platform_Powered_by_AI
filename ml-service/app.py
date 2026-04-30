from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import HybridRecommender
import os

app = Flask(__name__)
CORS(app)
recommender = HybridRecommender()

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    user_id     = data.get("userId")
    blog_id     = data.get("blogId")      # current blog (for content-based)
    blogs       = data.get("blogs", [])   # all blogs from MongoDB
    interactions= data.get("interactions", [])  # all user interactions
    top_n       = data.get("topN", 5)

    results = recommender.recommend(
        user_id=user_id,
        current_blog_id=blog_id,
        blogs=blogs,
        interactions=interactions,
        top_n=top_n
    )
    return jsonify({"recommendations": results})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(port=5001, debug=True)