const API_URL = "http://localhost:5000/api/posts";

const postsContainer = document.getElementById("posts");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const postTitleInput = document.getElementById("post-title");
const postContentInput = document.getElementById("post-content");
const saveBtn = document.getElementById("save-btn");
const closeBtn = document.querySelector(".close-btn");

let currentPostId = null;
function openModal(title, post = {}) {
  modalTitle.textContent = title;
  postTitleInput.value = post.title || "";
  postContentInput.value = post.content || "";
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  postTitleInput.value = "";
  postContentInput.value = "";
  currentPostId = null;
}

document.getElementById("new-post-btn").addEventListener("click", () => {
  openModal("New Post");
});

closeBtn.addEventListener("click", closeModal);

saveBtn.addEventListener("click", () => {
  const title = postTitleInput.value.trim();
  const content = postContentInput.value.trim();

  if (title && content) {
    if (currentPostId) {
      updatePost(currentPostId, { title, content });
    } else {
      createPost({ title, content });
    }
    closeModal();
  } else {
    alert("Title and content cannot be empty!");
  }
});

async function fetchPosts() {
  const response = await fetch(API_URL);
  const posts = await response.json();
  postsContainer.innerHTML = posts
    .map(
      (post) => `
      <div class="post">
  <h2>${post.title}</h2>
  <p>${post.content.substring(0, 100)}...</p>
  <div class="post-buttons">
    <button onclick="viewPost('${post._id}')">View</button>
    <button onclick="openEditModal('${post._id}')">Edit</button>
    <button class="delete-btn" onclick="deletePost('${
      post._id
    }')">Delete</button>
  </div>
</div>

    `
    )
    .join("");
}

async function updatePost(id, post) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  fetchPosts();
}

function openEditModal(id) {
  fetch(`${API_URL}/${id}`)
    .then((response) => response.json())
    .then((post) => {
      currentPostId = id;
      openModal("Edit Post", post);
    });
}

fetchPosts();

async function createPost(post) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  fetchPosts();
}

async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchPosts();
}

async function viewPost(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const post = await response.json();
  openModal("View Post", post);
  saveBtn.style.display = "none";
  postTitleInput.disabled = true;
  postContentInput.disabled = true;
  postTitleInput.value = post.title;
  postContentInput.value = post.content;
}

async function editPost(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const post = await response.json();
  openEditModal(id);
  if (title && content) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    fetchPosts();
  }
}

fetchPosts();
