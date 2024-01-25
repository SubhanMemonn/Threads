import { configureStore } from "@reduxjs/toolkit";
import { userProfileReducer, userReducer } from "./userReducer";


export const store = configureStore({
    reducer: {
        [userReducer.name]: userReducer.reducer,
        [userProfileReducer.name]: userProfileReducer.reducer
    },

})