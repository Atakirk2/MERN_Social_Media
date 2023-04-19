import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { fileURLToPath } from "url"
import {register} from "./controllers/auth.js"
import {createPost} from "./controllers/posts.js"
import {verifyToken} from "./middleware/auth.js"
import User from "./models/User.js"
import Post from "./models/Post.js"
import {users, posts} from "./data/index.js"

/* Configuratinos */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

/* File Storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

/* Routes With Files */
app.post("/auth/register", upload.single("image"), register)
app.post("/posts", verifyToken, upload.single("image"), createPost)

/* Routes */ 
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)


/* Mongoose Setup */
const PORT = process.env.PORT || 6001
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

    /* Add dummy data*/ 
    //User.insertMany(users)
    //Post.insertMany(posts)
  })
  .catch((error) => console.log("Server did not connect: " + error.message))
