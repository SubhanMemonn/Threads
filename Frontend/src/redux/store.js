import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import { userAPI } from "./api/userAPI";
import { postAPI } from "./api/postAPI"

const rootReducer = combineReducers({
    user: userReducer.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
})

const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (mid) => [...mid({ serializableCheck: false }),
    userAPI.middleware,
    postAPI.middleware
    ]

})
export const persistor = persistStore(store)