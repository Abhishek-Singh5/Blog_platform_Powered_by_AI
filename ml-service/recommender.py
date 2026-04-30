import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict

class HybridRecommender:
    def __init__(self, content_weight=0.5, collab_weight=0.5):
        self.content_weight = content_weight
        self.collab_weight  = collab_weight
        self.vectorizer     = TfidfVectorizer(stop_words="english", max_features=5000)

    # ─── Content-Based ──────────────────────────────────────────────────────
    def _build_tfidf_matrix(self, blogs):
        """Combine title + tags + body snippet into one text field per blog."""
        corpus = []
        for b in blogs:
            tags    = " ".join(b.get("tags", []))
            snippet = (b.get("content") or "")[:500]   # first 500 chars
            text    = f"{b['title']} {tags} {snippet}"
            corpus.append(text)
        return self.vectorizer.fit_transform(corpus)

    def _content_scores(self, current_idx, tfidf_matrix, n_blogs):
        """Return cosine similarity of all blogs against the current blog."""
        sim = cosine_similarity(
            tfidf_matrix[current_idx], tfidf_matrix
        ).flatten()
        return sim

    # ─── Collaborative Filtering ────────────────────────────────────────────
    def _build_interaction_matrix(self, blogs, interactions):
        """Build a user × blog score matrix from raw interaction events."""
        blog_ids = [b["_id"] for b in blogs]
        blog_idx = {bid: i for i, bid in enumerate(blog_ids)}

        user_scores = defaultdict(lambda: np.zeros(len(blogs)))

        for event in interactions:
            uid  = event.get("userId")
            bid  = event.get("blogId")
            kind = event.get("type")          # "view" | "like" | "share" | "subscribe"
            if bid not in blog_idx:
                continue
            weight = {"view": 1, "like": 3, "share": 5, "subscribe": 4}.get(kind, 1)
            user_scores[uid][blog_idx[bid]] += weight

        return user_scores, blog_idx

    def _collab_scores(self, user_id, user_scores, n_blogs):
        """
        Item-based CF: find users similar to target user,
        then score blogs by weighted neighbour preferences.
        Falls back to zeros if user has no history.
        """
        if user_id not in user_scores or not user_scores:
            return np.zeros(n_blogs)

        target_vec = user_scores[user_id].reshape(1, -1)
        other_ids  = [uid for uid in user_scores if uid != user_id]

        if not other_ids:
            return np.zeros(n_blogs)

        other_matrix = np.vstack([user_scores[uid] for uid in other_ids])
        sims = cosine_similarity(target_vec, other_matrix).flatten()

        # Weighted sum of neighbour vectors
        scores = np.dot(sims, other_matrix)
        # Zero out blogs the user already interacted with
        scores[user_scores[user_id] > 0] = 0
        return scores

    # ─── Hybrid ─────────────────────────────────────────────────────────────
    def recommend(self, user_id, current_blog_id, blogs, interactions, top_n=5):
        if not blogs:
            return []

        blog_ids = [b["_id"] for b in blogs]

        # ── Content scores
        tfidf_matrix = self._build_tfidf_matrix(blogs)
        current_idx  = blog_ids.index(current_blog_id) if current_blog_id in blog_ids else 0
        c_scores     = self._content_scores(current_idx, tfidf_matrix, len(blogs))

        # ── Collaborative scores
        user_scores, _ = self._build_interaction_matrix(blogs, interactions)
        cf_scores       = self._collab_scores(user_id, user_scores, len(blogs))

        # ── Normalise each to [0, 1]
        def normalise(arr):
            mn, mx = arr.min(), arr.max()
            return (arr - mn) / (mx - mn + 1e-9)

        c_norm  = normalise(c_scores)
        cf_norm = normalise(cf_scores)

        hybrid = self.content_weight * c_norm + self.collab_weight * cf_norm

        # ── Exclude the current blog itself
        hybrid[current_idx] = -1

        top_indices = np.argsort(hybrid)[::-1][:top_n]
        return [
            {
                "_id":   blogs[i]["_id"],
                "title": blogs[i]["title"],
                "slug":  blogs[i].get("slug", ""),
                "tags":  blogs[i].get("tags", []),
                "score": round(float(hybrid[i]), 4),
            }
            for i in top_indices if hybrid[i] >= 0
        ]