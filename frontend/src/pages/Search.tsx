/** @format */

import { CardContent, Grid, IconButton } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import { useState } from "react";

import MyCard from "../components/AppComponents/Card";
import { ResponseDto } from "./../types/appTypes";

export default function Search() {
  const [value, setValue] = useState<string>("");

  const [listOfData] = useState<Array<ResponseDto>>([
    {
      doc_id: 1,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      doc_id: 2,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      doc_id: 3,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      doc_id: 4,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ]);

  return (
    <>
      <Grid display={"flex"} justifyContent={"center"} container>
        <Grid xs={8}>
          <Card sx={{ borderRadius: 3, m: 4 }}>
            <CardContent>
              <Grid
                container
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={4}
              >
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    value={value}
                    onChange={(e) => setValue(e?.target?.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Search">
                    <IconButton
                      disabled={!value}
                      style={{
                        background: !value ? "#C7BDBD" : "blue",
                        padding: "10px",
                        color: "#fff",
                      }}
                    >
                      <AiOutlineSearch />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        mt={4}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        flexWrap={"wrap"}
        container
        gap={2}
      >
        {listOfData.map((item) => (
          <Grid xs={5}>
            <MyCard item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
