import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
const store = configureStore({
    auth : authReducer

})

export default store;