document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------
     TYPEWRITER (preserve gradient + caret)
     - Creates <span> per char so gradient stays
     - Uses requestAnimationFrame for smoothness
  ------------------------*/
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const fullText = heroTitle.innerText.trim();
    heroTitle.innerText = '';               // clear original
    heroTitle.classList.add('caret');       // enable CSS caret

    // Build empty spans for each char for predictable layout
    const chars = Array.from(fullText);
    chars.forEach(ch => {
      const sp = document.createElement('span');
      sp.textContent = ch;
      sp.style.opacity = '0';
      sp.style.transform = 'translateY(6px)';
      sp.style.display = 'inline-block';
      heroTitle.appendChild(sp);
    });

    const spans = heroTitle.querySelectorAll('span');
    let idx = 0;
    const perCharDelay = 36; // milliseconds

    function step(timestamp) {
      // reveal next char
      if (idx < spans.length) {
        const s = spans[idx];
        s.style.transition = 'opacity 220ms cubic-bezier(.2,.9,.2,1), transform 220ms cubic-bezier(.2,.9,.2,1)';
        s.style.opacity = '1';
        s.style.transform = 'translateY(0)';
        idx++;
        // schedule next char
        setTimeout(() => requestAnimationFrame(step), perCharDelay);
      } else {
        // done typing -> remove caret after short delay
        setTimeout(() => heroTitle.classList.remove('caret'), 700);
      }
    }

    // slight initial delay then start
    setTimeout(() => requestAnimationFrame(step), 320);
  }

  /* -----------------------
     INTERSECTION OBSERVER
     - smoother reveal, small stagger
  ------------------------*/
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // add visible with small stagger if many children
        const el = entry.target;
        const delayBase = parseFloat(el.dataset.revealDelay) || 0;
        setTimeout(() => el.classList.add('visible'), delayBase);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -40px 0px'
  });

  // apply small data-delay for cards to create gentle stagger
  const revealEls = document.querySelectorAll('.card, .container h2, header p, .hero h1');
  revealEls.forEach((el, i) => {
    // stagger only for cards to avoid excessive delays for headings
    if (el.classList.contains('card')) el.dataset.revealDelay = (i % 6) * 80; // up to ~480ms stagger
    el.classList.add('hidden');
    observer.observe(el);
  });


  /* -----------------------
     TILT / HOVER (gentle, performant)
     - disabled on small screens
     - uses small rotation angles + GPU-friendly transforms
  ------------------------*/
  const cards = document.querySelectorAll('.card');
  const enableTilt = window.innerWidth > 768;

  if (enableTilt) {
    cards.forEach(card => {
      // small max angles
      const maxRotate = 10;   // degrees
      const maxScale = 1.02;

      let lastMoveTime = 0;
      let rafId = null;

      function onMove(e) {
        const now = performance.now();
        // throttle to ~60fps using rAF
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width;  // 0..1
          const relY = (e.clientY - rect.top) / rect.height;  // 0..1
          const rotateY = (relX - 0.5) * (maxRotate * 2);      // -max..+max
          const rotateX = -(relY - 0.5) * (maxRotate * 2);     // -max..+max

          // apply transform (smooth, small)
          card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${maxScale})`;
        });
        lastMoveTime = now;
      }

      function onLeave() {
        // restore gently
        card.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      }

      function onEnter() {
        card.style.transition = 'transform 200ms linear';
      }

      card.addEventListener('mousemove', onMove, { passive: true });
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('mouseenter', onEnter);
    });
  } else {
    // ensure no inline transform left on mobile
    cards.forEach(c => { c.style.transform = ''; c.style.transition = ''; });
  }

});
