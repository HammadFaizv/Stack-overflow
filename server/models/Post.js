import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        desc: { type: String },
        likes: { type: [String], default: [] },
        imageUrl: { type: String },
        videoUrl: { type: String }, 
    },
        { timestamps: true }
);

export default mongoose.model("Post", PostSchema);