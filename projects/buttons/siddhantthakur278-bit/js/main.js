/* ================= Ripple effect for buttons with ripple behavior ================= */
document.querySelectorAll(".btn").forEach(btn => {
  // Add ripple for elements that should feel tactile (we add for all to be consistent)
  btn.addEventListener("pointerdown", function (e) {
    const rect = this.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    const circle = document.createElement("span");
    circle.className = "ripple-effect";
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;

    // Remove any existing ripple quickly
    const existing = this.querySelector(".ripple-effect");
    if (existing) existing.remove();

    this.appendChild(circle);
    // cleanup after animation
    setTimeout(() => circle.remove(), 650);
  });
});

/* ================= Theme toggle (persisted) ================= */
const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;
const saved = localStorage.getItem("cd_theme");

if (saved === "light") {
  body.classList.add("light");
  themeSwitch.checked = true;
} else {
  body.classList.remove("light");
  themeSwitch.checked = false;
}

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    body.classList.add("light");
    localStorage.setItem("cd_theme", "light");
  } else {
    body.classList.remove("light");
    localStorage.setItem("cd_theme", "dark");
  }
});

/* ================= Random background gradient on load ================= */
const gradients = [
  "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
  "linear-gradient(135deg,#232526,#414345)",
  "linear-gradient(135deg,#141e30,#243b55)",
  "linear-gradient(135deg,#373b44,#4286f4)",
  "linear-gradient(135deg,#667db6,#0082c8,#667db6)",
  "linear-gradient(135deg,#16222a,#3a6073)",
  "linear-gradient(135deg,#0f2027,#2c5364,#6dd5ed)"
];
function setRandomBG(){
  // apply only when dark theme (to preserve light-mode background)
  if (!body.classList.contains("light")){
    const g = gradients[Math.floor(Math.random()*gradients.length)];
    body.style.background = g;
  } else {
    body.style.background = ""; // default light-mode CSS background
  }
}
setRandomBG();

/* ================= Entrance stagger animation (buttons/cards) ================= */
window.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((c, i) => {
    c.style.opacity = 0;
    c.style.transform = "translateY(18px)";
    setTimeout(() => {
      c.style.transition = "all 420ms cubic-bezier(.2,.9,.2,1)";
      c.style.opacity = 1;
      c.style.transform = "translateY(0)";
    }, i * 90);
  });
});

/* ================= Accessibility: keyboard focus styles ================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.documentElement.classList.add("show-focus");
  }
});
document.addEventListener("click", () => document.documentElement.classList.remove("show-focus"));
