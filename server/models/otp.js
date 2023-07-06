import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email: {type: String, required: true},
    code: {type: String, required: true},
    expireIn: {type: Number},
},{
    timestamps: true
})

export default mongoose.model("otp" , otpSchema);