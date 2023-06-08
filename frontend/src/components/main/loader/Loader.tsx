/** @format */

import React from "react";
import { ThreeDots } from "react-loader-spinner";
import clsx from "clsx";

export interface ILoaderProps {
  authLoader?: boolean;
  loading: boolean;
  size?: number;
  color?: string;
  children?: () => JSX.Element;
  className?: string;
  withoutMarginTop: boolean;
}
const Loader: React.FC<ILoaderProps> = (Props) => {
  const {
    loading,
    size = 70,
    color = "#287bff",
    className,
    authLoader = false,
    withoutMarginTop,
    children = () => null,
  } = Props;
  return loading ? (
    <div
      style={{
        width: "100%",
        minHeight: authLoader ? "100vh" : "100%",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: withoutMarginTop
          ? 0
          : loading
          ? "calc(50vh - 50px)"
          : "50px",
      }}
      className={clsx(className)}>
      {/* <ClipLoader size={size} color={color} /> */}

      <ThreeDots
        height={size}
        width={size}
        radius='9'
        color={color}
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  ) : (
    children()
  );
};

export default Loader;
