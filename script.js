const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const contactForm = document.querySelector("[data-contact-form]");
const formSuccess = document.querySelector("[data-form-success]");
const revealItems = document.querySelectorAll(".reveal");

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
  link.addEventListener("click", () => {
    closeMenu();
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();
  formSuccess?.classList.add("is-visible");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
