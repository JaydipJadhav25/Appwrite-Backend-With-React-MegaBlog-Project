import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name :"Authentication",
    initialState :{
        status : false,
        usrData : null,
    },
    reducers :{
        login : (state , action) =>{
            state.status = true ;
            state.usrData = action.payload.usrData;
        },
        logout : (state) =>{
            state.status = false;
            state.usrData = null;
        }

    }
})
export const{login , logout} = authSlice.actions;
export default authSlice.reducer;