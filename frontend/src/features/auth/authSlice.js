import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    signupFromBackend,
    loginFromBackend,
    logoutFromBackend,
    updateUserMainFromBackend,
    updateUserPassFromBackend,
} from "./authService";

const USER = JSON.parse(localStorage.getItem("user"));
const TOKEN = JSON.parse(localStorage.getItem("token"));

const initialState = {
    user: USER ? USER : null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    token: TOKEN ? TOKEN : null,
};

export const signup = createAsyncThunk(
    "auth/signup",
    async (userData, thunkAPI) => {
        try {
            return await signupFromBackend(userData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await loginFromBackend(userData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        return await logoutFromBackend();
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});

export const updateUserMain = createAsyncThunk(
    "auth/updateUserMain",
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await updateUserMainFromBackend(token, userData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

export const updateUserPass = createAsyncThunk(
    "auth/updateUserPass",
    async (passData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await updateUserPassFromBackend(token, passData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builders) => {
        builders
            //for signing in
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = { ...action.payload.data.user };
                state.token = action.payload.token;
            })

            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //for Loggin in
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = { ...action.payload.data.user };
                state.token = action.payload.token;
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.token = null;
            })

            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //update user data
            .addCase(updateUserMain.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(updateUserMain.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = { ...action.payload.data.user };
            })

            .addCase(updateUserMain.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //update password data
            .addCase(updateUserPass.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(updateUserPass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = { ...action.payload.data.user };
                state.token = action.payload.token;
            })

            .addCase(updateUserPass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = authslice.actions;
export default authslice.reducer;
