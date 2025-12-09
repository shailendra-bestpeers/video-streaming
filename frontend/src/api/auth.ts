import API from "../axios/axios";




export const signupAPI = (data: any) => API.post("/signup", data);
export const loginAPI = (data: any) => API.post("/login", data);