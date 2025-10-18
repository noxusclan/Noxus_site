// script.js
// Noxus multi-carousel controller
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.nxs-carousel');

  carousels.forEach((carousel, idx) => {
    const track = carousel.querySelector('.nxs-track');
    const slides = Array.from(track.children);
    const prev = carousel.querySelector('.nxs-prev');
    const next = carousel.querySelector('.nxs-next');
    const dotsContainer = carousel.querySelector('.nxs-dots');
    const autoplayAttr = parseInt(carousel.dataset.autoplay, 10) || 4000;

    let current = 0;
    let intervalId = null;
    const total = slides.length;

    // build dots
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'nxs-dot';
      d.setAttribute('aria-label', `Vai alla slide ${i+1}`);
      d.dataset.index = i;
      d.type = 'button';
      dotsContainer.appendChild(d);
    }
    const dots = Array.from(dotsContainer.children);

    function goTo(index) {
      current = (index + total) % total;
      const offset = -current * 100;
      track.style.transform = `translateX(${offset}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    // attach events
    next.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
    prev.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const i = Number(e.currentTarget.dataset.index);
        goTo(i);
        restartAutoplay();
      });
    });

    // autoplay
    function startAutoplay() {
      if (intervalId) return;
      intervalId = setInterval(() => nextSlide(), autoplayAttr);
    }
    function stopAutoplay() {
      if (!intervalId) return;
      clearInterval(intervalId);
      intervalId = null;
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // pause on hover/focus
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // keyboard navigation (left/right)
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { nextSlide(); restartAutoplay(); }
      if (e.key === 'ArrowLeft') { prevSlide(); restartAutoplay(); }
    });

    // make carousel focusable
    carousel.tabIndex = 0;

    // init
    goTo(0);
    startAutoplay();
  });
});

// ============================
// MENU HAMBURGER RESPONSIVE
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const icon = hamburger.querySelector('i');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
});

