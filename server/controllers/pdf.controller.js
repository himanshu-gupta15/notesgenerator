import PDFDocument from "pdfkit";

export const pdfDownload=async(requestAnimationFrame,res)=>{
    
        const {result}=req.body;
        if(!result){
            return res.status(400).json({error:"No content provided"})
        }
        const doc=new PDFDocument({margin:50});

        res.setHeader("Content-Type","application/pdf");
        res.setHeader("Content-Disposition","attachment; filename=ExamNotes.pdf");
        doc.pipe(res);
        
        // Title 
        doc.fontSize(20).text("ExamNotes AI",{align:"center"});
        doc.moveDown(0.5);
        doc.fontSize(14).text(`Importance:${result.importance}`)
        doc.moveDown();

        // Sub Topics 
        doc.fontSize(16).text("Sub Topics");
        doc.moveDown(0.5);
        Object.entries(result.subTopics).forEach(([star,topics])=>{
            doc.moveDown(0.5);
            doc.fontSize(13).text(`${star} Topics`);

            topics.forEach((t)=>{
                doc.fontSize(12).text(`* ${t}`);
            });
        });

        doc.moveDown();
    }
