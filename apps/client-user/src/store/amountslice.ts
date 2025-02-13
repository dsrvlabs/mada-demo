/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AmountState {
  amountList: string[];
}

const initialState: AmountState = {
  amountList: [],
};

export const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    setAmountList: (state, action: PayloadAction<string[]>) => {
      state.amountList = action.payload;
    },
  },
});

export const { setAmountList } = amountSlice.actions;
export default amountSlice.reducer;
