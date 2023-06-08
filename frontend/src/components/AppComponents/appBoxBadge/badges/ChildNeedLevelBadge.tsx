/** @format */
import React from "react";
import AppBoxBadge from "./../AppBoxBadge";

interface IChildNeedLevelBadgeProps {
  level: 1 | 2 | 3;
}

const ChildNeedLevelBadge: React.FC<IChildNeedLevelBadgeProps> = (props) => {
  const { level } = props;
  const getBadge = () => {
    if (level === 1) {
      return <AppBoxBadge label={"الأول"} bgColor='#00C2D1' fontSize='14' />;
    } else if (level === 2) {
      return <AppBoxBadge label={"الثاني"} bgColor='#5C8001' fontSize='14' />;
    } else if (level === 3) {
      return <AppBoxBadge label={"الثالث"} bgColor='#4E0250' fontSize='14' />;
    }
  };
  return <>{getBadge()}</>;
};

export default ChildNeedLevelBadge;
