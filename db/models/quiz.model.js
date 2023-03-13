import mongoose from 'mongoose'

const QuizSchema = mongoose.Schema({
    quiz:{
        type:Array
    },
    score:{
        type:Number,
        required:false,
    },
    ownedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"A user must be provided"]
    }
},{timestamps:true})

export default mongoose.model("Quiz",QuizSchema)