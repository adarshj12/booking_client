import { createSlice } from '@reduxjs/toolkit';

const initialState ={
  url:'/'
}


const urlSlice = createSlice({
  name: 'lastVisitedUrl',
  initialState,
  reducers: {
    setLastVisitedUrl: (state, action) => {
      state.url= action.payload.url;
    },
    clearLastVisitedUrl: (state) => {
      state.url= '/';
    },
  },
});

export const { setLastVisitedUrl, clearLastVisitedUrl } = urlSlice.actions;
export default urlSlice.reducer;