import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:null,
    mobile:null,
    token:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload.user;
            state.mobile = action.payload.mobile;
            state.token = action.payload.token;
        },
        logout:(state)=>{
            state.user=null;
            state.mobile=null;
            state.token=null;
        }
    }
})

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;