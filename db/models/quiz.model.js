import mongoose from 'mongoose'

const QuizSchema = mongoose.Schema(
  {
    question: {
      required: true,
      type: String,
    },
    correctAnswer: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    score: {
      type: Number,
      required: true,
    },
    difficulty:{
        type:String,
        required:true
    },
    ownedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "A user must be provided"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz",QuizSchema)