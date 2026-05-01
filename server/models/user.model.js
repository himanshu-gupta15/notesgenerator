// import mongoose from "mongoose";
// import { use } from "react";

// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true       
//     },
//     credits:{
//         type:Number,
//         default:50,
//         min:0
//     },
//     isCreditAvaliable:{
//    type:Boolean,
//    default:true
//     },
//     notes:mongoose.Schema.Types.ObjectId,
//     ref:"Notes",
//     default:[]

// },{timestamps:true})

// const Usermodel=mongoose.model("User",userSchema)

// export default Usermodel;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
  type: String,
  required: function () {
    return !this.googleAuth; 
  }
},
googleAuth: {
  type: Boolean,
  default: false
},


    credits: {
      type: Number,
      default: 50,
      min: 0
    },

    isCreditAvailable: {
      type: Boolean,
      default: true
    },

    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",   // MUST match your Note model name exactly
        default: []
      }
    ]
  },
  { timestamps: true }
);

const Usermodel = mongoose.model("User", userSchema);

export default Usermodel;
