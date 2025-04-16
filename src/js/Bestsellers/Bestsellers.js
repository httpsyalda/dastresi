async function bestsellers() {
  try {
    const response = await fetch("http://localhost:3003/bestsellers");
    if (!response.ok) {
      throw new Error(`Error. ${response.status}`);
    }

    const bestsellers = await response.json();

    if (!Array.isArray(bestsellers)) {
      throw new Error("Error.");
    }

    // Desktop
    const bestsellersHTML = bestsellers
      .map((product) => {
        const colorsHTML = product.colors
          ? product.colors
              .map(
                (color) =>
                  `<span class="desktop:w-3 desktop:h-3 desktop:m-1 desktop:rounded-full desktop:border desktop:bg-${color} desktop:border-${color}"></span>`
              )
              .join("")
          : "";

        return `
          <div class="swiper-slide desktop:shadow desktop:rounded-xl">
            <a
              href="#"
              class="desktop:rounded-xl desktop:block desktop:font-['Shabnam'] relative desktop:bg-white"
            >
              <div
                class="absolute desktop:flex desktop:flex-col desktop:left-3 desktop:top-3"
              >
                ${colorsHTML}
              </div>
              <img
                src="${product.image}"
                alt="${product.alt || "Product"}"
                class="rounded-2xl"
              />
              <p
                class="desktop:text-xs desktop:text-gray-400 desktop:mt-4 desktop:text-center"
              >
                ${product.title}
              </p>
              <p
                class="desktop:text-sm desktop:mt-4 desktop:hover:text-[#0a5abd] desktop:text-center"
              >
                ${product.description}
              </p>
              ${
                product.price
                  ? `<div
                      class="desktop:flex desktop:justify-end desktop:items-center desktop:px-3 font-['Shabnam'] desktop:gap-1 desktop:pb-2 desktop:mt-8"
                    >
                      <span
                        class="desktop:text-xl desktop:text-[#0a5abd] desktop:font-bold"
                      >${product.price}</span>
                      <span class="desktop:text-xs desktop:text-gray-500">${product.currency}</span>
                    </div>`
                  : `<div
                      class="desktop:w-full desktop:h-[60px] desktop:bg-[#FFF5F5] desktop:flex desktop:justify-center desktop:items-center desktop:border-t desktop:border-t-gray-200 desktop:rounded-b-xl desktop:mt-2"
                    >
                      <span
                        class="desktop:font-['Shabnam'] desktop:text-[#9b2c2c] desktop:text-sm"
                      >ناموجود</span>
                    </div>`
              }
            </a>
          </div>
        `;
      })
      .join("");

    const swiperWrapper = document.querySelector(".swiper-wrapper-bestsellers");
    if (!swiperWrapper) {
      console.error("Error.");
      return;
    }

    swiperWrapper.innerHTML = bestsellersHTML;

    // Mobile
    const mobileHTML = bestsellers
      .map((product) => {
        return `
          <div class="swiper-slide mobile:shadow-sm mobile:rounded-xl">
            <a
              href="#"
              class="mobile:rounded-xl mobile:block mobile:font-['Shabnam'] mobile:bg-white"
            >
              <img
                src="${product.image}"
                alt="${product.alt || "Product"}"
                class="rounded-2xl"
              />
              <p
                class="mobile:text-xs mobile:text-gray-400 mobile:mt-4 mobile:text-center"
              >
                ${product.title}
              </p>
              <p class="mobile:text-sm mobile:mt-4 mobile:text-center">
                ${product.description}
              </p>
              ${
                product.price
                  ? `<div
                      class="mobile:flex mobile:justify-end mobile:items-center mobile:px-3 font-['Shabnam'] mobile:gap-1 mobile:pb-2 mobile:mt-8"
                    >
                      <span
                        class="mobile:text-lg mobile:text-[#0a5abd] mobile:font-bold"
                      >${product.price}</span>
                      <span class="mobile:text-xs mobile:text-gray-500">${product.currency}</span>
                    </div>`
                  : `<div
                      class="mobile:w-full mobile:h-[60px] mobile:bg-[#FFF5F5] mobile:flex mobile:justify-center mobile:items-center mobile:border-t mobile:border-t-gray-200 mobile:rounded-b-xl mobile:mt-2"
                    >
                      <span
                        class="mobile:font-['Shabnam'] mobile:text-[#9b2c2c] mobile:text-sm"
                      >ناموجود</span>
                    </div>`
              }
            </a>
          </div>
        `;
      })
      .join("");

    const mobileSwiperWrapper = document.querySelector(
      ".swiper-wrapper-bestseller-mobile"
    );
    if (!mobileSwiperWrapper) {
      console.error("Error.");
      return;
    }

    let swiper;
    mobileSwiperWrapper.innerHTML = mobileHTML;
    swiper = new Swiper(".myBestsellerMobile", {
      slidesPerView: 2,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        delay: 2000,
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

export default bestsellers;
