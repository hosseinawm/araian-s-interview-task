import { configureStore } from "@reduxjs/toolkit";
import authRedcer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authRedcer,
  },
});
