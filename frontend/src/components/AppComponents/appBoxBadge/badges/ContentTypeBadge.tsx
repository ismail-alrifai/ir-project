/** @format */
import React from "react";
import AppBoxBadge from "./../AppBoxBadge";
interface IContentTypeBadgeProps {
  type: string;
}

const ContentTypeBadge: React.FC<IContentTypeBadgeProps> = (props) => {
  const { type } = props;
  const getBadge = () => {
    if (type === "image") {
      return <AppBoxBadge label={"صورة"} bgColor='#334E58' fontSize='14' />;
    } else if (type === "word") {
      return <AppBoxBadge label={"كلمة"} bgColor='#FF4365' fontSize='14' />;
    }
  };
  return <>{getBadge()}</>;
};

export default ContentTypeBadge;
