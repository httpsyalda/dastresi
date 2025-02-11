document
  .getElementById("scrollUpBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

document.addEventListener("DOMContentLoaded", function () {
  const sideMenu = document.getElementById("side-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  const menuButton = document.querySelector(".menu-button");
  const closeMenu = () => {
    sideMenu.classList.add("translate-x-full");
    menuOverlay.classList.add("hidden");
  };

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      sideMenu.classList.remove("translate-x-full");
      menuOverlay.classList.remove("hidden");
    });
  }

  menuOverlay.addEventListener("click", closeMenu);
});
