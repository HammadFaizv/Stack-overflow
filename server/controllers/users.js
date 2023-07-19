import mongoose from 'mongoose'
import User from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = []
        allUsers.forEach(user => {
            allUserDetails.push({ _id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn, friends: user.friends, subscription: user.subscription })
        })
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate( _id, { $set: { 'name': name, 'about': about, 'tags': tags }}, { new: true } )
        // { new: true } as mongo returns old data and not the new updated one 
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}

export const follow = async (req, res) => {
    const user = req.body.userId;
    const friend = req.body.id;
    try{
        const updatedUser = await User.findByIdAndUpdate(
            user,
            {
                $addToSet: { friends: friend },
            },
            { new: true }
        );
        await User.findByIdAndUpdate(
            friend,
            {
                $addToSet: { friends: user },
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(405).json(err);
    }
}

export const unfollow = async (req, res) => {
        const user = req.body.userId;
        const friend = req.body.id;
    try{
        const updatedUser = await User.findByIdAndUpdate(
            user,
            {
                $pull: { friends: friend },
            },
            { new: true }
        );
        await User.findByIdAndUpdate(
            friend,
            {
                $pull: { friends: user },
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(405).json(err);
    }
}