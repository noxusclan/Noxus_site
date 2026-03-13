document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MENU MOBILE (Gestione Hamburger)
  // ==========================================
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const toggleIcon = mobileToggle.querySelector("i");

  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
      toggleIcon.classList.remove("fa-bars");
      toggleIcon.classList.add("fa-xmark");
    } else {
      toggleIcon.classList.remove("fa-xmark");
      toggleIcon.classList.add("fa-bars");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      toggleIcon.classList.remove("fa-xmark");
      toggleIcon.classList.add("fa-bars");
    });
  });

  // ==========================================
  // 2. CAROSELLI AUTO-SCORREVOLI (Solo Roster & Staff)
  // ==========================================
  const carousels = document.querySelectorAll(
    ".staff-carousel, .roster-carousel",
  );

  carousels.forEach((carousel) => {
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth - 10
        ) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const card = carousel.querySelector(".staff-card, .player-card");
          const scrollAmount = card ? card.offsetWidth + 30 : 300;
          carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 3500);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    startAutoScroll();

    carousel.addEventListener("mouseenter", stopAutoScroll);
    carousel.addEventListener("mouseleave", startAutoScroll);

    carousel.addEventListener("touchstart", stopAutoScroll, { passive: true });
    carousel.addEventListener("touchend", startAutoScroll);
  });

  // ==========================================
  // 3. FISARMONICA CREATOR (Touch per Mobile)
  // ==========================================
  const accItems = document.querySelectorAll(".acc-item");

  accItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Rimuovi la classe active da tutti gli altri
      accItems.forEach((i) => i.classList.remove("active"));
      // Aggiungi la classe active solo a quello cliccato
      item.classList.add("active");
    });
  });
});
