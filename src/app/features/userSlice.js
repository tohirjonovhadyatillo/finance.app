import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logOut: (state) => {
      state.user = null;
    },
    authIsReady: (state) => {
      state.isAuthReady = true;
    },
  },
});

export const { login, logOut, authIsReady } = userSlice.actions;
export default userSlice.reducer;
