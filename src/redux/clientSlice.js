import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:null,
    token:null
}

const clientSlice = createSlice({
    name:'client',
    initialState,
    reducers:{
        client_login:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        client_logout:(state)=>{
            state.user=null;
            state.token=null;
        }
    }
})

export const {client_login,client_logout} = clientSlice.actions;
export default clientSlice.reducer;