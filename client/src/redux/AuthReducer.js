import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  toast: null, // Add toast state
  setUser: null, // Add setUser function
};

export const registerAsync = createAsyncThunk(
  "register/registerAsync",
  async (payload, thunkAPI) => {
    const { setUser } = thunkAPI.getState().authReducer; // Get setUser function from state
    thunkAPI.dispatch(SET_REQUEST());
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const user = await response.json();
      console.log("user", user.token);
      if (user) {
        localStorage.setItem("jwt", user.token);
      }
      thunkAPI.dispatch(SET_SUCCESS(user));
      setUser(user); // Set user using setUser function
    } catch (error) {
      thunkAPI.dispatch(SET_ERROR(error.message));
    }
  }
);

export const logInAsync = createAsyncThunk(
  "login/logInAsync",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(SET_REQUEST());
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }
      const userlogin = await response.json();
      thunkAPI.dispatch(SET_SUCCESS(userlogin));
      return userlogin; // Return userlogin as the fulfilled value
    } catch (error) {
      thunkAPI.dispatch(SET_ERROR(error.message));
      throw error; // Rethrow the error to propagate it to the component
    }
  }
);

export const getUserAsync = createAsyncThunk(
  "getUser/getUserAsync",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("jwt");
    thunkAPI.dispatch(SET_REQUEST());
    try {
      const response = await fetch("http://localhost:8000/api/user/profile", {
        method: "get",
        headers: {
          Authorization: token,
        },
      });
      const userProfile = await response.json();
      //  console.log("UserProfile" , userProfile);
      thunkAPI.dispatch(SET_SUCCES(userProfile));
    } catch (error) {
      thunkAPI.dispatch(SET_ERROR(error.message));
    }
  }
);

export const logOutAsync = createAsyncThunk(
  "logOut/logOutAsync",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(SET_REQUEST());
    try {
      //   const response = await fetch("http://localhost:8000/api/user/logout", {
      //     method: "get",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   if (!response.ok) {
      //     throw new Error("Logout failed");
      //   }
      localStorage.clear();
      thunkAPI.dispatch(SET_LOGOUT()); // Dispatch SET_LOGOUT action without payload
    } catch (error) {
      thunkAPI.dispatch(SET_ERROR(error.message));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_REQUEST(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    SET_SUCCESS(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      console.log("Auth userlogin");
    },
    SET_ERROR(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    SET_TOAST(state, action) {
      state.toast = action.payload;
    },
    CLEAR_TOAST(state) {
      state.toast = null;
    },
    SET_LOGOUT(state) {
      state.isLoading = false;
      state.user = null;
    },
    SET_USER(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  SET_ERROR,
  SET_REQUEST,
  SET_SUCCESS,
  SET_LOGOUT,
  SET_TOAST,
  CLEAR_TOAST,
  SET_USER, // Add SET_USER action
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;
