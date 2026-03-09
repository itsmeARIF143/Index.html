const byId = (id) => document.getElementById(id);

function setupMenu() {
  const menuBtn = byId("menuBtn");
  const mainNav = byId("mainNav");
  if (!menuBtn || !mainNav) return;
  menuBtn.addEventListener("click", () => mainNav.classList.toggle("open"));
}

function setupTypingAnimation() {
  const typingText = byId("typingText");
  if (!typingText) return;

  const roles = [
    "Frontend Developer",
    "Graphics Design",
    "Script Writer",
    "Content Writer",
    "Data Entry"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const current = roles[roleIndex];
    typingText.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex += 1;
    } else if (deleting && charIndex > 0) {
      charIndex -= 1;
    } else if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1000);
      return;
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, deleting ? 55 : 95);
  };

  type();
}

function setupSkillBars() {
  const bars = document.querySelectorAll(".progress span");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level") || "0";
          entry.target.style.width = `${level}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

function setupContactForm() {
  const contactForm = byId("contactForm");
  const formMsg = byId("formMsg");
  if (!contactForm || !formMsg) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMsg.textContent = "Thank you! Your message has been sent successfully.";
    formMsg.style.color = "#2cd4c4";
    contactForm.reset();
  });
}

function setupAos() {
  if (typeof AOS === "undefined") return;
  AOS.init({
    duration: 750,
    once: true,
    easing: "ease-out-cubic"
  });
}

byId("year") && (byId("year").textContent = new Date().getFullYear());
setupMenu();
setupTypingAnimation();
setupSkillBars();
setupContactForm();
setupAos();
