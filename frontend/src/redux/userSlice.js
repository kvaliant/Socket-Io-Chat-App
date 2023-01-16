import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { token: "", username: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    regToken: (state, action) => {
      const { username, token } = action.payload;
      state.token = token;
      state.username = username;
    },
    unregToken: (state) => {
      state = INITIAL_STATE;
    },
  },
});

export const selectUser = (state) => {
  return state;
};

export const { regToken, unregToken } = userSlice.actions;

export default userSlice.reducer;
