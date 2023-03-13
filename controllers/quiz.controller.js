import { StatusCodes } from "http-status-codes"
import Quiz from "../db/models/quiz.model.js"

const getQuizes = async(req,res) =>{
    const allQuizes = await Quiz.find({ownedBy:req.user.userID})
    
    return res.status(StatusCodes.OK).json({quizes:allQuizes,length:allQuizes.length})
}

const addQuiz = async (req,res) => {
    const {user,body} = req
    const newQuiz = await Quiz.create({ownedBy:user.userID,quiz:body.quiz})
    return res.status(StatusCodes.CREATED).json({added:true,newQuiz})
}

export {getQuizes,addQuiz}