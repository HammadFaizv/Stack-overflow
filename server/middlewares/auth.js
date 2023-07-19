import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            console.log("no token detected")
            res.status(404).json({ success: false, message: "Login to access" });
            return;
        }

        let decodeData = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decodeData?.id
        next()
    } catch (error) {
        console.log('middlewere error: '+error);
        res.status(401).json("token expired")
    }
}

export default auth;