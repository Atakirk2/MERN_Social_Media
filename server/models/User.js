import mongoose from "mongoose"

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 25,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
)
const User = mongoose.model("User", UserSchema)
export default User