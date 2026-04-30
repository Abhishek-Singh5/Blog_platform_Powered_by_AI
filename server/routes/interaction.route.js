import express from "express";
import Interaction from "../models/Interaction.js";
// import { verifyToken } from "../utils/verifyUser.js";  // your existing middleware

const router = express.Router();

// Track a user interaction (called from the frontend automatically)
router.post("/track",  async (req, res) => {
  const { blogId, type, duration } = req.body;
  try {
    // Upsert so rapid repeated views don't spam the collection
    await Interaction.findOneAndUpdate(
      { userId: req.user.id, blogId, type },
      { $inc: { duration }, updatedAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: "Tracked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;