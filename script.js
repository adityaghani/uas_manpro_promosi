document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     TYPEWRITER LOOPING EFFECT — NOW WITH RANDOM TYPING SPEED
  ============================================================ */
  const heroTitle = document.querySelector('.hero h1');

  if (heroTitle) {
    const fullText = heroTitle.innerText.replace(/\s+/g, ' '); // Fix space collapsing
    heroTitle.innerText = '';

    const minType = 40;   // fastest type
    const maxType = 120;  // slowest type
    const minDelete = 20;
    const maxDelete = 80;

    const delayAfterType = 1500;
    const delayAfterDelete = 600;

    let index = 0;
    let isDeleting = false;

    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function typeLoop() {
      if (isDeleting) {
        heroTitle.innerText = fullText.substring(0, index--);

        if (index < 0) {
          isDeleting = false;
          setTimeout(typeLoop, delayAfterDelete);
          return;
        }
        setTimeout(typeLoop, random(minDelete, maxDelete));

      } else {
        heroTitle.innerText = fullText.substring(0, index++);

        if (index > fullText.length) {
          isDeleting = true;
          setTimeout(typeLoop, delayAfterType);
          return;
        }
        setTimeout(typeLoop, random(minType, maxType));
      }
    }

    setTimeout(typeLoop, 500);
  }



  /* ============================================================
     FADE-IN + SLIDE-IN ANIMATION OBSERVER
  ============================================================ */
  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.card, .container h2, header p, .hero h1');

  hiddenElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });



  /* ============================================================
     TILT EFFECT FOR CARDS
  ============================================================ */
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / rect.height) * -20;
      const rotateY = (mouseX / rect.width) * 20;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.05)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

});
