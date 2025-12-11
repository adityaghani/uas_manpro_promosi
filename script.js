document.addEventListener('DOMContentLoaded', () => {

  // TYPEWRITER WITH GRADIENT PRESERVED
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const fullText = heroTitle.innerText.trim();
    heroTitle.innerHTML = "";
    let i = 0;

    function typeWrite() {
      if (i < fullText.length) {
        const span = document.createElement("span");
        span.textContent = fullText.charAt(i);
        heroTitle.appendChild(span);
        i++;
        setTimeout(typeWrite, 45);
      }
    }
    setTimeout(typeWrite, 300);
  }

  // SCROLL REVEAL
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  });

  const elements = document.querySelectorAll('.card, .container h2, header p, .hero h1');

  elements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // 3D TILT (DISABLED ON MOBILE)
  const cards = document.querySelectorAll('.card');
  if (window.innerWidth > 768) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 14;
        const rotateY = (x / rect.width) * 14;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
        card.style.transition = 'transform 0.45s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

});
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
