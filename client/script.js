const API_URL = "http://localhost:5000/api/posts";
const AUTH_URL = "http://localhost:5000/api/auth";
const postsContainer = document.getElementById("posts");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const postTitleInput = document.getElementById("post-title");
const postContentInput = document.getElementById("post-content");
const saveBtn = document.getElementById("save-btn");
const closeBtn = document.querySelector(".close-btn");

const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const closeLoginBtn = document.querySelector(".close-login-btn");
const closeRegisterBtn = document.querySelector(".close-register-btn");

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const newPostBtn = document.getElementById("new-post-btn");
const registerSubmit = document.getElementById("register-submit");
const loginSubmit = document.getElementById("login-submit");

let isAuthenticated = localStorage.getItem("token") ? true : false;
let currentPostId = null;

// AUTHENTICATION MANAGEMENT

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
updateAuthUI();

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
      alert("Registration successful! You can now log in.");
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
  alert("You have been logged out.");
  fetchPosts();
}


// POST MANAGEMENT

async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();
    postsContainer.innerHTML = posts
      .map(
        (post) => `
          <div class="post">
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 100)}...</p>
            <p class="date">${new Date(post.createdAt).toLocaleString()}</p>
            <div class="post-buttons">
              <button onclick="viewPost('${post._id}')">View</button>
              ${
                isAuthenticated
                  ? `<button onclick="openEditModal('${post._id}')">Edit</button>
                     <button onclick="deletePost('${post._id}')">Delete</button>`
                  : ""
              }
            </div>
          </div>`
      )
      .join("");
  } catch (error) {
    alert(error.message);
  }
}
fetchPosts();

async function createPost(post) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error("Failed to create post");
    closeModal();
    fetchPosts();
  } catch (error) {
    alert(error.message);
  }
}

async function updatePost(id, post) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error("Failed to update post");
    closeModal();
    fetchPosts();
  } catch (error) {
    alert(error.message);
  }
}

async function deletePost(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!response.ok) throw new Error("Failed to delete post");
    fetchPosts();
  } catch (error) {
    alert(error.message);
  }
}

async function viewPost(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch post");

    const post = await response.json();
    openModal("View Post", post);
    postTitleInput.disabled = true;
    postContentInput.disabled = true;
    saveBtn.classList.add("hidden");
  } catch (error) {
    alert(error.message);
  }
}

function openEditModal(id) {
  fetch(`${API_URL}/${id}`)
    .then((res) => res.json())
    .then((post) => {
      currentPostId = id;
      openModal("Edit Post", post);
      postTitleInput.disabled = false;
      postContentInput.disabled = false;
      saveBtn.classList.remove("hidden");
    });
    
}

function openModal(title, post = {}) {
  modalTitle.textContent = title;
  postTitleInput.value = post.title || "";
  postContentInput.value = post.content || "";
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  currentPostId = null;
  postTitleInput.disabled = false;
  postContentInput.disabled = false;
  saveBtn.classList.remove("hidden");
}

saveBtn.addEventListener("click", () => {
  if (!isAuthenticated) {
    alert("Please log in first.");
    return;
  }

  const title = postTitleInput.value.trim();
  const content = postContentInput.value.trim();

  if (title && content) {
    if (currentPostId) {
      updatePost(currentPostId, { title, content });
    } else {
      createPost({ title, content });
    }
  }
});

closeBtn.addEventListener("click", closeModal);

closeLoginBtn.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});
closeRegisterBtn.addEventListener("click", () => {
  registerModal.classList.add("hidden");
});

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
registerSubmit.addEventListener("click", registerUser);
loginSubmit.addEventListener("click", loginUser);

