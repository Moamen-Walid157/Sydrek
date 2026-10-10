/* Sydrek Brand Lab — interactions
   - Scroll-spy: highlights nav link + recolours nav accent per concept
   - Copy-to-clipboard for swatches and gradients
   - Reveal-on-scroll animations
*/

(() => {
  const ACCENTS = {
    intro: "#2563ff",
    quantum: "#2563ff",
    solar: "#ff5e1f",
    aurora: "#8b5cf6",
    monolith: "#d9ff3d",
    verdant: "#10b981",
  };

  const nav = document.querySelector(".nav");
  const navLinks = [...document.querySelectorAll(".nav-links a[data-target]")];
  const sections = [...document.querySelectorAll("[data-concept]")].filter((el) => el.tagName === "SECTION" || el.tagName === "HEADER");
  const toast = document.getElementById("toast");

  /* ---------------- Scroll spy ---------------- */
  const setActive = (id) => {
    document.body.dataset.concept = id;
    document.documentElement.style.setProperty("--nav-accent", ACCENTS[id] || ACCENTS.intro);
    navLinks.forEach((a) => a.classList.toggle("active", a.dataset.target === id));
    // Acid lime needs dark text on the CTA to stay legible
    const cta = nav.querySelector(".nav-cta");
    if (cta) cta.style.color = id === "monolith" ? "#000" : "#fff";
  };

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.dataset.concept || "intro");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------------- Copy to clipboard ---------------- */
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  };

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied ${label}`);
    } catch {
      // Fallback for non-secure contexts (file://)
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast(`Copied ${label}`);
      } catch {
        showToast("Copy not available in this browser");
      }
      ta.remove();
    }
  };

  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    const value = el.dataset.copy;
    const label = value.startsWith("#") || value.startsWith("rgba") ? value : "gradient CSS";
    el.title = `Click to copy ${label}`;
    const handler = () => copy(value, label);
    el.addEventListener("click", handler);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handler();
      }
    });
  });

  /* ---------------- Reveal on scroll ---------------- */
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          reveal.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
})();
