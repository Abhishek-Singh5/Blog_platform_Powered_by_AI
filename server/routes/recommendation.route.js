import express from "express";
import fetch from "node-fetch";
import Blog from "../models/Blog.js";
import Interaction from "../models/Interaction.js";

const router = express.Router();
const ML_SERVICE = process.env.ML_SERVICE_URL || "http://localhost:5001";

router.get("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.query.userId || null;

    // Fetch all published blogs (lean = plain JS objects, faster)
    const blogs = await Blog.find({ published: true })
      .select("_id title slug tags content")
      .lean();

    // Fetch all interactions (or limit to recent 90 days for scale)
    const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const interactions = await Interaction.find({ createdAt: { $gte: since } })
      .select("userId blogId type")
      .lean()
      .then(rows =>
        rows.map(r => ({
          userId: r.userId.toString(),
          blogId: r.blogId.toString(),
          type:   r.type,
        }))
      );

    // Stringify MongoDB ObjectIds for Python
    const blogsForML = blogs.map(b => ({
      ...b,
      _id: b._id.toString(),
    }));

    const mlRes = await fetch(`${ML_SERVICE}/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId:       userId ? userId.toString() : null,
        blogId:       blogId,
        blogs:        blogsForML,
        interactions: interactions,
        topN:         5,
      }),
    });

    const { recommendations } = await mlRes.json();
    res.status(200).json(recommendations);
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;