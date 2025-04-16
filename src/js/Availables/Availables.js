async function availables() {
  try {
    const response = await fetch("http://localhost:3003/availables");
    if (!response.ok) {
      throw new Error(`Error. ${response.status}`);
    }

    const availables = await response.json();

    if (!Array.isArray(availables)) {
      throw new Error("Error.");
    }

    // Desktop
    const availableHTML = availables
      .map((product) => {
        const colorsHTML = product.colors
          ? product.colors
              .map(
                (color) =>
                  `<span class="desktop:w-3 desktop:h-3 desktop:m-1 desktop:rounded-full desktop:border" style="background-color: ${color}; border-color: ${color};"></span>`
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

    const swiperWrapper = document.querySelector(".swiper-wrapper-available");
    if (!swiperWrapper) {
      console.error("Error.");
      return;
    }

    swiperWrapper.innerHTML = availableHTML;

    new Swiper(".myavailable", {
      slidesPerView: 4,
      spaceBetween: 20,
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

    // Mobile
    const mobileHTML = availables
      .map((product) => {
        return `
          <div class="swiper-slide shadow-sm rounded-xl">
            <a href="#" class="rounded-xl block font-['Shabnam'] bg-white">
              <img
                src="${product.image}"
                alt="${product.alt || "Product"}"
                class="rounded-2xl"
              />
              <p class="text-xs text-gray-400 mt-4 text-center">
                ${product.title}
              </p>
              <p class="text-sm mt-4 text-center px-3">
                ${product.description}
              </p>
              ${
                product.price
                  ? `<div
                      class="flex justify-end items-center px-3 font-['Shabnam'] gap-1 pb-2 mt-8"
                    >
                      <span class="text-lg text-[#0a5abd] font-bold">${product.price}</span>
                      <span class="text-xs text-gray-500">${product.currency}</span>
                    </div>`
                  : `<div
                      class="w-full h-[60px] bg-[#FFF5F5] flex justify-center items-center border-t border-t-gray-200 rounded-b-xl mt-2"
                    >
                      <span class="font-['Shabnam'] text-[#9b2c2c] text-sm">ناموجود</span>
                    </div>`
              }
            </a>
          </div>
        `;
      })
      .join("");

    const mobileSwiperWrapper = document.querySelector(
      ".swiper-wrapper-mobile-availables"
    );
    if (!mobileSwiperWrapper) {
      console.error("Error.");
      return;
    }
    let swiper;
    mobileSwiperWrapper.innerHTML = mobileHTML;
    swiper = new Swiper(".myAvailableMobile", {
      slidesPerView: 2,
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

export default availables;
