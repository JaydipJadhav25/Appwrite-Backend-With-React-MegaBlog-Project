import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name :"Authentication",
    initialState :{
        status : false,
        userData : null,
    },
    reducers :{
        login : (state , action) =>{
            state.status = true ;
            state.userData = action.payload.usrData;
        },
        logout : (state) =>{
            state.status = false;
            state.userData = null;
        }

    }
})
export const{login , logout} = authSlice.actions;
export default authSlice.reducer;