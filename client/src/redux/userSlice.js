import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        updateCrdets:(state,action)=>{
            if(state.userData){
                state.userData.credits=action.payload
            }
        }
    }
})

export const {setUserData,updateCrdets}=userSlice.actions;
export default userSlice.reducer;