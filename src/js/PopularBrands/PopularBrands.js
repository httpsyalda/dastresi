async function popularBrands() {
  try {
    const response = await fetch("http://localhost:3003/popularBrands");
    if (!response.ok) {
      throw new Error(`Error. ${response.status}`);
    }

    const popularBrands = await response.json();

    if (!Array.isArray(popularBrands)) {
      throw new Error("Error.");
    }

    // Desktop
    const brandsHTML = popularBrands
      .map((brand) => {
        return `
          <div class="swiper-slide">
            <a
              href="${brand.link}"
              class="desktop:flex desktop:items-center desktop:p-2 desktop:justify-center desktop:rounded-xl desktop:shadow-md desktop:bg-white desktop:my-4 desktop:border desktop:border-gray-100 desktop:transform desktop:hover:-translate-y-3 desktop:duration-200"
            >
              <img
                src="${brand.image}"
                alt="${brand.alt || "Brand"}"
                class="desktop:desktop:w-24 mobile:w-20"
              />
            </a>
          </div>
        `;
      })
      .join("");

    const swiperWrapper = document.querySelector(
      ".swiper-wrapper-popularBrands"
    );
    if (!swiperWrapper) {
      console.error("Error.");
      return;
    }

    swiperWrapper.innerHTML = brandsHTML;

    // Mobile
    const mobileBrandsHTML = popularBrands
      .map((brand) => {
        return `
          <div class="swiper-slide">
            <a
              href="${brand.link}"
              class="mobile:flex mobile:items-center mobile:p-2 mobile:justify-center mobile:rounded-xl mobile:shadow-md mobile:bg-white mobile:my-4 mobile:border mobile:border-gray-100"
            >
              <img
                src="${brand.image}"
                alt="${brand.alt || "Brand"}"
                class="desktop:w-24 mobile:w-20"
              />
            </a>
          </div>
        `;
      })
      .join("");

    const mobileSwiperWrapper = document.querySelector(
      ".swiper-wrapper-popularBrands-mobile"
    );
    if (!mobileSwiperWrapper) {
      console.error("Error.");
      return;
    }

    let swiper;
    mobileSwiperWrapper.innerHTML = mobileBrandsHTML;
    swiper = new Swiper(".myPopularBrandsMobile", {
      slidesPerView: 3,
      spaceBetween: 15,
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
    console.log("Loaded successfully.");
  } catch (error) {
    console.error("Error.", error.message);
  }
}

export default popularBrands;
