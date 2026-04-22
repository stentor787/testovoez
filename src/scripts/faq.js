const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq__header");
  const content = item.querySelector(".faq__content");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("faq__item--open");

    faqItems.forEach((i) => {
      i.classList.remove("faq__item--open");
      i.querySelector(".faq__header").setAttribute("aria-expanded", "false");
      i.querySelector(".faq__content").hidden = true;
    });

    if (!isOpen) {
      item.classList.add("faq__item--open");
      button.setAttribute("aria-expanded", "true");
      content.hidden = false;
    }
  });
});
