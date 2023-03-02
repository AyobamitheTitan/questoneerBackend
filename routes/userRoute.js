import express from "express";
import { register } from "../controllers/userController.js";

const userRoute = express.Router()

userRoute.post('/sign_up',register)

export default userRoute