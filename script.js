"use strict";

(function () {
  const headerEl = document.querySelector(".header");

  // Updating the year that is in the footer
  const yearEl = document.querySelector(".year");
  const present = new Date().getFullYear();
  yearEl.textContent = present;

  // Event listener for toggling mobile nav bar
  const mobileButton = document.querySelector(".btn-mobile-nav");

  mobileButton.addEventListener("click", function (e) {
    headerEl.classList.toggle("nav-open");

    // Disabling and enabling scroll
    document.body.classList.toggle("noscrl");
    document.querySelector("html").classList.toggle("noscrl");
  });

  // Smooth scrolling for all the links
  const body = document.querySelector("body");
  body.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      e.target.classList.contains("logo") &&
      e.target.parentElement.getAttribute("href")
    ) {
      !headerEl.classList.contains("sticky")
        ? location.reload()
        : window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
    }

    // Navigation for both mobile and desktop
    if (e.target.closest(".main-nav-link")) {
      const id = e.target.closest(".main-nav-link").getAttribute("href");
      const coords = document.querySelector(id).getBoundingClientRect();
      window.scrollTo({
        top: coords.top + window.scrollY,
        behavior: "smooth",
      });
      headerEl.classList.remove("nav-open");
      document.body.classList.remove("noscrl");
      document.querySelector("html").classList.remove("noscrl");
      return;
    }

    // Guard clause
    if (!e.target.getAttribute("href")) return;

    // Other anchors on the page
    if (
      e.target.getAttribute("href").startsWith("#") &&
      e.target.getAttribute("href").length > 1
    ) {
      const id = e.target.getAttribute("href");
      const coords = document.querySelector(id).getBoundingClientRect();
      window.scrollTo({
        top: coords.top + window.scrollY - 50,
        behavior: "smooth",
      });
    }

    if (e.target.getAttribute("href") === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  // Sticky navigation
  const observer = new IntersectionObserver(
    function (entries) {
      const [entry] = entries;

      if (!entry.isIntersecting) {
        headerEl.classList.add("sticky");
        document.querySelector(".section-hero").style.marginTop = "9.6rem";
      }

      if (entry.isIntersecting) {
        headerEl.classList.remove("sticky");
        document.querySelector(".section-hero").style.marginTop = "";
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `-64px`,
    }
  );
  observer.observe(document.querySelector(".section-hero"));

  ///////////////////////////////////////////////////////////
  // Fixing flexbox gap property missing in some Safari versions
  function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
  }
  checkFlexGap();
})();
