import { StatusCodes } from "http-status-codes"
import Quiz from "../db/models/quiz.model.js"

const getQuizes = async(req,res) =>{
    const allQuizes = await Quiz.find({ownedBy:req.user.userID})
    return res.status(StatusCodes.OK).json({quizes:allQuizes,length:allQuizes.length})
}

const addQuiz = async (req,res) => {
    const {user,body} = req
    req.body.ownedBy = req.user.userID
    const newQuiz = await Quiz.create(req.body)
    return res.status(StatusCodes.CREATED).json({added:true,newQuiz})
}

export {getQuizes,addQuiz}