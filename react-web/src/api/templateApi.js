import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/template";

export async function generateTemplate(payload) {
  const res = await axios.post(API_URL, payload);
  return res.data;
}
