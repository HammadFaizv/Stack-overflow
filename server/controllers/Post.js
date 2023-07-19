import Post from "../models/Post.js";
import mongoose from 'mongoose'

export const getPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUserPosts = async (req,res) => {
    const id = req.params.id;
    try {
        const posts = await Post.find({ userId: id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const addPost = async (req,res) => {
    const data = req.body;
    console.log(data);
    const newPost = new Post(data);
    try {
        const savedPost = await newPost.save();
        res.status(201).json({ success: true, Post: savedPost });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const like = async (req, res) => {
    console.log(req.body.userId)
    try{
        const post = await Post.findById(req.params.id);
        if(!post) res.status(500).json("Post not found!!!");

        const newPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likes: req.body.userId }
            },
            { new: true }
        );
        res.status(200).json(newPost); 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const dislike = async (req,res) => {
    try{
        // console.log(req.userId)
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likes: req.body.userId},
            }, 
            { new: true }
        )
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}