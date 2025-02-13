/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { ParsedData } from "../types/type";

interface QRState {
  qrData: ParsedData | null;
}

const initialState: QRState = {
  qrData: null,
};

const qrSlice = createSlice({
  name: "qr",
  initialState,
  reducers: {
    setQRData: (state, action: PayloadAction<ParsedData>) => {
      state.qrData = action.payload;
    },
  },
});

export const { setQRData } = qrSlice.actions;
export const selectQRData = (state: RootState) => state.qr.qrData;
export default qrSlice.reducer;
