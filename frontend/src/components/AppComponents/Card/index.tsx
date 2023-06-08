/** @format */

import React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Link as MainLink } from "react-router-dom";
import { primaryColor } from "./../../../colors/index";
import { ResponseDto } from "./../../../types/appTypes";

interface ICardProps {
  item: ResponseDto;
}

const MyCard: React.FC<ICardProps> = (props) => {
  const { item } = props;
  return (
    <>
      <Card
        style={{
          height: "300px",
          overflowY: "auto",
        }}>
        <CardContent
          sx={{
            padding: 2,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged
          {item?.text}
        </CardContent>
      </Card>
    </>
  );
};

export default MyCard;
