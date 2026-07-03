const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const contactForm = document.querySelector("[data-contact-form]");
const formSuccess = document.querySelector("[data-form-success]");
const navLinks = document.querySelectorAll("[data-nav] a");
const revealItems = document.querySelectorAll(".reveal");

const WHATSAPP_NUMBER = "38349600736";

/* ---------- Tema (dark / light) ---------- */

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    /* localStorage e bllokuar — tema mbetet vetëm për këtë vizitë */
  }
};

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ---------- Header & menuja mobile ---------- */

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuToggle?.classList.remove("is-open");
  mobileMenu?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  mobileMenu?.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ---------- Scrollspy për navigimin ---------- */

if ("IntersectionObserver" in window && navLinks.length) {
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => spy.observe(section));
}

/* ---------- Formulari → mesazh i gatshëm në WhatsApp ---------- */

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const message = [
    "Përshëndetje, Trimi Dekor!",
    `Emri: ${data.get("name")}`,
    `Telefoni: ${data.get("phone")}`,
    `Shërbimi: ${data.get("service")}`,
    "",
    `${data.get("message")}`,
  ].join("\n");

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener"
  );

  formSuccess?.classList.add("is-visible");
  contactForm.reset();
});

/* ---------- Animacionet e shfaqjes ---------- */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
