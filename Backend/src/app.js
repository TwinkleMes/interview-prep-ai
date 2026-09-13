const express = require ('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cookieParser())
app.use(express.json())

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL // your deployed Vercel URL
].filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)


module.exports = app