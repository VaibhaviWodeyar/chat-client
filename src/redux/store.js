import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import batchReducer from './Batch/BatchSlice';
import userBatchReducer from './usersBatches/UserBatchesListSlice'
export let store = configureStore({
  reducer: {
    auth: authReducer,
    batch: batchReducer,
    usersBatches : userBatchReducer
  },
});
