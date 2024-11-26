import { Middleware } from "@reduxjs/toolkit";
import { login, logout } from "../slices/authSlice";

const persistTokenMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (login.match(action)) {
    const token = action.payload || '' as string;
    localStorage.setItem("token", token);
  } else if (logout.match(action)) {
    localStorage.removeItem("token");
  }

  return result;
};

export default persistTokenMiddleware;
