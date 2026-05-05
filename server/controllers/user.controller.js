// import UserModel from "../models/user.model.js";

// export const getCurrentUser=async(req,res)=>{
//     try{
//      const userId=req.userId;
//      const user=await UserModel.findById(userId);
//      if(!user){
//         return res.status(400).json({message:"Current User is not found"})
//      }
//      return res.status(200).json(user)
//     }catch(error){
//    return res.status(500).json({message:`getCurrentUser error ${error}`})
//     }
// }

import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    // 👉 get token from header
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token is not found" });
    }

    // 👉 decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    // 👉 fetch user
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Current User is not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `getCurrentUser error ${error.message}`
    });
  }
};
