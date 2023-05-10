import {configureStore } from "@reduxjs/toolkit";
import userAuth from './userSlice';
import clientAuth from './clientSlice';
import adminAuth from './adminSlice';
import searchReducer from "./searchSlice";
import urlReducer from './urlSlice'

const store = configureStore({
    reducer:{
        user:userAuth,
        client:clientAuth,
        admin:adminAuth,
        search:searchReducer,
        url:urlReducer
    }
});

export default store;