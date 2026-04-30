import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
  {
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    blogId:  { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    type:    { type: String, enum: ["view", "like", "share", "subscribe"], required: true },
    // optional: time spent on page in seconds
    duration: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent logging the same event twice within 1 hour (dedup)
interactionSchema.index({ userId: 1, blogId: 1, type: 1 });

export default mongoose.model("Interaction", interactionSchema);