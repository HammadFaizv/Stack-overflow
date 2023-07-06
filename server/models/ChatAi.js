import mongoose from "mongoose";
const { Types } = mongoose;

const chatSchema = mongoose.Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  chat: [
    {
      message: { type: String, required: "Message is required" },
      contentType: { type: String },
      role: { type: String },
    },
  ],
});

export default mongoose.model("Chat", chatSchema);