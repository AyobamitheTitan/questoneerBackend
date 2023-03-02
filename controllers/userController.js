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
        next(new Error("Please provide all necessary details"))
    }

    const createUser = await User.create({username,email,password})
    const token = createUser.gen_JWT()
    return res.status(StatusCodes.CREATED).json({"created":true,token})

})

export {register}