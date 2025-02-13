import { configureStore } from "@reduxjs/toolkit";
import amountReducer from "./amountslice";
import qrReducer from "./qrslice";

export const store = configureStore({
  reducer: {
    qr: qrReducer,
    amount: amountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
