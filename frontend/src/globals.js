import axios from "axios";
import { SERVER } from "../config";


export const globalaxios = axios.create({
  baseURL: `${SERVER}/api`,
  withCredentials: true,
});


