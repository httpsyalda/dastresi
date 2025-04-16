async function slideshow() {
  try {
    const response = await fetch("http://localhost:3003/slideshow");
    if (!response.ok) {
      throw new Error(`Error. ${response.status}`);
    }

    const data = await response.json();
    const slider = data.slides.map((item) => {
      return `<div class="swiper-slide"><img src="${item.image}" class="${
        item.class || ""
      }" alt="${item.alt || ""}"/></div>`;
    });

    const swiperWrapper = document.querySelector(".swiper-wrapper");
    if (swiperWrapper) {
      swiperWrapper.innerHTML = slider.join("");
    } else {
      console.error("Error.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  new Swiper(".myslideshow", {
    spaceBetween: 30,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}

export default slideshow;
