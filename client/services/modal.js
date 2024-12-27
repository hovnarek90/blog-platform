import { API_URL } from "../config.js";
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const postTitleInput = document.getElementById("post-title");
const saveBtn = document.getElementById("save-btn");
const postContentInput = document.getElementById("post-content");
const postTitleLabel = document.getElementById("postTitleLabel");
const postContentLabel = document.getElementById("postContentLabel");
const modalContent = document.querySelector(".modal-content");

let currentPostId = null;

function resetModal() {
  modalTitle.textContent = "";
  postTitleInput.value = "";
  postContentInput.value = "";
  postTitleInput.disabled = false;
  postContentInput.disabled = false;
  saveBtn.classList.remove("hidden");
  postTitleInput.classList.remove("hidden");
  postTitleLabel.classList.remove("hidden");
  postContentLabel.classList.remove("hidden");
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
  resetModal();
}

function openInfoModal(content) {
  resetModal();
  modal.classList.remove("hidden");
  saveBtn.classList.add("hidden");
  postTitleInput.classList.add("hidden");
  postTitleInput.disabled = true;
  postContentInput.disabled = true;
  modalTitle.textContent = "Info";
  postTitleInput.value = "";
  postContentInput.value = content;

  postTitleLabel.classList.add("hidden");
  postContentLabel.classList.add("hidden");
}

export { openModal, closeModal, openEditModal, openInfoModal };
