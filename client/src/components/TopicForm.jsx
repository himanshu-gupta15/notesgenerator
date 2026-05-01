// import { scale } from 'motion/react'
// import React, { useState } from 'react'
// import { motion } from 'motion/react'

// function TopicForm({setResult,setLoading,loading,setError}) {
//     const [topic,setTopic]=useState("")
//     const [classLevel,setClassLevel]=useState("")
//     const [examType,setExamType]=useState("")
//     const [revisionMode,setRevisionMode]=useState(false)
//     const [includeDiagram,setIncludeDiagram]=useState(false);
//     const [includeChart,setIncludedChart]=useState(false);

//     const handleSubmit=async()=>{
//     console.log("hello")
//         if(!topic.trim()){
//             console.log("empty topic")
//             setError("Please enter a topic")
//             return ;
//         }
//         setError("")
//         setLoading(true)
//         setResult(null)
//         try{

//         }catch(error){
//             console.log(error)
//             setError("Failed to generate notes from server")
//         }
//     }
//   return (
//     <motion.div
//     initial={{opacity:0,y:20}}
//         animate={{opacity:1,y:0}}
//         className='rounded-2xl bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.75 )] p-8 space-y-6 text-white'
//     >
//             <input type='text' className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focu:ring-white/30' placeholder='Enter topic (e.g.Web Development)' onChange={(e)=>setTopic(e.target.value)} value={topic}/>
//     <input type='text' className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focu:ring-white/30' placeholder='Class /Level (e.g. Class 10)' onChange={(e)=>setClassLevel(e.target.value)} value={classLevel}/>
//        <input type='text' className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focu:ring-white/30' placeholder='Exam Type (e.g. JEE, NEET, CBSE)' onChange={(e)=>setExamType(e.target.value)} value={examType}/>

//        <div className='flex flex-col md:flex-row gap-6'>
//         <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={()=>setRevisionMode(!revisionMode)}/>
//               <Toggle label="Include Diagrams" checked={includeDiagram} onChange={()=>setIncludeDiagram(!includeDiagram)}/>
//                   <Toggle label="Include Charts" checked={includeChart} onChange={()=>setIncludedChart(!includeChart)}/>
//        </div>
//        <motion.button
//        onClick={handleSubmit}
//        whileHover={!loading ? {scale:1.05}:{}}
//        whileTap={!loading ? {scale:0.95}:{}} 
//        disabled={loading}
//        className={
//         `w-full mt-4 py-3 rounded-4xl font-semibold flex items-center justify-center gap-3 transition ${
//             loading
//             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//             :"bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
//         }`
//        }
//        >
//    Generate Notes
//        </motion.button>

//     </motion.div>
//   )
// }

// function Toggle({label,checked,onChange}){
//     return (
//         <div className='flex items-center gap-4 cursor-pointer select-none' onClick={onChange}>
//             <motion.div
//             animate={{
//                 backgroundColor:checked
//                 ? "rgba(34,197,94,0.35)"
//                 :"rgba(255,255,255,0.15)"
                
//             }}
//             transition={{duration:0.25}}
//             className='relative w-12 h-6 rounded-full border border=white/20 backdrop-blur-lg'

//             >
//               <motion.div
//               layout
             
//   className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
//   style={{
//     left: checked ? "1.6rem" : "0.25rem", // fixed missing 'rem'
//   }}
//   transition={{ type: "spring", stiffness: 300, damping: 20 }}
// >

   

// </motion.div>



//             </motion.div>

//              <span className={`text-sm transition-colors ${checked?"text-green-300" :"text-gray-300"}`}>{label}</span>
//         </div>
//     )
// }

// export default TopicForm

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { generateNotes } from "../services/api";
import { updateCrdets } from "../redux/userSlice";

import { useDispatch } from "react-redux";


function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [progress,setProgress]=useState(0)
  const [progressText,setProgressText]=useState("")
  const dispatch=useDispatch()
  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      // API call here
     
     const result= await generateNotes({
         topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,

      })
      console.log(result.data)
      setResult(result.data)
      setLoading(false);
      setClassLevel("")
      setTopic("")
      setExamType("")
      setRevisionMode(false)
      setIncludeDiagram(false)
      setIncludeChart(false)

      if(typeof result.creditsLeft==="number"){
        dispatch(updateCrdets(result.creditsLeft))
      }
    } catch (error) {
      console.log(error);
      setError("Failed to generate notes from server");
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(!loading){
        setProgress(0)
        setProgressText("")
        return ;
    }
    let value=0;
    const interval=setInterval(()=>{
        value+=Math.random()*8
        if(value=>95){
            value=95;
            setProgressText("Almost done...");
            clearInterval(interval);
        }else if(value>70){
            setProgressText("Finalizing the notes...");
        }else if(value>40){
            setProgressText("Processing content...");
        }else{
            setProgressText("Generating notes...");
        }
        setProgress(Math.floor(value))
    },700)
    return ()=>clearInterval(interval)
  },[loading])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.75)] p-8 space-y-6 text-white"
    >
      {/* Inputs */}
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter topic (e.g. Web Development)"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      />

      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Class / Level (e.g. Class 10)"
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
      />

      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Exam Type (e.g. JEE, NEET, CBSE)"
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
      />

      {/* Toggles */}
      <div className="flex flex-col md:flex-row gap-6">
        <Toggle
          label="Exam Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />
        <Toggle
          label="Include Diagrams"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label="Include Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>

      {/* Button */}
      <motion.button
        onClick={handleSubmit}
        whileHover={!loading ? { scale: 1.05 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        disabled={loading}
        className={`w-full mt-4 py-3 rounded-3xl font-semibold flex items-center justify-center gap-3 transition ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
        }`}
      >
        {loading ? "Generating..." : "Generate Notes"}
      </motion.button>
      {loading &&
      <div className="mt-4 space-y-2">
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease:"easeInOut", duration: 0.6 }}
          className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"
        >
        </motion.div>
      </div>
       <div className="flex justify-between text-xs text-gray-300">
     <span>{progressText} </span>
     <span>{progress}%</span>
       </div>
       <p className="text-xs text-gray-400 text-center">
        This may take up to 2-5 minuts. Please don't close or refresh the page.
       </p>
      </div>
      }
    </motion.div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer select-none"
      onClick={onChange}
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(34,197,94,0.35)"
            : "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg"
      >
        <motion.div
          layout
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
          animate={{
            x: checked ? 24 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>

      <span
        className={`text-sm transition-colors ${
          checked ? "text-green-300" : "text-gray-300"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default TopicForm;