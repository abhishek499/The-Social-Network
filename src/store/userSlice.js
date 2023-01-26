import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  },
  token: null,
  message: null,
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
      const { name, value } = action.payload;
      state.userData[name] = value;
    },
  },
  extraReducers: (builder) => {
    //Register
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      const { message, token } = payload;
      state.isLoading = false;
      state.isError = false;
      console.log("Data: ", message, token);
      state = { ...state, token, message };
    });
    builder.addCase(register.rejected, (state, { payload, error }) => {
      console.log("Error: ", payload);
      state.isError = true;
      state.isLoading = false;
      state.message = payload;
    });

    //Login
  },
});

// Actions
export const register = createAsyncThunk(
    "user/register",
    async (user1, { getState, rejectWithValue }) => {
      try {
        console.log(user1);
        const { user } = getState();
        const { data } = await axios.post(`http://localhost:8000/register`, {
          ...user.userData,
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
