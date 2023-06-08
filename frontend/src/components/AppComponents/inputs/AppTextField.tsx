/** @format */

import { makeStyles } from "@material-ui/core";
import { SxProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { primaryColor } from "../../../colors";
interface IAppTextFieldProps {
  label: string;
  keyName?: string;
  size?: "medium" | "small";
  type?: "email" | "password" | "text" | "number" | "date";
  focused?: boolean;
  width?: string;
  helperText?: string;
  sxProps?: SxProps;
  className?: string;
  error?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  value?: any;
  setFieldValue?: (keyName: string, value: any) => void;
}
const useStyles = makeStyles({
  notchedOutline: {
    borderColor: `${primaryColor} !important`,
  },
});
const AppTextField: React.FC<IAppTextFieldProps> = (Props) => {
  const {
    label,
    size = "small",
    type = "text",
    keyName,
    focused = false,
    sxProps,
    setFieldValue,
    error,
    helperText,
    required,
    className,
    value,
    multiline,
    rows,
  } = Props;

  const classes = useStyles();
  return (
    <TextField
      InputProps={
        {
          // classes: {
          //   notchedOutline: classes.notchedOutline,
          // },
        }
      }
      sx={{
        // "& label.Mui-focused": {
        //   color: `{${primaryColor}}`,
        //   fontSize: "20px",
        // },
        "& .MuiOutlinedInput-root": {
          "& fieldset>legend": {
            fontSize: "0.6em", //or whatever works for you
          },
        },
        ...sxProps,
      }}
      type={type}
      name={keyName}
      size={size}
      className={className}
      required={required}
      label={label}
      variant='outlined'
      error={error}
      multiline={multiline}
      rows={rows}
      value={value}
      helperText={helperText}
      onChange={(e) => {
        keyName && setFieldValue && setFieldValue(keyName, e?.target?.value);
      }}
      focused={focused ? focused : undefined}
      fullWidth
    />
  );
};
export default AppTextField;
