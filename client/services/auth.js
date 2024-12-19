// auth.js
import { fetchPosts } from "./posts.js";
import { AUTH_URL } from "../config.js";

let isAuthenticated = localStorage.getItem("token") !== null;

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const registerBtn = document.getElementById("register-btn");
const newPostBtn = document.getElementById("new-post-btn");
const loginModal = document.getElementById("login-modal");
const closeLoginBtn = document.querySelector(".close-login-btn");
const closeRegisterBtn = document.querySelector(".close-register-btn");
const registerSubmit = document.getElementById("register-submit");
const loginSubmit = document.getElementById("login-submit");
const registerModal = document.getElementById("register-modal");

function updateAuthUI() {
  if (isAuthenticated) {
    loginBtn.classList.add("hidden");
    registerBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    newPostBtn.classList.remove("hidden");
  } else {
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    newPostBtn.classList.add("hidden");
  }
}

// LOGIN FUNCTION
async function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter valid credentials.");
    return;
  }

  try {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      isAuthenticated = true;
      updateAuthUI();
      alert("Login successful!");
      loginModal.classList.add("hidden");
      fetchPosts();
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    alert(error.message);
  }
}

// REGISTER FUNCTION
async function registerUser() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!username || !password) {
    alert("Please enter valid credentials.");
    return;
  }

  try {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      isAuthenticated = true;
      updateAuthUI();
      fetchPosts();
      registerModal.classList.add("hidden");
    } else {
      throw new Error(data.message || "Registration failed");
    }
  } catch (error) {
    alert(error.message);
  }
}

// LOGOUT FUNCTION
function logoutUser() {
  localStorage.removeItem("token");
  isAuthenticated = false;
  updateAuthUI();
  fetchPosts();
}

loginBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});

registerBtn.addEventListener("click", () => {
  registerModal.classList.remove("hidden");
});
logoutBtn.addEventListener("click", logoutUser);
newPostBtn.addEventListener("click", () => {
  openModal("New Post");
});

closeLoginBtn.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});
closeRegisterBtn.addEventListener("click", () => {
  registerModal.classList.add("hidden");
});

registerSubmit.addEventListener("click", registerUser);
loginSubmit.addEventListener("click", loginUser);

updateAuthUI();

export { updateAuthUI, loginUser, registerUser, logoutUser, isAuthenticated };
