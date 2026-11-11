// One place for "scroll to a section". Uses Lenis on desktop, native smooth scroll on touch.
export const scrollToId = (id) =>
  window.__lenis
    ? window.__lenis.scrollTo(`#${id}`)
    : document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const scrollToTop = () =>
  window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });

// True only for a real mouse/trackpad. Touch phones and tablets get the lighter UI.
export const canHover =
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
