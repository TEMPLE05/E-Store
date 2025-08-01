import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({success:false,message:"You are Not Autherized Try again"}) 
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({success:false,message:"You Are Not Authorized Try again"})
            
        }
        next();

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
        
    }
}

export default adminAuth