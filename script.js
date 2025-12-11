document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     TYPEWRITER LOOPING EFFECT (FIXED SPACES + ANIMATION LOOP)
  ============================================================ */
  const heroTitle = document.querySelector('.hero h1');

  if (heroTitle) {
    const fullText = heroTitle.innerText.replace(/\s+/g, ' '); // Fix space collapsing
    heroTitle.innerText = '';

    const typeSpeed = 50;
    const deleteSpeed = 30;
    const delayAfterType = 1500;
    const delayAfterDelete = 600;

    let index = 0;
    let isDeleting = false;

    function typeLoop() {
      if (isDeleting) {
        heroTitle.innerText = fullText.substring(0, index--);

        if (index < 0) {
          isDeleting = false;
          setTimeout(typeLoop, delayAfterDelete);
          return;
        }
        setTimeout(typeLoop, deleteSpeed);

      } else {
        heroTitle.innerText = fullText.substring(0, index++);

        if (index > fullText.length) {
          isDeleting = true;
          setTimeout(typeLoop, delayAfterType);
          return;
        }
        setTimeout(typeLoop, typeSpeed);
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
