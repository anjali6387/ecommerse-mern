import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// console.log(JSON.parse(user));
const currentUser = user && JSON.parse(user).currentUser;
// console.log(currentUser)
console.log("dvasjv")
const TOKEN = currentUser?.accessToken;
console.log(TOKEN)

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTNjZDViOWQ3MDI0ZDFmYTJkOTg0OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTczMjQ5OCwiZXhwIjoxNzIxOTkxNjk4fQ.5WObdOCCLtHG8XdZy5f5-4AuvsRoIEvj5rTHqxLGLuI"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
  
});