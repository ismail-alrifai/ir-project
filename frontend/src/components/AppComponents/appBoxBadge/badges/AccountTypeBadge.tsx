/** @format */

import React from "react";
import { AccountType } from "../../../../types/enums";
import AppBoxBadge from "../AppBoxBadge";

interface IAccountTypeBadgeProps {
  label:
    | AccountType.supervisor
    | AccountType.child
    | AccountType.teacher
    | AccountType.specialist;
}
const AccountTypeBadge: React.FC<IAccountTypeBadgeProps> = (Props) => {
  const { label } = Props;
  const getBadge = () => {
    if (label === AccountType.supervisor) {
      return <AppBoxBadge label={"مشرف"} bgColor='#000' fontSize='14' />;
    } else if (label === AccountType.child) {
      return <AppBoxBadge label={"طفل"} bgColor='#FFB30F' fontSize='14' />;
    } else if (label === AccountType.teacher) {
      return <AppBoxBadge label={"معلم"} bgColor='#345995' fontSize='14' />;
    } else if (label === AccountType.specialist) {
      return <AppBoxBadge label={"أخصائي"} bgColor='#00A7E1' fontSize='14' />;
    }
  };

  return <>{getBadge()}</>;
};
export default AccountTypeBadge;
