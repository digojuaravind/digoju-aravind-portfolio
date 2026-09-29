/* =========================================================
   DIGOJU ARAVIND PORTFOLIO
   Main JavaScript
   Works with the updated style.css
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.querySelector(".theme-toggle");
  const yearElement = document.getElementById("year");

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  const closeMenu = () => {
    if (!navLinks) return;

    navLinks.classList.remove("open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  };

  if (menuToggle && navLinks) {
    menuToggle.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("open") ? "true" : "false"
    );

    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });

    /* Close mobile menu when a navigation link is selected */
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    /* Close menu when clicking outside it */
    document.addEventListener("click", (event) => {
      const target = event.target;

      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(target) &&
        !menuToggle.contains(target)
      ) {
        closeMenu();
      }
    });

    /* Close menu with Escape */
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  /* =========================================================
     THEME TOGGLE
     ========================================================= */

  const applyTheme = (theme) => {
    const isLight = theme === "light";

    document.body.classList.toggle("light", isLight);

    if (themeToggle) {
      themeToggle.textContent = isLight ? "☀" : "☾";
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
      themeToggle.setAttribute(
        "title",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  };

  if (themeToggle) {
    const savedTheme = localStorage.getItem("aravind-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      applyTheme(savedTheme);
    } else {
      /* Respect the visitor's operating-system preference */
      const prefersLight = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;

      applyTheme(prefersLight ? "light" : "dark");
    }

    themeToggle.addEventListener("click", (event) => {
      event.preventDefault();

      const isLight = document.body.classList.contains("light");
      const nextTheme = isLight ? "dark" : "light";

      applyTheme(nextTheme);
      localStorage.setItem("aravind-theme", nextTheme);
    });
  }

  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    /* Fallback for older browsers */
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =========================================================
     CONTACT BUTTONS
     IMPORTANT:
     Do NOT use preventDefault() on mailto: or tel: links.
     The browser must handle these links normally.
     ========================================================= */

  const contactLinks = document.querySelectorAll(
    '.contact-actions a[href^="mailto:"], .contact-actions a[href^="tel:"]'
  );

  contactLinks.forEach((link) => {
    link.setAttribute("role", "button");

    link.addEventListener("click", () => {
      /*
       * Intentionally no event.preventDefault().
       *
       * Email:
       * mailto:digojuaravind369@gmail.com
       *
       * Phone:
       * tel:+918074140293
       *
       * These must be allowed to reach the browser/OS.
       */
    });
  });

  /* =========================================================
     INTERNAL NAVIGATION
     Smoothly scroll to sections while respecting
     the fixed 74px navbar.
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length <= 1
      ) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar
        ? navbar.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        10;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth"
      });

      closeMenu();

      /*
       * Keep the URL hash updated without jumping.
       */
      if (history.pushState) {
        history.pushState(null, "", targetId);
      }
    });
  });

  /* =========================================================
     ACCESSIBILITY
     ========================================================= */

  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-controls", "primary-navigation");
  }

  /* =========================================================
     CONSOLE CHECK
     ========================================================= */

  console.log("Digoju Aravind Portfolio loaded successfully.");
});
