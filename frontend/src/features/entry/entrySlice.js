import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    addEntryFromBackend,
    getUserEntriesFromBackend,
    updateSpecificEntryFromBackend,
    getSpecificEntryFromBackend,
} from "./entryService";

const initialState = {
    entry: null,
    entries: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    specificEntry: null,
};

export const addEntry = createAsyncThunk(
    "entry/addEntry",
    async (entryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await addEntryFromBackend(token, entryData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.data.message);
        }
    }
);

export const getUserEntries = createAsyncThunk(
    "entry/getUserEntries",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await getUserEntriesFromBackend(token);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.data.message);
        }
    }
);

export const updateSpecificEntry = createAsyncThunk(
    "entry/updateSpecificEntry",
    async (entryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await updateSpecificEntryFromBackend(
                token,
                entryData,
                entryData._id
            );
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.data.message);
        }
    }
);

export const getSpecificEntry = createAsyncThunk(
    "entry/getSpecificEntry",
    async (entryId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await getSpecificEntryFromBackend(token, entryId);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.data.message);
        }
    }
);

const entrySlice = createSlice({
    name: "entry",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            state.entry = null;
        },

        resetEntries: (state) => {
            state.entries = [];
        },

        resetExceptEntry: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builders) => {
        builders
            .addCase(addEntry.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(addEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entry = { ...action.payload.data.entry };
            })

            .addCase(addEntry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(getUserEntries.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getUserEntries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entries = action.payload.data.entries;
            })

            .addCase(getUserEntries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //updating entry

            .addCase(updateSpecificEntry.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(updateSpecificEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entry = { ...action.payload.data.entry };
            })

            .addCase(updateSpecificEntry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //get specific entry
            .addCase(getSpecificEntry.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getSpecificEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entry = { ...action.payload.data.entry };
            })

            .addCase(getSpecificEntry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, resetEntries, resetExceptEntry } = entrySlice.actions;
export default entrySlice.reducer;
