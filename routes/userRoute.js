import express from "express";
import { login, register } from "../controllers/userController.js";

const userRoute = express.Router()

userRoute.post('/sign_up',register)
userRoute.post("/login", login);

export default userRoute