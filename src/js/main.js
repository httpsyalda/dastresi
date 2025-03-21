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

function toPersianNumbers(num) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  return num.toString().replace(/[0-9]/g, d => persianDigits[d]);
}

let totalSeconds = 12 * 3600 + 25 * 60 + 40;
const timerElement = document.getElementById("timer");

function updateTimer() {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  
  timerElement.textContent = toPersianNumbers(
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  );

  if (totalSeconds > 0) {
      totalSeconds--;
      setTimeout(updateTimer, 1000);
  }
}

updateTimer();
