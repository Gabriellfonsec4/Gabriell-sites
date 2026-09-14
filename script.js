const CONFIG = {
  whatsapp: "5521967565629",
  businessName: "Gabriell Fonseca",
};

const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const backToTop = document.querySelector(".back-to-top");
const cursorGlow = document.querySelector(".cursor-glow");

function closeMenu() {
  navigation.classList.remove("open");
  menuButton.classList.remove("active");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");

  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const opened = navigation.classList.toggle("open");

  menuButton.classList.toggle("active", opened);
  document.body.classList.toggle("menu-open", opened);

  menuButton.setAttribute("aria-expanded", String(opened));

  menuButton.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".navigation a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);

  backToTop.classList.toggle("visible", window.scrollY > 650);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

if (window.matchMedia("(pointer: fine)").matches && cursorGlow) {
  let mouseX = -500;
  let mouseY = -500;
  let animationScheduled = false;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (animationScheduled) {
      return;
    }

    animationScheduled = true;

    requestAnimationFrame(() => {
      cursorGlow.style.transform = `translate3d(${mouseX - 190}px, ${mouseY - 190}px, 0)`;

      animationScheduled = false;
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll(".accordion__item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion__item");

    const content = item.querySelector(".accordion__content");

    const wasOpen = item.classList.contains("open");

    document.querySelectorAll(".accordion__item").forEach((otherItem) => {
      otherItem.classList.remove("open");

      otherItem.querySelector("button").setAttribute("aria-expanded", "false");

      otherItem.querySelector(".accordion__content").style.maxHeight = null;
    });

    if (!wasOpen) {
      item.classList.add("open");

      button.setAttribute("aria-expanded", "true");

      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message =
    `Olá, ${CONFIG.businessName}! ` +
    `Gostaria de conversar sobre a criação de um site.`;

  link.href =
    `https://wa.me/${CONFIG.whatsapp}?text=` + encodeURIComponent(message);

  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();

  const business = document.querySelector("#business").value.trim();

  const projectType = document.querySelector("#project-type").value;

  const description = document.querySelector("#message").value.trim();

  const message =
    `Olá, Gabriell! Meu nome é ${name}.\n\n` +
    `🏢 Negócio: ${business}\n` +
    `💻 Projeto: ${projectType}\n\n` +
    `📝 O que preciso:\n${description}\n\n` +
    `Gostaria de receber um orçamento.`;

  const whatsappURL =
    `https://wa.me/${CONFIG.whatsapp}?text=` + encodeURIComponent(message);

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
