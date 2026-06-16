/**
 * Logic chính: navbar, mobile menu, giỏ hàng demo
 */

import {
  initScrollReveal,
  initParallax,
  initCounterAnimation,
  initSmoothScroll,
} from "./animations.js";

let cartCount = 0;

function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");
  const closeBtn = document.getElementById("menu-close");
  const links = mobileMenu?.querySelectorAll("a");

  const openMenu = () => {
    mobileMenu?.classList.add("mobile-menu-open");
    overlay?.classList.add("overlay-visible");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileMenu?.classList.remove("mobile-menu-open");
    overlay?.classList.remove("overlay-visible");
    document.body.style.overflow = "";
  };

  toggle?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);
  links?.forEach((link) => link.addEventListener("click", closeMenu));
}

function initCart() {
  const cartBadge = document.getElementById("cart-count");
  const addButtons = document.querySelectorAll("[data-add-cart]");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      cartCount++;
      if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.classList.remove("hidden");
        cartBadge.classList.add("cart-badge-pop");
        setTimeout(() => cartBadge.classList.remove("cart-badge-pop"), 400);
      }

      showToast("Đã thêm vào giỏ hàng!");
    });
  });
}

function showToast(message) {
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className =
    "toast-notification fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-burger-dark px-6 py-4 text-white shadow-2xl translate-y-20 opacity-0 transition-all duration-500";
  toast.innerHTML = `
    <svg class="h-5 w-5 text-burger-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <span class="font-medium">${message}</span>
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-20", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

function initHeroTyping() {
  const el = document.getElementById("hero-tagline");
  if (!el) return;

  const words = ["NGON", "TƯƠI", "HOT", "ĐẬM VỊ"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const current = words[wordIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 80 : 120;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initCart();
  initHeroTyping();
  initScrollReveal();
  initParallax();
  initCounterAnimation();
  initSmoothScroll();
});
