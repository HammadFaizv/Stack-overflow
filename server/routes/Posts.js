import express from "express";
import {
    addPost,
    getPosts,
    getUserPosts,
    like,
    dislike
  } from "../controllers/Post.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/get", getPosts);
router.get("/user-posts/:id", getUserPosts);
router.post("/add", auth, addPost);
router.patch("/like/:id", auth, like);
router.patch("/dislike/:id", auth, dislike);

export default router;