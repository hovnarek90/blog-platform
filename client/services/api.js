// api.js
import { API_URL, AUTH_URL } from "../services/config.js";

// Generic function for making API calls
 async function apiRequest(url, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  return await response.json();
}

export { API_URL, AUTH_URL };