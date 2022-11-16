import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import batchReducer from './Batch/BatchSlice'
export let store = configureStore({
  reducer: {
    auth: authReducer,
    batch: batchReducer
  },
});
