import { config } from "dotenv";
import { StatusCodes } from "http-status-codes";
import pkg from 'jsonwebtoken'
config()

const {verify} = pkg

const require_auth = (req,res,next) =>{
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"You are not authorized to view this page",type:"Unauthorized Error"});
    } 
    const auth_token = authHeader.split(' ')[1]

    try {
        const payload = verify(auth_token,process.env.JWT_SECRET)
        // console.log(payload);
        req.user = {userID:payload.userID,name:payload.name}
        next()
    } catch (error) {
        // console.log(error);
        if (error.message == 'jwt expired') {
            return res.status(StatusCodes.UNAUTHORIZED).json({message:error.message,type:"TokenExpiredError"})
        }
        res.status(StatusCodes.UNAUTHORIZED).json({message:error.message,type:"Unauthorized Error"});
    }
}

export default require_auth