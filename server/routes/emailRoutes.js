import express from "express";
import EmailModel from "../models/EmailModel.js";
import connectDB from "../configs/db.js";

const router = express.Router();

// ✅ Connect to DB once at startup
connectDB();

// @route   POST /api/email
// @desc    Subscribe email

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, msg: "Email is required" });
    }

    await EmailModel.create({ email });
    return res.json({ success: true, msg: "Email Subscribed" });
  } catch (err) {
    console.error("POST /api/email error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

// @route   GET /api/email
// @desc    Get all subscribed emails
router.get("/", async (req, res) => {
  try {
    const emails = await EmailModel.find({});
    res.json({ emails });
  } catch (err) {
    console.error("GET /api/email error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

// @route   DELETE /api/email
// @desc    Delete subscription by ID
router.delete("/", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, msg: "ID is required" });
    }

    await EmailModel.findByIdAndDelete(id);
    res.json({ success: true, msg: "Email Deleted" });
  } catch (err) {
    console.error("DELETE /api/email error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

export default router;
