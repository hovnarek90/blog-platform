import { API_URL } from "../config.js";
import { openModal, closeModal } from "./modal.js";

const postTitleInput = document.getElementById("post-title");
const postsContainer = document.getElementById("posts");
const postContentInput = document.getElementById("post-content");
const saveBtn = document.getElementById("save-btn");
const closeBtn = document.querySelector(".close-btn");
const newPostBtn = document.getElementById("new-post-btn"); 

let isAuthenticated = localStorage.getItem("token") ? true : false;
let currentPostId = null;
let isLoading = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
  setupEventListeners();
});

function showLoader() {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
}

function hideLoader() {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
}

async function fetchPosts() {
  try {
    isLoading = true;
    showLoader();
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch posts");
    let isAuthenticated = localStorage.getItem("token") ? true : false;

    const posts = await response.json();
    postsContainer.innerHTML = posts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(
        (post) => `
        <div class="post">
          <h2>${post.title}</h2>
          <p>${post.content.substring(0, 100)}...</p>
          <p class="date">${new Date(post.createdAt).toLocaleString()}</p>
          <div class="post-buttons">
            <button class="view-btn" data-id="${post._id}">View</button>
            ${
              isAuthenticated
                ? `<button class="edit-btn" data-id="${post._id}">Edit</button>
                   <button class="delete-btn" data-id="${post._id}">Delete</button>`
                : ""
            }
          </div>
        </div>`
      )
      .join("");
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading = false;
    hideLoader();
  }
}

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

async function openEditModal(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch post details");

    const post = await response.json();
    currentPostId = id;
    postTitleInput.value = post.title || "";
    postContentInput.value = post.content || "";

    saveBtn.textContent = "Update Post";
    openModal("Edit Post", post);
  } catch (error) {
    console.error("Error in openEditModal:", error);
    alert(`Error: ${error.message}`);
  }
}

function setupEventListeners() {
  postsContainer.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.matches(".view-btn")) {
      viewPost(id);
    } else if (e.target.matches(".edit-btn")) {
      openEditModal(id);
    } else if (e.target.matches(".delete-btn")) {
      deletePost(id);
    }
  });

  newPostBtn.addEventListener("click", () => {
    currentPostId = null;
    postTitleInput.value = "";
    postContentInput.value = "";
    saveBtn.textContent = "Save Post";
    openModal("New Post");
  });

  saveBtn.addEventListener("click", () => {
    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();

    if (!title || !content) {
      alert("Both title and content are required.");
      return;
    }

    if (currentPostId) {
      updatePost(currentPostId, { title, content });
    } else {
      createPost({ title, content });
    }
  });

  closeBtn.addEventListener("click", closeModal);
}

export {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  viewPost,
  openEditModal,
  openModal,
  closeModal,
};
