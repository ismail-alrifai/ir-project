/** @format */

import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps } from "@mui/material";
import React, { ReactNode } from "react";

interface IAppButtonProps {
  loading?: boolean;
  label: string;
  sxProps?: SxProps;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  borderRadius?: string;
  clickHandler?: () => void;
  color?: "primary" | "secondary" | "error";
  disabled?: boolean;
}

const AppButton: React.FC<IAppButtonProps> = (Props) => {
  const {
    loading,
    label,
    borderRadius = "20px",
    sxProps = {
      fontWeight: 500,
      // lineHeight: "30px",
      fontSize: "16px",
      textAlign: "center",
    },
    startIcon,
    endIcon,
    size = "small",
    variant = "contained",
    color = "primary",
    clickHandler,
    disabled = false,
  } = Props;

  return (
    <LoadingButton
      startIcon={startIcon}
      endIcon={endIcon}
      loading={loading}
      sx={{ ...sxProps, borderRadius: `${borderRadius}` }}
      size={size}
      onClick={clickHandler}
      color={color}
      disabled={disabled}
      variant={variant}>
      {label}
    </LoadingButton>
  );
};
export default AppButton;
