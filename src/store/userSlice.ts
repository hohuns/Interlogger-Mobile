import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  user: string;
  idToken: string;
  isLoggedIn: boolean;
  lan: string;
};

const initialState: initialState = {
  user: "",
  idToken: "",
  isLoggedIn: false,
  lan: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    updateIdToken(state, action: PayloadAction<string>) {
      state.idToken = action.payload;
    },
    updateIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    updateLanguage(state, action: PayloadAction<string>) {
      state.lan = action.payload;
    },
  },
});

export const usersActions = userSlice.actions;
export default userSlice.reducer;
