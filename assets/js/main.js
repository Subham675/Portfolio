(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Theme persistence + View Transitions circular wipe
     ------------------------------------------------------------------------ */
  const THEME_KEY = 'subham-portfolio-theme';
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const sunIcon = document.querySelector('[data-icon-sun]');
  const moonIcon = document.querySelector('[data-icon-moon]');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#0B0B0F' : '#F3F3EF');
    }
    if (themeBtn) {
      const nextLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      const cursorLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';
      themeBtn.setAttribute('aria-label', nextLabel);
      themeBtn.setAttribute('data-cursor', cursorLabel);
    }
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
    }
  };

  applyTheme(getPreferredTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';

      if (!document.startViewTransition || reducedMotion) {
        applyTheme(next);
        return;
      }

      const rect = themeBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        applyTheme(next);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 480,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Mobile Menu Toggle
     ------------------------------------------------------------------------ */
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');

  const setMenuOpen = (open) => {
    if (!menuBtn || !mobileMenu) return;
    mobileMenu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenuOpen(mobileMenu.hidden);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.hidden && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hidden) {
        setMenuOpen(false);
        menuBtn.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. Live Cooch Behar (India / IST UTC+5:30) Clock
     ------------------------------------------------------------------------ */
  const timeEl = document.querySelector('[data-local-time]');
  const statusEl = document.querySelector('[data-local-status]');

  const updateLocalClock = () => {
    if (!timeEl) return;
    const now = new Date();
    const indiaFmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const hourFmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      hour12: false,
    });

    const formatted = indiaFmt.format(now);
    const hour24 = parseInt(hourFmt.format(now), 10);
    const isNight = hour24 >= 23 || hour24 < 7;

    timeEl.textContent = `India ${formatted}`;
    if (statusEl) {
      statusEl.textContent = isNight ? 'back in the morning' : 'available today';
    }
  };

  updateLocalClock();
  setInterval(updateLocalClock, 30000);

  /* ------------------------------------------------------------------------
     4. Split-word Headings + Scroll Reveals + Stat Counters
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-split]').forEach((el) => {
    let idx = 0;
    const nodes = Array.from(el.childNodes);
    const rebuilt = document.createDocumentFragment();

    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            rebuilt.appendChild(document.createTextNode(part));
          } else {
            const outer = document.createElement('span');
            outer.className = 'w';
            const inner = document.createElement('span');
            inner.style.setProperty('--wi', String(idx++));
            inner.textContent = part;
            outer.appendChild(inner);
            rebuilt.appendChild(outer);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const clone = node.cloneNode(false);
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            clone.appendChild(document.createTextNode(part));
          } else {
            const outer = document.createElement('span');
            outer.className = 'w';
            const inner = document.createElement('span');
            inner.style.setProperty('--wi', String(idx++));
            inner.textContent = part;
            outer.appendChild(inner);
            clone.appendChild(outer);
          }
        });
        rebuilt.appendChild(clone);
      }
    });

    el.innerHTML = '';
    el.appendChild(rebuilt);
  });

  const animateCount = (el) => {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const target = Number(el.dataset.count || 0);
    const pad = Number(el.dataset.pad || 0);
    const suffix = el.dataset.suffix || '';

    if (reducedMotion) {
      const val = pad ? String(target).padStart(pad, '0') : String(target);
      el.textContent = `${val}${suffix}`;
      return;
    }

    const duration = 900;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const current = Math.round(eased * target);
      const formatted = pad ? String(current).padStart(pad, '0') : String(current);
      el.textContent = `${formatted}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (reducedMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal], [data-split]').forEach((el) => {
      el.classList.add('is-visible');
    });
    document.querySelectorAll('[data-count]').forEach(animateCount);
    document.querySelectorAll('[data-skyline]').forEach((el) => el.classList.add('is-live'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          if (entry.target.hasAttribute('data-count')) {
            animateCount(entry.target);
          }
          entry.target.querySelectorAll?.('[data-count]').forEach(animateCount);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('[data-reveal], [data-split], [data-count]').forEach((el) => {
      revealObserver.observe(el);
    });

    const skylineEl = document.querySelector('[data-skyline]');
    if (skylineEl) {
      const skyObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            skylineEl.classList.toggle('is-live', entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      skyObs.observe(skylineEl);
    }
  }

  /* ------------------------------------------------------------------------
     5. Sticky Stacking Project Cards (--p scroll progress)
     ------------------------------------------------------------------------ */
  const stackCards = Array.from(document.querySelectorAll('.stack-card'));

  const updateStackCards = () => {
    if (reducedMotion || window.innerWidth < 768 || stackCards.length === 0) {
      stackCards.forEach((card) => card.style.setProperty('--p', '0'));
      return;
    }

    for (let i = 0; i < stackCards.length - 1; i++) {
      const card = stackCards[i];
      const next = stackCards[i + 1];
      const cardRect = card.getBoundingClientRect();
      const nextRect = next.getBoundingClientRect();
      const distance = cardRect.height || 400;
      const overlap = Math.max(0, Math.min(1, (cardRect.bottom - nextRect.top) / (distance * 0.85)));
      card.style.setProperty('--p', overlap.toFixed(3));
    }
    stackCards[stackCards.length - 1]?.style.setProperty('--p', '0');
  };

  let stackRaf = 0;
  const scheduleStackUpdate = () => {
    if (stackRaf) return;
    stackRaf = requestAnimationFrame(() => {
      stackRaf = 0;
      updateStackCards();
    });
  };

  window.addEventListener('scroll', scheduleStackUpdate, { passive: true });
  window.addEventListener('resize', scheduleStackUpdate, { passive: true });
  updateStackCards();

  /* ------------------------------------------------------------------------
     6. Spotlight Hover Glow & Magnetic Buttons & Custom Cursor Pill
     ------------------------------------------------------------------------ */
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (supportsFinePointer && !reducedMotion) {
    document.querySelectorAll('.spotlight').forEach((tile) => {
      tile.addEventListener('pointermove', (e) => {
        const rect = tile.getBoundingClientRect();
        tile.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        tile.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.16;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
        btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });

    const cursorEl = document.querySelector('.cursor');
    if (cursorEl) {
      let cx = -999;
      let cy = -999;
      let tx = -999;
      let ty = -999;
      let active = false;

      const tick = () => {
        cx += (tx - cx) * 0.28;
        cy += (ty - cy) * 0.28;
        const maxLeft = Math.max(8, window.innerWidth - cursorEl.offsetWidth - 12);
        const maxTop = Math.max(8, window.innerHeight - cursorEl.offsetHeight - 12);
        const left = Math.min(cx + 14, maxLeft);
        const top = Math.min(cy + 14, maxTop);
        cursorEl.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        if (active) requestAnimationFrame(tick);
      };

      document.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || window.innerWidth < 768) {
          cursorEl.classList.remove('is-visible');
          active = false;
          return;
        }
        tx = e.clientX;
        ty = e.clientY;
        const target = e.target.closest?.('[data-cursor]');
        if (target) {
          cursorEl.textContent = target.getAttribute('data-cursor') || '';
          const onLime = Boolean(target.closest('.contact-card, .btn-primary, .stack-card-inner'));
          cursorEl.classList.toggle('is-dark', onLime);
          cursorEl.classList.add('is-visible');
          if (!active) {
            active = true;
            cx = tx;
            cy = ty;
            requestAnimationFrame(tick);
          }
        } else {
          cursorEl.classList.remove('is-visible');
          active = false;
        }
      });

      document.addEventListener('pointerdown', () => {
        cursorEl.classList.remove('is-visible');
        active = false;
      });

      document.addEventListener('pointerleave', () => {
        cursorEl.classList.remove('is-visible');
        active = false;
      });
    }
  }

  /* ------------------------------------------------------------------------
     7. Inline CV PDF Renderer via Local PDF.js (iOS Safari, Android, Desktop)
     ------------------------------------------------------------------------ */
  const cvShell = document.getElementById('cv-canvas-shell');
  const cvLoading = document.getElementById('cv-loading');
  const cvContainer = document.getElementById('cv-canvas-container');
  const cvFallback = document.getElementById('cv-fallback');

  const showCvFallback = () => {
    if (cvShell) cvShell.hidden = true;
    if (cvLoading) cvLoading.hidden = true;
    if (cvFallback) {
      cvFallback.classList.add('is-visible');
      cvFallback.setAttribute('aria-hidden', 'false');
    }
  };

  if (cvContainer && cvShell) {
    const PDF_URL = './assets/Subham_Resume.pdf';
    const pdfLib = window.pdfjsLib;

    if (!pdfLib) {
      showCvFallback();
    } else {
      pdfLib.GlobalWorkerOptions.workerSrc = './assets/vendor/pdfjs/pdf.worker.min.js';
      let pdfDoc = null;
      let lastRenderedWidth = 0;
      let renderToken = 0;

      const renderPdfPages = async () => {
        if (!pdfDoc) return;
        const containerWidth = Math.floor(cvContainer.clientWidth);
        if (!containerWidth) {
          requestAnimationFrame(renderPdfPages);
          return;
        }
        if (Math.abs(containerWidth - lastRenderedWidth) < 10) return;

        const token = ++renderToken;
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        const fragment = document.createDocumentFragment();

        try {
          for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            if (token !== renderToken) return;

            const baseViewport = page.getViewport({ scale: 1 });
            const cssScale = containerWidth / baseViewport.width;
            const renderViewport = page.getViewport({ scale: cssScale * dpr });

            const canvas = document.createElement('canvas');
            canvas.className = 'cv-page-canvas';
            canvas.width = Math.floor(renderViewport.width);
            canvas.height = Math.floor(renderViewport.height);
            canvas.setAttribute('aria-label', `CV Page ${pageNum} of ${pdfDoc.numPages}`);

            const ctx = canvas.getContext('2d', { alpha: false });
            await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;
            if (token !== renderToken) return;

            fragment.appendChild(canvas);
          }

          cvContainer.innerHTML = '';
          cvContainer.appendChild(fragment);
          lastRenderedWidth = containerWidth;
          if (cvLoading) cvLoading.hidden = true;
        } catch (err) {
          showCvFallback();
        }
      };

      pdfLib.getDocument(PDF_URL).promise
        .then((doc) => {
          pdfDoc = doc;
          return renderPdfPages();
        })
        .catch(() => {
          showCvFallback();
        });

      let resizeTimer = 0;
      window.addEventListener(
        'resize',
        () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(renderPdfPages, 180);
        },
        { passive: true }
      );
    }
  }
})();
