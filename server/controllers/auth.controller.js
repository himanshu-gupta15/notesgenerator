import User from "../models/user.model.js";
import { getToken } from "../utils/token.js" 

// export const googleAuth=async(req,res)=>{
//     try{
//         const {name,email}=req.body;
//         let user=await User.findOne({email});                      
//         if(!user){
//             user=await User.create({name,email});
//         }                   
//         const token=await getToken(user._id);      
//         res.cookie("token",token,{
//             httpOnly:true,
//             secure:false,
//             sameite:"strict",
//             maxAge:7*24*60*60*1000
//         }) 
//        return  res.status(200).json({token});              

//     }catch(error){              
//         return res.status(500).json({message:"Google Authentication Failed",error:error.message})    

//     }
// }       


export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleAuth: true
      });
    }

    const token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ token });

  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).json({
      message: "Google Authentication Failed",
      error: error.message
    });
  }
};

export const logout=async(req,res)=>{
    try{
        await res.clearCookie("token");
        return res.status(200).json({message:"Logout Successfully"})
    }catch(error){
        return res.status(500).json({message:"Logout Failed",error:error.message})  
    }
}