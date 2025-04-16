async function dailyOffers() {
  try {
    const response = await fetch("http://localhost:3003/dailyOffers");

    if (!response.ok) {
      throw new Error(`Error. ${response.status}`);
    }

    const data = await response.json();

    // Desktop
    const container = document.querySelector(".dailyOffers-container");
    if (!container) {
      console.error("Error.");
      return;
    }

    container.innerHTML = "";
    const lastThreeContainer = document.createElement("div");
    lastThreeContainer.className =
      "desktop:flex desktop:flex-col desktop:justify-between desktop:gap-y-6";

    data.forEach((item, index) => {
      if (index >= data.length - 3) {
        // 3rd-col
        const html = `
          <a class="desktop:bg-white desktop:rounded-xl desktop:shadow hover:shadow-xl desktop:border-l desktop:border-b desktop:cursor-pointer">
            <div class="desktop:flex desktop:justify-between desktop:items-center desktop:flex-row desktop:gap-4">
              <div class="relative">
                <img src="${item.image}" class="desktop:w-40 desktop:h-40 rounded-2xl" alt="" />
              </div>
              <div class="desktop:flex desktop:flex-col desktop:flex-1 desktop:justify-between desktop:gap-2 desktop:p-3">
                <h3 class="desktop:text-sm desktop:font-['Shabnam'] desktop:flex-1 desktop:leading-7">
                  ${item.title}
                </h3>
                <div class="desktop:flex desktop:flex-col desktop:gap-2">
                  <div class="desktop:flex desktop:flex-row desktop:gap-2 desktop:justify-between font-['Shabnam']">
                    <span class="text-[#9E9E9E] desktop:font-bold desktop:line-through desktop:text-[15px]">
                      ${item.originalPrice}
                    </span>
                    <span class="desktop:text-sm desktop:text-[#E46C4C]">
                      ${item.discount}
                    </span>
                  </div>
                  <div class="desktop:flex desktop:flex-row desktop:items-center desktop:justify-end desktop:gap-1 font-['Shabnam']">
                    <span class="desktop:text-xl desktop:text-[#0a5abd] desktop:font-bold">
                      ${item.finalPrice}
                    </span>
                    <span class="desktop:text-xs desktop:text-gray-500">
                      ${item.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        `;
        lastThreeContainer.insertAdjacentHTML("beforeend", html);
      } else {
        const html = `
          <div class="shadow rounded-xl bg-white desktop:border-l border-b border-gray-e2 desktop:p-4 desktop:cursor-pointer hover:shadow-xl desktop:h-full">
            <img src="${item.image}" alt="" class="desktop:w-[285px] desktop:h-[285px]" />
            <p class="font-['Shabnam'] desktop:my-5 desktop:leading-8">${item.title}</p>
            <div class="desktop:flex desktop:justify-between desktop:mt-28">
              <span class="desktop:font-['Shabnam'] desktop:text-[15px] desktop:text-[#8E8E8E] font-bold line-through">${item.originalPrice}</span>
              <span class="desktop:font-['Shabnam'] desktop:text-sm text-[#FE5F55]">${item.discount}</span>
            </div>
            <div class="desktop:flex desktop:items-center desktop:justify-end desktop:mt-3 font-['Shabnam']">
              <span class="desktop:text-xl desktop:font-bold text-[#0a5abd]">${item.finalPrice}</span>
              <span class="desktop:text-xs desktop:mr-1 desktop:text-gray-500">${item.currency}</span>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", html);
      }
    });

    container.appendChild(lastThreeContainer);

    // Mobile
    const mobileContainer = document.querySelector(".mobile-dailyOffers");
    if (!mobileContainer) {
      console.error("Error.");
      return;
    }

    mobileContainer.innerHTML = "";

    data.forEach((item) => {
      const mobileHtml = `
        <div class="shadow rounded-xl bg-white border-l border-b p-3 flex gap-6">
          <img
            src="${item.image}"
            alt="${item.title || "Daily Offer"}"
            class="mobile:w-40 mobile:h-40"
          />
          <div class="flex flex-col gap-3 font-['Shabnam']">
            <p class="text-sm leading-6">${item.title}</p>
            <div class="flex gap-4">
              <span
                class="font-['Shabnam'] text-[15px] text-[#8E8E8E] font-bold line-through"
              >
                ${item.originalPrice}
              </span>
              <span
                class="font-['Shabnam'] text-sm text-[#FE5F55] text-center"
              >
                ${item.discount}
              </span>
            </div>
            <div class="flex items-center justify-end mt-3 font-['Shabnam']">
              <span class="text-xl font-bold text-[#0a5abd]">
                ${item.finalPrice}
              </span>
              <span class="text-xs mr-1 text-gray-500">${item.currency}</span>
            </div>
          </div>
        </div>
      `;
      mobileContainer.insertAdjacentHTML("beforeend", mobileHtml);
    });

    console.log("Loaded successfully.");
  } catch (error) {
    console.error("Error.", error.message);
  }
}

export default dailyOffers;
