const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");

const closeMenu = () => {
  if (!navLinks || !menuToggle) return;
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = navLinks?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (!navLinks || !menuToggle) return;
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) closeMenu();
});

const savedTheme = localStorage.getItem("aravind-theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  if (themeToggle) themeToggle.textContent = "☀";
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  localStorage.setItem("aravind-theme", light ? "light" : "dark");
  themeToggle.textContent = light ? "☀" : "☾";
});

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
