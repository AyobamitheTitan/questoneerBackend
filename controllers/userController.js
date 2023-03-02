import {StatusCodes} from 'http-status-codes'
import asyncWrapper from "../middleware/asyncWrapper.js";
import User from "../models/user.model.js";

const register = asyncWrapper(async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body

    if (!username || !email || !password) {
        return next(new Error("Please provide all necessary details"))
    }

    const createUser = await User.create({username,email,password})
    const token = createUser.gen_JWT()
    return res.status(StatusCodes.CREATED).json({"created":true,token})

})

const login = asyncWrapper(async(req,res,next)=>{
    const {username,password} = req.body

    if (!username || !password) {
        return next(new Error("Please fill in the necessary fields"))    
    }

    const findUser = await User.findOne({username})

    if(!findUser){
        return next(new Error("No such user Exists"))
    }

    const checkPassword = await findUser.comparePassword(password)
    if (!checkPassword) {
        return next(new Error("Invalid password"))
    }

    const token = await findUser.gen_JWT()

    return res.status(StatusCodes.OK).json({token})

})

export {register,login}