/** @format */

import React from "react";
import { ClassLevels } from "../../../../types/enums";
import AppBoxBadge from "../AppBoxBadge";

interface IClassLevelsBadgeProps {
  level: ClassLevels.level_1 | ClassLevels.level_2 | ClassLevels.level_3;
}
const ClassLevelsBadge: React.FC<IClassLevelsBadgeProps> = (Props) => {
  const { level } = Props;
  const getBadge = () => {
    if (level === ClassLevels.level_1) {
      return <AppBoxBadge label={"الأول"} bgColor='#DF2935' fontSize='14' />;
    } else if (level === ClassLevels.level_2) {
      return <AppBoxBadge label={"الثاني"} bgColor='#00AF54' fontSize='14' />;
    } else if (level === ClassLevels.level_3) {
      return <AppBoxBadge label={"الثالث"} bgColor='#192A51' fontSize='14' />;
    }
  };

  return <>{getBadge()}</>;
};
export default ClassLevelsBadge;
