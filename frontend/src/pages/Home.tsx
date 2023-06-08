/** @format */

import React, { useEffect, useState, Dispatch } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AppButton from "./../components/AppComponents/buttons/AppButton";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { CardContent, Grid, IconButton } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();

  const [dataset, setDataset] = useState<string>("");
  const [search, setSearch] = useState<string>();
  const handleChange = (event: SelectChangeEvent) => {
    setDataset(event.target.value as string);
  };
  console.log({ search });
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/query?dataset=${dataset}&query=${search}`
      );
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, [dataset, search]);

  console.log({ data });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "40px",
      }}
    >
      <Card
        sx={{
          borderRadius: 5,
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 20,
            padding: 30,
          }}
        >
          <FormControl sx={{ width: 400 }}>
            <InputLabel id="demo-simple-select-label">
              Choose a dataset
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dataset}
              label="Choose a dataset.."
              onChange={handleChange}
            >
              <MenuItem sx={{ textAlign: "right" }} value={"lotte"}>
                lotte
              </MenuItem>
              <MenuItem value={"mmarco"}>mmarco</MenuItem>
            </Select>
          </FormControl>
          <input
            className="w-full rounded-[4px] focus:outline-none text-[18px]  py-[10px] px-[10px] border border-[#ccc]"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>
      {data?.result?.irsResult?.length > 0 && (
        <table className="table-fixed mt-[40px] w-10/12 mx-auto ">
          <thead>
            <tr>
              <td>Precision</td>
              <td>Recall</td>
              <td>Avp</td>
              <td>Map</td>
              <td>Mrr</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {data?.result?.evaluation?.precision} </td>
              <td> {data?.result?.evaluation?.recall} </td>
              <td> {data?.result?.evaluation?.avp} </td>
              <td> {data?.result?.evaluation?.map} </td>
              <td> {data?.result?.evaluation?.mrr} </td>
            </tr>
          </tbody>
        </table>
      )}
      {data?.result?.irsResult?.length > 0 && (
        <table className="table-auto mt-[40px] w-10/12 mx-auto ">
          <thead>
            <tr>
              <td>Doc_ID</td>
              <td>Text</td>
            </tr>
          </thead>
          <tbody>
            {data?.result?.irsResult?.map((item: any, key: number) => (
              <tr>
                <td> {item?.doc_id} </td>
                <td> {item?.text} </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
