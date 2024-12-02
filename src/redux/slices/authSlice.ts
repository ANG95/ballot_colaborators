import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null; 
      window.localStorage.removeItem("rol_id");
      window.localStorage.removeItem("rolName");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("userName");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
