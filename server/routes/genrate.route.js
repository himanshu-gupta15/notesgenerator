import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateNotes,getNotes } from "../controllers/genrate.controller.js";
import { getSingleNotes } from "../controllers/notes.controller.js";
import { get } from "mongoose";

const notesRouter=express.Router();

notesRouter.post("/genrate-notes",isAuth,generateNotes)
notesRouter.get("/getnotes",isAuth,getNotes)
notesRouter.get("/:id",isAuth,getSingleNotes)

export default notesRouter;