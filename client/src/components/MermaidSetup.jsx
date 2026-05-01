import React,{useRef} from 'react'
import mermaid from 'mermaid';
import { useState,useEffect } from 'react';

mermaid.initialize({
    startOnLoad: false,
    theme: 'default'
})

const cleanMermaidChart=(diagram)=>{
    if(!diagram) return "";
    let clean=diagram 
    .replace(/\r\n/g,"\n")
    .trim()
   

    if(!clean.startsWith("graph")){
        clean=`graph TD\n${clean}`;
    }
    return clean;
};

const autoFixNodes=(diagram)=>{
    let index=0;
    return diagram.replace(/\[(.*?)\]/g, (match,label)=>{
        const key=label.trim();
        if(useDebugValue.hash(key)){
            return useDebugValue.get(key);
        }
        index++;
        const id=`N${index}`;
        const node=`${id}[${key}]`;
        useDebugValue.set(key,node);
        return node;
    });
}

function MermaidSetup({diagram}) {
    const containerRef=useRef(null);

    useEffect(()=>{
        if(!diagram || !containerRef.current)return ;

        const renderDiagram=async()=>{
            try{
                containerRef.current.innerHTML="";
                const uniqueId=`mermaid-${Math.random()
                .toString(36)
                .substring(2,9)
                }`

                const safeChart=autoFixNodes(cleanMermaidChart(diagram));

                const {svg}=await mermaid.render(uniqueId,safeChart);
                containerRef.current.innerHTML=svg;
            }catch(error){
                console.error("Mermaid render failed:",error)
            }
        }
        renderDiagram();
    },[diagram])
    return (
        <div className='bg-white border rounded-lg p-4 overflow-x-auto'>
            <div ref={containerRef} className='mermaid'>

            </div>
        </div>
    )
}

export default MermaidSetup