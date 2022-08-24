import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./../features/auth/authSlice";
import entryReducer from "./../features/entry/entrySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        entry: entryReducer,
    },
});
