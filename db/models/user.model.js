import mongoose from 'mongoose'
import {genSalt, hash,compare} from 'bcrypt'
import {config} from 'dotenv'
import pkg from 'jsonwebtoken'

config()
const {sign} = pkg

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Each username must be unique"],
    required: [true, "A user must have a name"],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: [true, "Each email must be unique"],
    required: [true, "A user must have an email"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ],
    
  },password:{
        type:String,
        required:[true,'Each account must have a password'],
        minlength:8,
        maxlength:30
    }
});

UserSchema.pre('save',async function(){
    const salt = await genSalt(10)
    this.password = await hash(this.password,salt)
})

UserSchema.methods.gen_JWT = function () {
    return sign({userID:this._id,name:this.username},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME}) 
}

UserSchema.methods.comparePassword = async function (passedPassword){
    const match = await compare(passedPassword,this.password)
    return match
}

export default mongoose.model('User',UserSchema)