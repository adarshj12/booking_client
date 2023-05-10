import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: null,
  dates: [],
  options: {
    adult: null,
    children: null,
    room: null,
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    newSearch: (state, action) => {
      state.city = action.payload.destination;
      state.dates = action.payload.dates;
      state.options = action.payload.options;
    },
    resetSearch: () => initialState,
  },
});

export const { newSearch, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;