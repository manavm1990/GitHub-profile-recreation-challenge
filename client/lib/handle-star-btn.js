export default () =>
  document.querySelectorAll(".btn-star").forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log("hi", this);
    });
  });
