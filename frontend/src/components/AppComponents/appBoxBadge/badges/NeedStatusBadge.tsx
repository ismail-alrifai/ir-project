/** @format */
import React from "react";
import AppBoxBadge from "./../AppBoxBadge";
interface INeedStatusBadgeProps {
  status: boolean;
}

const NeedStatusBadge: React.FC<INeedStatusBadgeProps> = (props) => {
  const { status } = props;
  const getBadge = () => {
    if (status) {
      return <AppBoxBadge label={"مُلباة"} bgColor='#00AF54' fontSize='14' />;
    } else {
      return (
        <AppBoxBadge label={"غير مُلباة"} bgColor='#DF2935' fontSize='14' />
      );
    }
  };
  return <>{getBadge()}</>;
};

export default NeedStatusBadge;
