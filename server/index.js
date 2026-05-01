import "dotenv/config";
import express from "express";
import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/genrate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import { stripeWebhook } from "./controllers/credits.controller.js";
// import express from "express"
// import connectDb from "./utils/connectDb.js"
// import dotenv from "dotenv"
// dotenv.config()
// import authRouter from "./routes/auth.route.js"
// import cookieParser from "cookie-parser"
// import cors from "cors"
// import userRouter from "./routes/user.route.js"
// import notesRouter from "./routes/genrate.route.js"
// import pdfRouter from "./routes/pdf.route.js"
// import { stripeWebhook } from "./controllers/credits.controller.js"
const app=express()
 console.log(process.env.PORT)
app.post(
  "/api/credits/webhook",
  express.raw({type:"application/json"}),
  stripeWebhook
);

app.use(
    cors(
      {origin: "http://localhost:5173",

        credentials:true,
        methods:["GET","POST","PUT","DELETE","OPTIONS"],
      }

    )
)

app.use(express.json())
app.use(cookieParser())

const PORT=process.env.PORT || 8000
app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.use("/api/auth",authRouter );
app.use("/api/user",userRouter)
app.use("/api/notes",notesRouter)
app.use("/api/pdf",pdfRouter)
await connectDb()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})