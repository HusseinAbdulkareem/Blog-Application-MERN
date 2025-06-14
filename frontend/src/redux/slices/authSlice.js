import { createSlice } from "@reduxjs/toolkit";

export { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    resgisterMessage: null,
  },

  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.resgisterMessage = null;
    },

    lgoout(state) {
      state.user = null;
    },

    register(state, action) {
      state.resgisterMessage = action.payload;
    },

    setUsername(state, action) {
      state.user.username = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
