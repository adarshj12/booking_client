import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:null,
    token:null
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        loginAdmin:(state,action)=>{
            // console.log(action);
            state.user = action.payload.user;
            state.token = action.payload.token;
            // console.log(state);
        },
        adminLogout:(state)=>{
            state.user=null;
            state.token=null;
        }
    }
})

export const {loginAdmin,adminLogout} = adminSlice.actions;
export default adminSlice.reducer;