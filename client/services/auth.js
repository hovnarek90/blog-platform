import { fetchPosts, openModal } from "./posts.js";
import { AUTH_URL } from "../config.js";
import { openInfoModal } from "./modal.js";

let isAuthenticated = localStorage.getItem("token") !== null;
const fetchProfileButton = document.getElementById("fetchProfileButton");

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
    fetchProfileButton.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    registerBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    newPostBtn.classList.remove("hidden");
  } else {
    fetchProfileButton.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    newPostBtn.classList.add("hidden");
  }

  fetchPosts();
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
      if (!data.token || !validateToken(data.token)) {
        throw new Error("Invalid token received from the server.");
      }
      localStorage.setItem("token", data.token);
      isAuthenticated = true;
      loginModal.classList.add("hidden");
      updateAuthUI();
    } else {
      const errorMessage = data.message || "Login failed. Please try again.";
      alert(errorMessage);
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert(error.message || "An unexpected error occurred. Please try again.");
  }
}
function validateToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  } catch (error) {
    console.error("Invalid token format:", error);
    return false;
  }
}
async function fetchProfile() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile. Please log in again.");
    }

    const data = await response.json();
    let isAuthenticated = localStorage.getItem("token") ? true : false;
    console.log(isAuthenticated);

    openInfoModal(`${data.message} User ID: ${data.userId}`);
  } catch (error) {
    alert(error.message);
  }
}

fetchProfileButton.addEventListener("click", fetchProfile);

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
      const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      isAuthenticated = true;
      fetchPosts();
      updateAuthUI();
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
}

// EVENT LISTENERS
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

export { updateAuthUI, loginUser, registerUser, logoutUser, isAuthenticated };
