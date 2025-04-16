async function menu() {
  try {
    const menuContainer = document.querySelector(".menuItem");
    const response = await fetch("http://localhost:3003/menu");
    const menuData = await response.json();

    const menuHTML = menuData.map((item) => {
      if (item.title === "خانه") {
        return `
          <li
            class="menu relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:top-[55px] after:h-[3px] after:bg-[#FE5F55] after:w-full"
          >
            <a href="${
              item.link || "#"
            }" class="desktop:block desktop:text-[#FE5F55]">${item.title}</a>
          </li>
        `;
      }

      if (item.title === "برندها") {
        const brandColumns = item.submenu
          .map((column, index) => {
            const borderClass =
              index === item.submenu.length - 1
                ? ""
                : "desktop:border-l desktop:border-gray-200";
            return `
              <div class="${borderClass}">
                ${column.column
                  .map(
                    (brand) => `
                      <div
                        class="desktop:flex desktop:justify-between desktop:py-2 desktop:px-1 desktop:hover:bg-gray-100 desktop:hover:text-[#0a5abd]"
                      >
                        <span>${brand.name}</span>
                        <span>${brand.englishName}</span>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            `;
          })
          .join("");

        return `
          <li
            class="menu relative group hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:top-[55px] after:h-[3px] after:bg-[#FE5F55] after:w-0 after:transition-all"
          >
            <a href="#" class="desktop:block">${item.title}</a>
            <img
              src="./public/images/header/dropdown.svg"
              alt="dropdown"
              class="desktop:w-5 desktop:mt-[0.5] desktop:mr-2"
            />
            <div
              class="desktop:absolute desktop:hidden desktop:group-hover:block desktop:bg-white desktop:shadow-lg desktop:rounded-b-md desktop:mt-[7.5px] desktop:p-2 desktop:w-[1240px] desktop:rtl desktop:left-0 desktop:top-[50px]"
            >
              <div
                class="desktop:grid desktop:grid-cols-5 desktop:text-xs text-[#666666] desktop:border-b desktop:border-gray-200"
              >
                ${brandColumns}
              </div>
              <div class="desktop:mt-4 desktop:mb-2">
                <a
                  href="${item.moreLink.link}"
                  class="desktop:text-red-500 desktop:text-xs desktop:hover:text-[#0a5abd] desktop:flex desktop:gap-1 desktop:items-center"
                >
                  <span>${item.moreLink.text}</span>
                  <img
                    src="./public/images/header/left-chevron.png"
                    alt=""
                    class="desktop:w-2 desktop:h-2"
                  />
                </a>
              </div>
            </div>
          </li>
        `;
      }

      const submenuHTML = item.submenu
        ? item.submenu
            .map(
              (submenuItem) => `
                <li>
                  <a
                    href="${submenuItem.link}"
                    class="desktop:block desktop:px-3 desktop:py-3 desktop:hover:bg-gray-100 desktop:text-xs desktop:text-[#666666] desktop:hover:text-[#0a5abd]"
                  >
                    ${submenuItem.name}
                  </a>
                </li>
              `
            )
            .join("")
        : "";

      return `
        <li
          class="menu relative group hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:top-[55px] after:h-[3px] after:bg-[#FE5F55] after:w-0 after:transition-all"
        >
          <a href="${item.link || "#"}" class="desktop:block">${item.title}</a>
          ${
            item.submenu
              ? `
              <img
                src="./public/images/header/dropdown.svg"
                alt="dropdown"
                class="desktop:w-5 desktop:mt-[0.5] desktop:mr-2"
              />
              <ul
                class="desktop:absolute desktop:hidden desktop:group-hover:block desktop:bg-white desktop:shadow rounded-b desktop:top-[57.5px] desktop:w-[300px] desktop:right-[1px]"
              >
                ${submenuHTML}
              </ul>
            `
              : ""
          }
        </li>
      `;
    });

    menuContainer.innerHTML = menuHTML.join("");
  } catch (error) {
    console.error("Error:", error);
  }
}

export default menu;
