// modal.js

const modalTitle = document.getElementById("modal-title");

export function openModal(modalElement) {
    modalElement.classList.remove("hidden");
  }
  
  export function closeModal(modalElement) {
    modalElement.classList.add("hidden");
  }
  