import mongoose from "mongoose";
import {compare, genSalt, hash} from 'bcrypt'
import pkg from 'jsonwebtoken'

const {sign} = pkg

const UserSchema = mongoose.Schema({
  username: {
    required: [true, "A user must have a username"],
    type: String,
    maxlength: [40, "A username must not be more than 40 characters"],
    minlength:20,
    unique:true
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password:{
    type:String,
    required:[true,"Please provide a password"],
    minlength: 8
  }
});

UserSchema.pre('save',async function(){
    const salt = await genSalt(10)
    this.password = hash(this.password,salt)
})

UserSchema.methods.comparePassword = async function(passedPassword){
    const match = await  compare(passedPassword,this.password)
    return match
}

UserSchema.methods.gen_JWT = function(){
    return sign({userId:this._id,name:this.username},process.env.JWT_SECRET,{expiresIn:JWT_LIFETIME}) 
}