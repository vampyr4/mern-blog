import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userSlice from "./userFeatures/userSlice"
import storage from "redux-persist/lib/storage"
import {persistStore} from "redux-persist"
import { persistReducer } from "redux-persist"

const rootReducer = combineReducers({
    user:userSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    version:1
}   

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})

export const persistor = persistStore(store)