import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userBatchListService from "../../services/usersBatchService/BatchListService";

let initialState = {
  usersbatchesdetails: [],
  batch: null,
  selectedbatch: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  role: "",
  isLogout: false,
};

//reducer part
export const AllUsersBatchDetails = createAsyncThunk(
  "users/batches",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.TOKEN;

    try {
      return await userBatchListService.UsersBatchList(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//slice part

 let userBatchSlice = createSlice({
  name: "userBatch",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.usersbatchesdetails = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AllUsersBatchDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AllUsersBatchDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.usersbatchesdetails = payload;
    });
    builder.addCase(AllUsersBatchDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.usersbatchesdetails = null;
    });
  },
});

export let { reset } = userBatchSlice.actions;
export default userBatchSlice.reducer;
