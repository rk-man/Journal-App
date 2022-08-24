import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./../features/auth/authSlice";
import entryReducer from "./../features/entry/entrySlice";
const actionSanitizer = (action) =>
    action.type === "FILE_DOWNLOAD_SUCCESS" && action.data
        ? { ...action, data: "<<LONG_BLOB>>" }
        : action;

export const store = configureStore({
    reducer: {
        auth: authReducer,
        entry: entryReducer,
    },

    //there will be some sort of serializability checks happening in the bacngoround in redux toolkit as a middleware, which might slow down the loading time...hence we can disable it
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),

    actionSanitizer,
    stateSanitizer: (state) =>
        state.data ? { ...state, data: "<<LONG_BLOB>>" } : state,
});
