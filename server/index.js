import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv';

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import chatRoutes from "./routes/ChatAi.js";
import subsRoutes from "./routes/Subscription.js";
import otpRoutes from "./routes/Otp.js";

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use(cors());

app.get("/", (req,res) => {
    res.send("this is a stack overflow clone api");
})

app.use('/chat', chatRoutes)
app.use('/user',userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/subscription', subsRoutes)
app.use('/otp', otpRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => {console.log(`server running at port ${PORT}`)}))
    .catch((err) => console.log(err.message))