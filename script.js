
// ── DOT CANVAS ANIMATION ──
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');

let dots = [];
const DOT_COUNT = 60;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initDots() {
  dots = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? '#7C3AED' : '#22D3EE',
    });
  }
}

function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - dist / 140)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  // Draw dots
  for (const d of dots) {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = d.color + '99';
    ctx.fill();

    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
  }

  requestAnimationFrame(drawDots);
}

resize();
initDots();
drawDots();
window.addEventListener('resize', () => { resize(); initDots(); });

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ── NAV MOBILE ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ── NAV SCROLL STYLE ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.padding = '14px 5%';
  } else {
    nav.style.padding = '20px 5%';
  }
});

// ── SMOOTH HOVER on STAT NUMS ──
const statNums = document.querySelectorAll('.stat-num');
statNums.forEach(el => {
  el.parentElement.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.05)';
    el.style.transition = 'transform 0.3s';
  });
  el.parentElement.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
  });
});
