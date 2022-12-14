import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth/AuthService";
let user = JSON.parse(localStorage.getItem("user"));
let initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  role: null,
  isLogout: false,
};
//register
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.TOKEN;

    try {
      return await authService.register(user, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Login
export const AdminWithLogin = createAsyncThunk("auth/admin/login", async (user, thunkAPI) => {
  try {
    return await authService.adminLogin(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//student login
export const stdlogin = createAsyncThunk(
  "users/student/login",
  async (user, thunkAPI) => {
    try {
      return await authService.stdlogin(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Logout
export const logOut = createAsyncThunk(
  "auth/logoutuser",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.TOKEN;
      return await authService.logout(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout
export const StudentlogOut = createAsyncThunk(
  "users/logoutuser",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.TOKEN;
      return await authService.StudentLogout(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Slice starts here
export let authSlice = createSlice({
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
  //register
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.user = null;
    });
    //signin student in case
    builder.addCase(AdminWithLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AdminWithLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
      state.role = payload.role;
    });
    builder.addCase(AdminWithLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.user = null;
      state.isLogout = true;
    });
    // Student login
    builder.addCase(stdlogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(stdlogin.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
      state.role = payload.role;
    });
    builder.addCase(stdlogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.user = null;
      state.isLogout = true;
    });
    //Logout
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = null;
    });
    //Logout
    builder.addCase(StudentlogOut.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export let { reset } = authSlice.actions;
export default authSlice.reducer;
