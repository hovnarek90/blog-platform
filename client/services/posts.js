// posts.js
import { API_URL } from "../config.js";
import { apiRequest } from "./api.js";
import { getToken } from "./auth.js";

export async function fetchPosts() {
  return await apiRequest(API_URL, "GET", null, getToken());
}

export async function savePost(postData, postId = null) {
  const url = postId ? `${API_URL}/${postId}` : API_URL;
  const method = postId ? "PUT" : "POST";
  return await apiRequest(url, method, postData, getToken());
}

export async function deletePost(postId) {
  return await apiRequest(`${API_URL}/${postId}`, "DELETE", null, getToken());
}
