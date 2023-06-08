/** @format */
import React, { ReactNode } from "react";
import { Link as MainLink } from "react-router-dom";
import { primaryColor } from "./../../../colors/index";

interface ILinkProps {
  children?: ReactNode;
  to: string;
  color?: string;
}

const Link: React.FC<ILinkProps> = (props) => {
  const { children, to, color = "#000" } = props;
  return (
    <MainLink style={{ textDecoration: "none", color: color }} to={to}>
      {children}
    </MainLink>
  );
};

export default Link;
