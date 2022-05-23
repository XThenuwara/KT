import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./features/notificationSlice";

export const store = configureStore({
  reducer: {
    //slices
    notification: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptch = typeof store.dispatch;
