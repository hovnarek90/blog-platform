import { API_URL } from "../config.js";
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const postTitleInput = document.getElementById("post-title");
const saveBtn = document.getElementById("save-btn");
const postContentInput = document.getElementById("post-content");
let currentPostId = null;

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

export { openModal, closeModal, openEditModal };
