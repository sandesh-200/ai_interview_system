import type { AuthResponse, GetMeResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import api from "./axios";

// REGISTER
export const registerUser = async (data:RegisterRequest):Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data:LoginRequest):Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// GET CURRENT USER
export const getMe = async ():Promise<GetMeResponse> => {
  const res = await api.get("/auth/me");
  return res.data;
};

// LOGOUT
export const logoutUser = async ():Promise<AuthResponse> => {
  const res = await api.post("/auth/logout");
  return res.data;
};