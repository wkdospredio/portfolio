/* =========================================================
   PORTFÓLIO — WEVERton KAUÃ
   JavaScript para menu, saudação, tema e ano automático.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const themeToggle = document.querySelector(".theme-toggle");
  const greeting = document.querySelector("#saudacao");
  const yearElement = document.querySelector("#ano-atual");

  // 1. Saudação dinâmica conforme o horário local do visitante.
  function updateGreeting() {
    const hour = new Date().getHours();
    let message = "Olá, seja bem-vindo(a)!";

    if (hour >= 5 && hour < 12) {
      message = "Bom dia! Que bom ter você aqui.";
    } else if (hour >= 12 && hour < 18) {
      message = "Boa tarde! Que bom ter você aqui.";
    } else {
      message = "Boa noite! Que bom ter você aqui.";
    }

    if (greeting) {
      greeting.textContent = message;
    }
  }

  updateGreeting();

  // 2. Ano do rodapé atualizado automaticamente.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. Menu hambúrguer para telas menores.
  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
    mainNav.classList.remove("is-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Abrir menu de navegação" : "Fechar menu de navegação"
      );
      mainNav.classList.toggle("is-open", !isOpen);
    });

    // Fecha o menu depois que uma seção é selecionada.
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fecha o menu com Escape, facilitando a navegação pelo teclado.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Se a tela aumentar, evita deixar o menu móvel aberto.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }

  // 4. Alternância entre tema escuro e tema claro.
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  function updateThemeButton() {
    if (!themeToggle) return;
    const isLight = document.body.classList.contains("light-theme");
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Ativar tema escuro" : "Ativar tema claro"
    );
    themeToggle.setAttribute(
      "title",
      isLight ? "Ativar tema escuro" : "Ativar tema claro"
    );
  }

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-theme");
      localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
      updateThemeButton();
    });
  }
});
