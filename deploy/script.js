const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#menu");
const shell = document.querySelector("#page-shell");
const HEADER_OFFSET = 84;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;

  const scroller = shell || document.scrollingElement || document.documentElement;
  if (scroller === shell) {
    const top =
      el.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      HEADER_OFFSET;
    scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }
  return true;
}

function handleNavClick(event) {
  const link = event.currentTarget;
  const href = link.getAttribute("href") || "";
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  if (!id) return;
  event.preventDefault();
  scrollToId(id);
  history.replaceState(null, "", href);
  if (nav && toggle) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", handleNavClick);
});

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

if (location.hash.length > 1) {
  const id = decodeURIComponent(location.hash.slice(1));
  requestAnimationFrame(() => scrollToId(id));
}

const revealEls = document.querySelectorAll(
  ".product-card, .step, .impacto-card, .sobre-grid, .equipe-box, .final-grid > *"
);

revealEls.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { root: shell || null, threshold: 0.15 }
);

revealEls.forEach((el) => io.observe(el));
