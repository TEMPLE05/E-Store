// backend/middleware/auth.js - Simplified approach
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' }); 
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // ✅ Always attach to req for consistency
        req.userId = token_decode.id;
        
        // ✅ Also attach to req.body for POST endpoints that expect it
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = token_decode.id;
        
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;