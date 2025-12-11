document.addEventListener('DOMContentLoaded', () => {

  /* =======================
     TYPEWRITER (Smoother)
  ======================= */
  const heroTitle = document.querySelector('.hero h1');

  if (heroTitle) {
    const text = heroTitle.innerText;
    heroTitle.innerText = "";

    let index = 0;
    const speed = 55;

    function type() {
      if (index < text.length) {
        heroTitle.textContent += text[index];
        index++;
        requestAnimationFrame(type);
      }
    }

    setTimeout(type, 300);
  }

  /* =======================
     INTERSECTION OBSERVER
  ======================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  const elementsToReveal = document.querySelectorAll('.card, .container h2, header p, .hero h1');
  elementsToReveal.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  /* =======================
     BETTER TILT HOVER
  ======================= */
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width/2);
      const y = e.clientY - (rect.top + rect.height/2);

      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
      card.style.transition = "transform 0.4s ease";
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = "none";
    });
  });

});
