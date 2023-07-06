import mongoose from "mongoose";
import axios from "axios";
import Chat from "../models/ChatAi.js";

export const postChat = async (req, res) => {
    const {userId, message} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send("user not found....");
    }

    const options = {
        method: "POST",
        url: 'https://ai-text-to-code-generation.p.rapidapi.com/chat',
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": process.env.TEXT_TO_CODE_KEY,
            "X-RapidAPI-Host": 'ai-text-to-code-generation.p.rapidapi.com',
        },
        data: {
            input: message,
        },
    };

    try {
        let results = await axios.request(options);
        console.log(results.data.message);
        const chat = await Chat.findByIdAndUpdate(
            userId,
            {
            userId: userId,
            $addToSet: {
                chat: [
                {
                    message: message,
                    contentType: "message",
                    role: "user",
                },
                {
                    message: results.data.message,
                    contentType: "code",
                    role: "chat",
                },
            ],
            },
        },
            { new: true, upsert: true }
        ).lean();
        res.status(200).json({ success: true, chat: chat });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "error in updating",
        });
    }
};

export const getChat = async (req, res) => {
    const { id:_id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(401).json({
          success: false,
          message: "Please login!",
        });
        return;
      }
      const chat = await Chat.findOne({ _id }).lean(); // lean allows to get mongoDB data in json format
      if (!chat) {
        res.status(404).json({
          success: false,
          message: "chat not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        chat: chat,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  };