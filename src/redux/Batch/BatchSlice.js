import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import batchService from "../../services/Batch/BatchService";

let initialState = {
  batches: [],
  batch: null,
  selectedbatch: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  role: "",
  isLogout: false,
};

export const AllBatches = createAsyncThunk(
  "batch/allbatches",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.TOKEN;

    try {
      return await batchService.AllBatches(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createBatch = createAsyncThunk(
  "batch/createbatch",
  async (batchData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.TOKEN;
    console.log(token);
    try {
      return await batchService.CreateBatch(batchData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//slice block

export let batchSlice = createSlice({
  name: "batch",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.batch = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AllBatches.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AllBatches.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.batches = payload;
    });
    builder.addCase(AllBatches.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.batches = null;
    });

    //create batch start here
    builder.addCase(createBatch.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.batch = payload;
    });
    builder.addCase(createBatch.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.batch = null;
    });
  },
});

export let { reset } = batchSlice.actions;
export default batchSlice.reducer;
