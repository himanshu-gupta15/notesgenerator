// const GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"

// export const generateGeminiResponse=async(prompt)=>{
//     try{
//     const response=await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//             contents:[
//                 {
//                     parts:[{

//                         text:prompt
//                     }
//                     ]
//                 }
//             ]
//         })
//     })

//     if(!response.ok){
//         const err=await response.text()
//         throw new Error(err)
//     }
//     const data=await response.json()
//     const text=data.candidates[0].content?.parts[0].text;
//     if(!text){
//         throw new Error("No text returned from Gemini")
//     }

//     const cleanText=text.replace(/```json/g,"")
//     .replace(/```/g,"")
//     .trim()

//     return JSON.parse(cleanText)
//  } catch(error){
//   console.error("Gemini Fetch Error:",error.message)
//   throw new Error("Gemin Api fetch failed");
// }
// }


const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const generateGeminiResponse = async (prompt, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(
        `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      // Handle temporary Gemini overload
      if (response.status === 503) {
        console.log(`Gemini busy... retry ${attempt}/${retries}`);

        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }

        throw new Error("Gemini server busy. Please try again.");
      }

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const data = await response.json();

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No text returned from Gemini");
      }

      // Clean markdown json block
      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        return JSON.parse(cleanText);
      } catch {
        return cleanText; // fallback if normal text response
      }
    } catch (error) {
      console.error(`Gemini attempt ${attempt} failed:`, error.message);

      if (attempt === retries) {
        throw new Error(error.message || "Gemini API fetch failed");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};