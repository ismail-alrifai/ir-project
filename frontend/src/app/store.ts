/** @format */

// /** @format */

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
