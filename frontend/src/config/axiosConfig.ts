/** @format */

import axios from "axios";
import { BASE_URL } from "./env";
export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
