import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateNotes } from "../controllers/genrate.controller.js";

const pdfRouter=express.Router();

pdfRouter.post("/genrate-pdf",isAuth,generateNotes)

export default pdfRouter;