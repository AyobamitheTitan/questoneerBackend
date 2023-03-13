import express from 'express';
import { addQuiz, getQuizes } from '../controllers/quiz.controller.js';

const quiz_router = express.Router()

quiz_router.route('/').post(addQuiz).get(getQuizes)

export default quiz_router