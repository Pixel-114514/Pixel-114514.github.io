/* ── Dark Mode ──────────────────────────────────────────── */
(function () {
  const root = document.documentElement;
  const KEY = 'theme';

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0d0d0d' : '#ffffff');
  }

  const saved = localStorage.getItem(KEY);
  if (saved === 'dark' || saved === 'light') apply(saved);

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#darkmode');
    if (!btn) return;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem(KEY, next);
    apply(next);
  });
})();

/* ── Navbar Scroll ──────────────────────────────────────── */
(function () {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        nav.classList.toggle('scrolled', window.scrollY > 30);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ── Mobile Menu ────────────────────────────────────────── */
(function () {
  const btn = document.querySelector('.mobile-menu-btn');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function () {
    links.classList.toggle('open');
    const icon = btn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      const icon = btn.querySelector('i');
      if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-xmark'); }
    }
  });
})();

/* ── Scroll to Top ──────────────────────────────────────── */
(function () {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Quiz Verification (about page only) ────────────────── */
(function () {
  var mask = document.getElementById('verify-overlay');
  if (!mask) return;

  var ANSWER_TEACHER = '黄慧红';
  var ANSWER_NAME = '董盛伟';
  var KEY = 'resume-verified';

  var submit = document.getElementById('verify-submit');
  var error = document.getElementById('verify-error');
  var inputTeacher = document.getElementById('verify-teacher');
  var inputName = document.getElementById('verify-name');

  function normalize(v) { return (v || '').replace(/\s+/g, '').trim(); }
  function unlock() {
    document.body.classList.remove('resume-locked');
    mask.remove();
    sessionStorage.setItem(KEY, '1');
  }

  if (sessionStorage.getItem(KEY) === '1') {
    mask.remove();
  } else {
    document.body.classList.add('resume-locked');
  }

  if (submit) {
    submit.addEventListener('click', function () {
      var ok = normalize(inputTeacher.value) === ANSWER_TEACHER ||
               normalize(inputName.value) === ANSWER_NAME;
      if (ok) { unlock(); return; }
      error.textContent = '答案不正确，请重试。';
    });
  }

  [inputTeacher, inputName].forEach(function (el) {
    if (el) el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && submit) submit.click();
    });
  });
})();

/* ── Typed.js (lazy loaded) ─────────────────────────────── */
(function () {
  var el = document.getElementById('typed-text');
  if (!el) return;

  var strings = JSON.parse(el.getAttribute('data-strings') || '[]');
  if (!strings.length) return;

  function init() {
    if (typeof Typed === 'function') {
      new Typed('#typed-text', {
        strings: strings,
        typeSpeed: 150,
        backSpeed: 50,
        startDelay: 300,
        loop: true
      });
    } else {
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.min.js';
      s.onload = function () {
        new Typed('#typed-text', {
          strings: strings,
          typeSpeed: 150,
          backSpeed: 50,
          startDelay: 300,
          loop: true
        });
      };
      document.head.appendChild(s);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ── Busuanzi Counter (lazy loaded) ─────────────────────── */
(function () {
  var el = document.getElementById('busuanzi');
  if (!el) return;
  var s = document.createElement('script');
  s.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
  s.async = true;
  document.head.appendChild(s);
})();
