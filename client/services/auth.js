// auth.js
import { AUTH_URL } from "../config.js";
import { apiRequest } from "./api_.js";

export async function loginUser(username, password) {
  const data = await apiRequest(`${AUTH_URL}/login`, "POST", {
    username,
    password,
  });
  localStorage.setItem("token", data.token);
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}
