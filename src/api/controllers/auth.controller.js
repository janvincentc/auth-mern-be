import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword })
  try {
    await newUser.save()
    res.status(201).json({ message: "Successfully signed up" })
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body
  const validUser = await User.findOne({ email: email })
  if (!validUser) return next(errorHandler(400, "User not found"))
  const validPassword = bcryptjs.compare(password, validUser.password)
  if (!validPassword) return next(errorHandler(401, "Invalid Password"))
  try {

  } catch (error) {
    next(error)
  }
}
