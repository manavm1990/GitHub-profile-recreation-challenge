import test from "./api.js";

const dropdown = document.querySelector("#dropdown");

document.querySelector("#toggle-nav").addEventListener("click", () => {
  dropdown.classList.replace("is-hidden", "is-shown") ||
    dropdown.classList.replace("is-shown", "is-hidden");
});
