const header = document.getElementById("siteHeader");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
});

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) {
      nav.classList.remove("open");
    }
  });
}

const backTop = document.getElementById("backTop") || document.querySelector(".back-top");
if (backTop) {
  const darkSections = document.querySelectorAll(
    ".hero, .page-hero, .cta-band, .platform-band, .section.outcomes, .section.product-grid"
  );

  function updateBackTop() {
    const visible = window.scrollY > 600;
    backTop.classList.toggle("visible", visible);
    if (!visible) return;

    const btnY = window.scrollY + window.innerHeight - 56;
    let overDark = false;
    darkSections.forEach((sec) => {
      const top = window.scrollY + sec.getBoundingClientRect().top;
      const bottom = top + sec.offsetHeight;
      if (btnY >= top && btnY <= bottom) overDark = true;
    });
    backTop.classList.toggle("on-light", !overDark);
  }

  window.addEventListener("scroll", updateBackTop, { passive: true });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document
  .querySelectorAll(
    ".section, .page-hero, .cta-band, .outcome-strip, .role-section, " +
    ".product-card, .platform-preview, .insight-card, .glass-card, " +
    ".contact-form, .contact-card, .timeline-step, .industry-card, " +
    ".role-tile, .mini-steps div"
  )
  .forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
