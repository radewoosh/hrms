import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-3gh4.onrender.com/api",
});

export default API;