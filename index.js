import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./src/api/routes/user.route.js"
import authRoutes from "./src/api/routes/auth.route.js"
dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log(error)
  })

const app = express()

app.use(express.json())
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port: ${process.env.PORT || 8080}`)
})

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
  const status = err.statusCode || 500
  const message = err.message || "Internal Server Error!"
  return res.status(status).json({
    success: false,
    message,
    status,
  })
})
