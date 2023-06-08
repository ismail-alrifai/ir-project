/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Ui {
  //for snackbar
  title: string;
  severity: "error" | "success";
  open: boolean;
  //for refresh page
  refresh: boolean;
}

const initialState: Ui = {
  //for snackbar
  title: "",
  severity: "success",
  open: false,
  //for refresh page
  refresh: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showSuccessSnackbar(
      state: Ui = initialState,
      action: PayloadAction<string>
    ) {
      state.open = true;
      state.severity = "success";
      state.title = action.payload;
    },
    showErrorSnackbar(state: Ui = initialState, action: PayloadAction<string>) {
      state.open = true;
      state.severity = "error";
      state.title = action.payload;
    },
    hiddenSnackbar(state: Ui = initialState) {
      state.open = false;
    },
    enableRefresh(state: Ui = initialState) {
      state.refresh = true;
    },
    disableRefresh(state: Ui = initialState) {
      state.refresh = false;
    },
  },
});
export const {
  showSuccessSnackbar,
  hiddenSnackbar,
  showErrorSnackbar,
  enableRefresh,
  disableRefresh,
} = uiSlice.actions;
export default uiSlice;
