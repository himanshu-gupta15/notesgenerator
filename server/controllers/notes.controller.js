import Notes from "../models/note.model.js";

export const getMyNotes=async(req ,res)=>{
    try{
        const notes=await Notes.find({user:req.userId}).select("topic classLevel exampType revisionMode includeDiagram includeChart createdAt").sort({createdAt:-1})
        if(!notes){
            return res.status(404).json({error:"Notes not found"});

        }
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json({message:`getCurrentUser error ${error}`});
    }
}

export const getSingleNotes=async(req,res)=>{
    try{
        const notes=await Notes.findOne({_id:req.params.id,
            user:req.userId
        })
        if(!notes){
            return res.status(404).json({error:"Note not found"})
        }
        const content = typeof notes.content === 'string' ? JSON.parse(notes.content) : notes.content;
        return res.json({
            content: content,
            topic:notes.topic,
            createdAt:notes.createdAt,
            classLevel: notes.classLevel,
            examType: notes.examType,
            revisionMode: notes.revisionMode,
            includeDiagram: notes.includeDiagram,
            includeChart: notes.includeChart,
            ...content
        });

    }catch(error){
        return res.status(500).json({message:`getSingleNotes error ${error}`})
    }
}