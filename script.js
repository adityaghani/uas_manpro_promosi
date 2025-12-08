document.addEventListener('DOMContentLoaded', () => {
  

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


  const observerOptions = {
    threshold: 0.2 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.card, .container h2, header p');
  hiddenElements.forEach(el => {
    el.classList.add('hidden'); 
    observer.observe(el);
  });

  
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
 
      const centerX = cardRect.left + cardWidth / 2;
      const centerY = cardRect.top + cardHeight / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;


      const rotateX = (mouseY / cardHeight) * -20; 
      const rotateY = (mouseX / cardWidth) * 20;

      card.style.transform = perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = perspective(1000px) rotateX(0) rotateY(0) scale(1);
      card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
});
