/** @format */

import { Box } from "@mui/material";
import React from "react";

interface IAppBoxBadgeProps {
  width?: number;
  height?: number;
  bgColor: string;
  color?: string;
  fontSize?: string;
  label: string;
}
const AppBoxBadge: React.FC<IAppBoxBadgeProps> = (Props) => {
  const {
    width = 22,
    height = 22,
    bgColor,
    color = "#fff",
    fontSize = "12px",
    label,
  } = Props;

  return (
    <>
      <Box
        sx={{
          width: width,
          height: height,
          bgcolor: bgColor,
          borderRadius: 50,
          padding: "15px 35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: color,
          fontSize: fontSize,
        }}>
        <p>{label}</p>
      </Box>
    </>
  );
};
export default AppBoxBadge;
