"use strict";
// Event Listeners for scrolling
(function () {
  const headerEl = document.querySelector(".header");
  const section1 = document.querySelector(".section-how");
  const btnLearnMore = document.querySelector(".btn--outline");

  // Learn more button event listener

  btnLearnMore.addEventListener("click", function (e) {
    e.preventDefault();

    const coords = section1.getBoundingClientRect();

    window.scrollTo({
      top: coords.top + window.scrollY,
      left: coords.left + window.scrollX,
      behavior: "smooth",
    });
  });

  // Header event listener for logo and nav bar

  headerEl.addEventListener("click", function (e) {
    e.preventDefault();
    // Header, main-nav-list("UL"), main-nav("nav") guard clause
    if (
      e.target === document.querySelector(".header") ||
      e.target === document.querySelector(".main-nav-list") ||
      e.target === document.querySelector(".main-nav")
    )
      return;

    // Mobile nav button guard clause
    if (e.target.closest(".btn-mobile-nav")) return;

    // Logo function
    if (
      e.target === document.querySelector(".logo") ||
      e.target === document.querySelector(".logo").closest("a")
    ) {
      /* 
      *****************************
      Sticky class varsa reload yerine sayfanın yukarısına gitme özelliği ekle
      *****************************
      */
      location.reload();
      return;
    }

    // Nav bar function for both mobile and desktop
    const id = e.target.closest(".main-nav-link").getAttribute("href");
    const section = document.querySelector(id);
    const coords = section.getBoundingClientRect();
    window.scrollTo({
      top: coords.top + window.scrollY,
      left: coords.left + window.scrollX,
      behavior: "smooth",
    });

    headerEl.classList.remove("nav-open");
  });

  // Event listener for toggling mobile nav bar
  const mobileButton = document.querySelector(".btn-mobile-nav");

  mobileButton.addEventListener("click", function (e) {
    headerEl.classList.toggle("nav-open");
  });
})();
