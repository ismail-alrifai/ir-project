/** @format */

import React from "react";
import AppBoxBadge from "../AppBoxBadge";

interface IAccountStatusBadgeProps {
  status: boolean;
}
const AccountStatusBadge: React.FC<IAccountStatusBadgeProps> = (Props) => {
  const { status } = Props;
  const getBadge = () => {
    if (status) {
      return <AppBoxBadge label={"محظور"} bgColor='red' fontSize='14' />;
    } else {
      return <AppBoxBadge label={"نشط"} bgColor='green' fontSize='14' />;
    }
  };

  return <>{getBadge()}</>;
};
export default AccountStatusBadge;
