import StatusCodes from "http-status-codes";
import mongoose from "mongoose";
import User from "../db/models/user.model.js";
import asyncWrapper from "../middleware/asyncWrapper.js";

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Please fill in the required fields", type: "Error" });
    return next();
  }

  const getUser = await User.findOne({ username });
  if (!getUser) {
    return res
      .status(400)
      .json({ message: "This user does not exist", type: "NotFoundError" });
    // return next();
  }

  const confirm = await getUser.comparePassword(password.trim());
  if (!confirm) {
    return res
      .status(400)
      .json({ message: "Incorrect password", type: "Invalid Entry" });
    // return next();
  }
  const token = getUser.gen_JWT();

  res.status(StatusCodes.OK).json({ loggedIn: true, token,username });
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please fill in the required fields", type: "Error" });
  }
  try {
    const newUser = await User.create({
      username,
      email,
      password: password.trim(),
    });
    const token = newUser.gen_JWT();

    res.status(StatusCodes.CREATED).json({ created: true, token,username });
  } catch (error) {
    let message;

    if (error.keyPattern.hasOwnProperty("email")) {
      message = "This email is already in use.";
    } else if (error.keyPattern.hasOwnProperty("username")) {
      message = "This username is already in use.";
    } else {
      message = "An error occured. Please try again.";
    }

    res.status(StatusCodes.BAD_REQUEST).json({ message, type: error.name });
  }
};

export { login, signup };
