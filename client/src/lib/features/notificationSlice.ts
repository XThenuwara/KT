import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationType {
  message: string;
  variant: "success" | "error" | "warning" | "info" | "default" | undefined;
  data: any;
}

const initialState: NotificationType[] = [];

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state: any[], action: PayloadAction<NotificationType>) => {
      console.log(action.payload);
      state.push(action.payload);
    },
    removeNotification: (state: any[], action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    removeAllNotification: (state: any[]) => {
      //remove all
      state.splice(0, state.length);
    },
  },
});

export const { addNotification, removeNotification, removeAllNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
