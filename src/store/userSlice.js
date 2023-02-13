import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const initialState = {
  userData: {
    login: Cookies.get("user")
      ? JSON.parse(Cookies.get("user"))
      : {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          bYear: new Date().getFullYear(),
          bMonth: new Date().getMonth() + 1,
          bDay: new Date().getDate(),
          gender: "",
        },
    register: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      bYear: new Date().getFullYear(),
      bMonth: new Date().getMonth() + 1,
      bDay: new Date().getDate(),
      gender: "",
    },
  },
  token: JSON.parse(Cookies.get("user")).token || null,
  message: {
    login: null,
    register: null,
  },
  isLoading: false,
  isError: false,
  isShown: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleRegisterModal(state) {
      state.isShown = !state.isShown;
    },
    handleRegisterChange(state, action) {
      const { name, value, target } = action.payload;
      state.userData[target][name] = value;
    },
  },
  extraReducers: (builder) => {
    //Register
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      const { message, token, ...rest } = payload;
      state.isLoading = false;
      state.isError = false;
      console.log("Data: ", message, token);
      state.token = token;
      state.message.register = message;
      state = {};
    });
    builder.addCase(register.rejected, (state, { payload, error }) => {
      console.log("Error: ", payload);
      state.isError = true;
      state.isLoading = false;
      state.message.register = payload;
    });

    //Login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      const { message, token, ...rest } = payload;
      state.isLoading = false;
      state.isError = false;
      console.log("Data: ", message, token, state);
      state.userData.login = rest;
      state.message.login = message;
      state.token = token;
      Cookies.set("user", JSON.stringify({ token, ...rest }));
      console.log("hello world");
    });
    builder.addCase(login.rejected, (state, { payload, error }) => {
      console.log("Error: ", payload);
      state.isError = true;
      state.isLoading = false;
      state.message.login = payload;
    });
  },
});

// Actions
export const register = createAsyncThunk(
  "user/register",
  async (user1, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { data } = await axios.post(`http://localhost:8000/register`, {
        ...user.userData.register,
      });
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (user1, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { email, password } = user.userData.login;
      const { data } = await axios.post(`http://localhost:8000/login`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { toggleRegisterModal, handleRegisterChange } = userSlice.actions;

export default userSlice.reducer;
