document.addEventListener('DOMContentLoaded', () => {

  // TYPEWRITER EFFECT
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const textToType = heroTitle.innerText;
    heroTitle.innerText = ''; 
    
    let i = 0;
    const speed = 50;
    function typeWriter() {
      if (i < textToType.length) {
        heroTitle.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // ANIMATION OBSERVER
  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Tambahkan elemen yang ingin dianimasikan
  const hiddenElements = document.querySelectorAll('.card, .container h2, header p, .hero h1');

  hiddenElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // TILT EFFECT
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

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
});
