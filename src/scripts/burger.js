/*
 МЕНЮ (с логикой проваливания в каталоги)
 */

document.addEventListener("DOMContentLoaded", function () {
  // ==================== ДАННЫЕ ДЛЯ КАТАЛОГОВ ====================
  // Данные хранятся в одном месте — легко добавлять/менять
  const catalogData = {
    sites: {
      title: "Сайты",
      items: [
        "Интернет-магазин",
        "Индивидуальная разработка",
        "Сайт-каталог",
        "Информационно-техническая поддержка",
        "Корпоративный сайт",
        "Гранты на разработку",
        "Landing-page",
        "Разработка на Tilda",
        "Парсинг товаров и цен",
      ],
    },
    integrations: {
      title: "Интеграции",
      items: [
        "CRM интеграции",
        "Платежные системы",
        "1С интеграция",
        "API интеграции",
      ],
    },
    design: {
      title: "Дизайн",
      items: [
        "Веб-дизайн",
        "UX/UI дизайн",
        "Графический дизайн",
        "Логотипы и брендинг",
      ],
    },
  };

  // ==================== DOM ЭЛЕМЕНТЫ ====================
  const menuBtn = document.querySelector(".header__burger");
  const menu = document.getElementById("menu");
  const body = document.body;

  const backButtons = document.querySelectorAll("[data-back]");
  const closeButtons = document.querySelectorAll(".catalog-close");
  const stateNormal = document.querySelector(".header__state-normal");
  const stateCatalog = document.querySelector(".header__state-catalog");

  // ==================== СОСТОЯНИЕ ====================
  const catalogs = {};
  let currentOpenCatalog = null;

  // ==================== ГЕНЕРАЦИЯ КАТАЛОГОВ ====================
  /**
   * Генерирует HTML для пунктов каталога из массива данных
   * @param {Array} items - массив строк с названиями пунктов
   * @returns {string} HTML строка с пунктами
   */
  const generateCatalogItems = (items) => {
    return items
      .map(
        (item) => `
      <li class="menu-catalog__item">
        <a href="#">${item}</a>
      </li>
    `,
      )
      .join("");
  };

  /**
   * Заполняет все каталоги данными
   */
  const populateCatalogs = () => {
    for (const [key, data] of Object.entries(catalogData)) {
      const container = document.getElementById(`catalog-${key}-list`);
      if (container) {
        container.innerHTML = generateCatalogItems(data.items);
      }
    }
  };

  // ==================== HELPERS ====================

  /**
   * Закрыть все открытые каталоги
   */
  const closeAllCatalogs = () => {
    Object.values(catalogs).forEach((c) =>
      c?.classList.remove("menu-catalog--open"),
    );
    currentOpenCatalog = null;
  };

  /**
   * Показать нормальное состояние шапки (логотип, иконки)
   */
  const showNormalState = () => {
    if (stateNormal) stateNormal.style.display = "flex";
    if (stateCatalog) stateCatalog.style.display = "none";
  };

  /**
   * Показать состояние каталога (кнопка Назад, крестик)
   */
  const showCatalogState = () => {
    if (stateNormal) stateNormal.style.display = "none";
    if (stateCatalog) stateCatalog.style.display = "flex";
  };

  /**
   * Закрыть главное меню
   */
  const closeMainMenu = () => {
    menu.classList.remove("menu--open");
    body.classList.remove("no-scroll");
  };

  /**
   * Открыть главное меню
   */
  const openMainMenu = () => {
    menu.classList.add("menu--open");
    body.classList.add("no-scroll");
    menu.scrollTop = 0;
  };

  /**
   * Полный сброс всего (закрыть меню и каталоги)
   */
  const resetAll = () => {
    closeAllCatalogs();
    closeMainMenu();
    showNormalState();
    body.classList.remove("no-scroll");
  };

  /**
   * Открыть конкретный каталог
   * @param {string} catalogId - идентификатор каталога (sites, integrations, design)
   */
  const openCatalog = (catalogId) => {
    const targetCatalog = catalogs[catalogId];
    if (!targetCatalog) return;

    closeMainMenu();
    closeAllCatalogs();

    targetCatalog.classList.add("menu-catalog--open");
    currentOpenCatalog = targetCatalog;

    targetCatalog.scrollTop = 0;
    showCatalogState();
    body.classList.add("no-scroll");
  };

  // ==================== ОБРАБОТЧИКИ ====================

  // Пункты с каталогами (открывают каталог при клике)
  document
    .querySelectorAll(".menu__list-item[data-catalog]")
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const catalogId = item.dataset.catalog;
        openCatalog(catalogId);
      });
    });

  // Обычные пункты меню (без каталога) - закрывают всё
  document
    .querySelectorAll(".menu__list-item:not([data-catalog]) > a")
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        e.stopPropagation();
        resetAll();
      });
    });

  // Нижние кнопки (портфолио, showreel)
  document.querySelectorAll(".menu__footer-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      resetAll();
    });
  });

  // Переключение языков
  document.querySelectorAll(".menu__lang p").forEach((langItem) => {
    langItem.addEventListener("click", (e) => {
      e.stopPropagation();
      document
        .querySelectorAll(".menu__lang p")
        .forEach((p) => p.classList.remove("menu__lang-current"));
      langItem.classList.add("menu__lang-current");
    });
  });

  // Бургер-меню
  menuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();

    // Если открыт каталог, сначала закрываем его
    if (currentOpenCatalog) {
      closeAllCatalogs();
      showNormalState();
    }

    menu.classList.toggle("menu--open");
    body.classList.toggle("no-scroll");

    if (menu.classList.contains("menu--open")) {
      menu.scrollTop = 0;
    }
  });

  // Кнопка "Назад" (возврат из каталога в главное меню)
  backButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllCatalogs();
      showNormalState();
      openMainMenu();
    });
  });

  // Крестик (закрыть всё)
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      resetAll();
    });
  });

  // Пункты в каталогах - закрывают всё при выборе (делегирование)
  document.querySelectorAll(".menu-catalog").forEach((catalog) => {
    catalog.addEventListener("click", (e) => {
      const link = e.target.closest(".menu-catalog__item a");
      if (link) {
        resetAll();
      }
    });
  });

  // ==================== ГЛОБАЛЬНЫЕ СОБЫТИЯ ====================

  // Закрытие по клику вне меню или каталога
  document.addEventListener("click", (e) => {
    const isMenuOpen = menu.classList.contains("menu--open");
    const isCatalogOpen = currentOpenCatalog !== null;

    if (!isMenuOpen && !isCatalogOpen) return;

    const isClickInside =
      menu?.contains(e.target) ||
      currentOpenCatalog?.contains(e.target) ||
      menuBtn?.contains(e.target) ||
      e.target.closest("[data-catalog]") ||
      e.target.closest("[data-back]") ||
      e.target.closest(".catalog-close") ||
      e.target.closest(".menu__lang p") ||
      e.target.closest(".menu__footer-item");

    if (!isClickInside) {
      resetAll();
    }
  });

  // Закрытие по клавише Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      resetAll();
    }
  });

  // Закрытие при ресайзе на десктоп
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 1024) {
        resetAll();
      }
    }, 250);
  });

  // Блокировка скролла при открытом меню (защита от скролла)
  let scrollPosition = 0;
  window.addEventListener("scroll", () => {
    if (menu?.classList.contains("menu--open") || currentOpenCatalog) {
      if (window.scrollY !== scrollPosition) {
        window.scrollTo(0, scrollPosition);
      }
    } else {
      scrollPosition = window.scrollY;
    }
  });

  // ==================== ACCESSIBILITY (Доступность) ====================

  // Добавляем ARIA-метки для пунктов с каталогами
  document
    .querySelectorAll(".menu__list-item[data-catalog]")
    .forEach((item) => {
      const text = item.querySelector("span")?.textContent || "раздел";
      item.setAttribute("aria-label", `Открыть каталог ${text}`);
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
    });

  // Добавляем ARIA-метки для обычных пунктов
  document
    .querySelectorAll(".menu__list-item:not([data-catalog]) > a")
    .forEach((link) => {
      const text = link.textContent || "раздел";
      link.setAttribute("aria-label", `Перейти в раздел ${text}`);
    });

  // Добавляем ARIA-метки для пунктов каталога (генерируются динамически, используем делегирование)
  // Добавляем ARIA-метки для футера
  document.querySelectorAll(".menu__footer-item").forEach((item) => {
    const text = item.querySelector("span")?.textContent || "раздел";
    item.setAttribute("aria-label", `Перейти в раздел ${text}`);
  });

  // Поддержка клавиатуры (Enter и Space для открытия каталога)
  document
    .querySelectorAll(".menu__list-item[data-catalog]")
    .forEach((item) => {
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const catalogId = item.dataset.catalog;
          openCatalog(catalogId);
        }
      });
    });

  // Поддержка клавиатуры для кнопки "Назад"
  document.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeAllCatalogs();
        showNormalState();
        openMainMenu();
      }
    });
  });

  // Поддержка клавиатуры для крестика
  document.querySelectorAll(".catalog-close").forEach((btn) => {
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        resetAll();
      }
    });
  });

  // Поддержка клавиатуры для бургера
  if (menuBtn) {
    menuBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        menuBtn.click();
      }
    });
  }

  // ==================== INIT ====================

  // Заполняем каталоги данными
  populateCatalogs();

  // Собираем каталоги в объект после заполнения
  document
    .querySelectorAll(".menu-catalog[data-catalog]")
    .forEach((catalog) => {
      catalogs[catalog.dataset.catalog] = catalog;
    });

  // Добавляем ARIA-метки для динамически созданных пунктов каталогов
  const addAriaToCatalogItems = () => {
    document.querySelectorAll(".menu-catalog__item a").forEach((link) => {
      const text = link.textContent || "пункт";
      link.setAttribute("aria-label", `Выбрать ${text}`);
    });
  };

  // Запускаем после заполнения
  addAriaToCatalogItems();

  // Наблюдатель за изменениями в каталогах (если появятся новые пункты)
  const catalogObserver = new MutationObserver(() => {
    addAriaToCatalogItems();
  });

  document.querySelectorAll(".menu-catalog__inner").forEach((container) => {
    catalogObserver.observe(container, { childList: true, subtree: true });
  });

  // Начальная инициализация
  showNormalState();
  closeAllCatalogs();
  closeMainMenu();
  body.classList.remove("no-scroll");
  scrollPosition = window.scrollY;
});
