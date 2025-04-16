async function articles() {
  try {
    const response = await fetch("http://localhost:3003/articles");
    if (!response.ok) {
      throw new Error(`Error. ${response.status}`);
    }

    const articles = await response.json();

    if (!Array.isArray(articles)) {
      throw new Error("Error.");
    }

    // Desktop
    const articlesHTML = articles
      .map((article) => {
        return `
          <div class="swiper-slide desktop:hover:text-[#1c66c2]">
            <a href="${article.link}" class="articles">
              <div class="desktop:flex desktop:flex-col">
                <img
                  src="${article.image}"
                  alt="${article.alt || "Article"}"
                  class="mx-auto rounded-xl"
                />
                <div
                  class="desktop:flex desktop:flex-col desktop:justify-around desktop:text-center font-['Shabnam']"
                >
                  <h3
                    class="desktop:leading-7 desktop:text-sm desktop:overflow-hidden desktop:h-16 desktop:px-4 desktop:flex desktop:items-center desktop:justify-center"
                  >
                    <span>${article.title}</span>
                  </h3>
                </div>
              </div>
            </a>
          </div>
        `;
      })
      .join("");

    const swiperWrapper = document.querySelector(".swiper-wrapper-articles");
    if (!swiperWrapper) {
      console.error("Error.");
      return;
    }

    swiperWrapper.innerHTML = articlesHTML;

    // Mobile
    const mobileArticlesHTML = articles
      .map((article) => {
        return `
          <div class="swiper-slide">
            <a href="${article.link}" class="articles">
              <div class="mobile:flex mobile:flex-col">
                <img
                  src="${article.image}"
                  alt="${article.alt || "Article"}"
                  class="mx-auto rounded-xl"
                />
                <div
                  class="mobile:flex mobile:flex-col mobile:justify-around mobile:text-center mobile:font-['Shabnam']"
                >
                  <h3
                    class="mobile:leading-7 mobile:text-xs mobile:overflow-hidden h-16 mobile:px-4 mobile:flex mobile:items-center mobile:justify-center"
                  >
                    <span>${article.title}</span>
                  </h3>
                </div>
              </div>
            </a>
          </div>
        `;
      })
      .join("");

    const mobileSwiperWrapper = document.querySelector(
      ".swiper-wrapper-articles-mobile"
    );
    if (!mobileSwiperWrapper) {
      console.error("Error.");
      return;
    }

    let swiper;

    swiperWrapper.innerHTML = articlesHTML;

    swiper = new Swiper(".myarticles", {
      slidesPerView: 4,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    mobileSwiperWrapper.innerHTML = mobileArticlesHTML;

    swiper = new Swiper(".myArticlesMobile", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    console.log("Loaded successfully.");
  } catch (error) {
    console.error("Error.", error.message);
  }
}

export default articles;
