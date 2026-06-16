/**
 * Hiệu ứng scroll reveal & parallax
 */

export function initScrollReveal() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          entry.target.classList.remove("reveal-hidden");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal-hidden");
    observer.observe(el);
  });
}

export function initParallax() {
  const parallaxItems = document.querySelectorAll("[data-parallax]");

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;

      parallaxItems.forEach((item) => {
        const speed = parseFloat(item.dataset.parallax) || 0.3;
        item.style.transform = `translateY(${scrollY * speed}px)`;
      });
    },
    { passive: true }
  );
}

export function initCounterAnimation() {
  const counters = document.querySelectorAll("[data-counter]");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
