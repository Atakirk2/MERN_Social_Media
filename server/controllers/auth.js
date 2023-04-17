import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async (req, res) => {
  try {
    console.log(req.body)
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      picturePath,
      location,
      occupation,
    } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      friends,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const login = async(req, res) => {
try {
    const { email, password } = req.body
    console.log(req.body)
    const user = await User.findOne({ email: email })
    if(!user) return res.status(400).json({ msg: "User not found" })
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({ msg: "Wrong password!" })
    const token =  jwt.sign({ id:user.id }, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({token, user})
    

} catch (error) {
    res.status(500).json({ error: error.message })
}
}
