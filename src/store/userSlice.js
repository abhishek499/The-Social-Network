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
  token: (Cookies.get("user") && JSON.parse(Cookies.get("user")).token) || null,
  message: {
    login: null,
    register: null,
    activate: null,
    findUser: null,
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  isShown: false,
  verified:
    (Cookies.get("user") && JSON.parse(Cookies.get("user")).verified) || false,
  findUser: {
    email: null,
    picture: null,
    code: null,
    password: null,
    isSuccess: false,
  },
  visible: 0,
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
    handleInputChange(state, action) {
      const { name, value, target } = action.payload;
      state[target][name] = value;
    },
    logout(state) {
      state.token = null;
      state.userData = {
        login: {
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
      };
      Cookies.remove("user");
    },
    nextVisible(state, action) {
      const { payload } = action;
      state.visible = payload;
    },
  },
  extraReducers: (builder) => {
    //Register
    {
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
    }

    //Login
    {
      builder.addCase(login.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(login.fulfilled, (state, { payload }) => {
        const { message, token, verified, ...rest } = payload;
        state.isLoading = false;
        state.isError = false;
        console.log("Data: ", message, token, state);
        state.userData.login = rest;
        state.message.login = message;
        state.token = token;
        state.verified = verified;
        Cookies.set("user", JSON.stringify({ token, ...rest, verified }));
        console.log("hello world");
      });
      builder.addCase(login.rejected, (state, { payload, error }) => {
        console.log("Error: ", payload);
        state.isError = true;
        state.isLoading = false;
        state.message.login = payload;
      });
    }

    // activate
    {
      builder.addCase(activate.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(activate.fulfilled, (state, { payload }) => {
        const { message } = payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.verified = true;
        Cookies.set(
          "user",
          JSON.stringify({
            ...state.userData.login,
            token: state.token,
            verified: state.verified,
          })
        );
        state.message.activate = message;
      });
      builder.addCase(activate.rejected, (state, { payload, error }) => {
        console.log("Error: ", payload);
        state.isError = true;
        state.isLoading = false;
        state.message.activate = payload;
      });
    }

    //Send Verification
    {
      builder.addCase(sendVerification.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(sendVerification.fulfilled, (state, { payload }) => {
        const { message } = payload;
        state.isLoading = false;
        state.isError = false;
        state.message.activate = message;
      });
      builder.addCase(
        sendVerification.rejected,
        (state, { payload, error }) => {
          console.log("Error: ", payload);
          state.isError = true;
          state.isLoading = false;
          state.message.activate = payload;
        }
      );
    }

    //find User
    {
      builder.addCase(findUser.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(findUser.fulfilled, (state, { payload }) => {
        const { message, email, picture } = payload;
        state.isLoading = false;
        state.isError = false;
        state.findUser = { message, email, picture };
        state.visible = 1;
      });
      builder.addCase(findUser.rejected, (state, { payload, error }) => {
        console.log("Error: ", payload);
        state.isError = true;
        state.isLoading = false;
        state.message.findUser = payload;
        state.findUser = { email: null, picture: null };
      });
    }

    //sendResetEmail
    {
      builder.addCase(sendResetEmail.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(sendResetEmail.fulfilled, (state, { payload }) => {
        const { message } = payload;
        state.isLoading = false;
        state.isError = false;
        state.message.findUser = message;
        state.visible = 2;
      });
      builder.addCase(sendResetEmail.rejected, (state, { payload, error }) => {
        console.log("Error: ", payload);
        state.isError = true;
        state.isLoading = false;
        state.message.findUser = payload;
      });
    }

    //sendCode
    {
      builder.addCase(sendCode.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(sendCode.fulfilled, (state, { payload }) => {
        const { message } = payload;
        state.isLoading = false;
        state.isError = false;
        state.message.findUser = message;
        !state.isError && (state.visible = 3);
      });
      builder.addCase(sendCode.rejected, (state, { payload, error }) => {
        console.log("Error: ", payload);
        state.isError = true;
        state.isLoading = false;
        state.message.findUser = payload;
      });
    }

    //changePassword
    {
      builder.addCase(changePassword.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(changePassword.fulfilled, (state, { payload }) => {
        const { message } = payload;
        state.isLoading = false;
        state.isError = false;
        state.message.findUser = message;
        !state.isError && (state.visible = 3);
        state.findUser.isSuccess = true;
      });
      builder.addCase(changePassword.rejected, (state, { payload, error }) => {
        console.log("Error: ", payload);
        state.isError = true;
        state.isLoading = false;
        state.message.findUser = payload;
      });
    }
  },
});

// Actions
export const register = createAsyncThunk(
  "user/register",
  async (user1, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}register`,
        {
          ...user.userData.register,
        }
      );
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
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}login`,
        {
          email,
          password,
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const activate = createAsyncThunk(
  "user/activate",
  async (token, { getState, rejectWithValue }) => {
    try {
      console.log(token);
      const { user } = getState();
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendVerification = createAsyncThunk(
  "user/sendVerification",
  async (token, { getState, rejectWithValue }) => {
    console.log("hello world");
    try {
      const { user } = getState();
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const findUser = createAsyncThunk(
  "user/findUser",
  async (token, { getState, rejectWithValue }) => {
    console.log("hello world");
    try {
      const { user } = getState();

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}findUser`,
        { email: user.findUser.email },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendResetEmail = createAsyncThunk(
  "user/sendResetEmail",
  async (token, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}sendResetEmail`,
        { email: user.findUser.email },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendCode = createAsyncThunk(
  "user/sendCode",
  async (token, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}validateResetCode`,
        { code: user.findUser.code, email: user.findUser.email },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (token, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}changePassword`,
        { password: user.findUser.password, email: user.findUser.email },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const {
  toggleRegisterModal,
  handleRegisterChange,
  handleInputChange,
  logout,
  nextVisible,
} = userSlice.actions;

export default userSlice.reducer;
