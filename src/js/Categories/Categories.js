async function categories() {
  try {
    const response = await fetch("http://localhost:3003/categories");
    if (!response.ok) {
      throw new Error(`Error. ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Error.");
    }

    // Desktop
    const slidesHTML = data
      .map((category) => {
        return `
          <div class="swiper-slide cursor-pointer">
            <img
              src="${category.image}"
              alt="${category.alt || "Category"}"
              class="${
                category.class ||
                "desktop:w-[185px] desktop:h-[185px] desktop:object-cover desktop:block"
              }"
            />
          </div>
        `;
      })
      .join("");

    const swiperWrapper = document.querySelector(".swiper-wrapper-categories");
    if (!swiperWrapper) {
      console.error("Error.");
      return;
    }

    swiperWrapper.innerHTML = slidesHTML;

    new Swiper(".mycategories", {
      slidesPerView: 6,
      spaceBetween: 25,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // Mobile
    const mobileHTML = data
      .map((category) => {
        return `
          <a
            href="#"
            class="mobile:flex mobile:flex-col mobile:justify-center mobile:items-center mobile:w-full"
          >
            <img
              src="${category.image}"
              alt="${category.alt || "Category"}"
              class="mobile:w-[160px] mobile:h-[160px]"
            />
          </a>
        `;
      })
      .join("");

    const mobileContainer = document.querySelector(".mobile-categories");
    if (!mobileContainer) {
      console.error("Error.");
      return;
    }

    mobileContainer.innerHTML = mobileHTML;

    console.log("Loaded successfully.");
  } catch (error) {
    console.error("Error.", error.message);
  }
}

export default categories;
