const menu = document.querySelector('.mobile-navigation');
if (menu) {
  const summary = menu.querySelector('summary');
  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      summary.focus();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) menu.open = false;
  });
}

// The native scroll area stays usable without JavaScript or automatic motion.
for (const gallery of document.querySelectorAll('[data-animal-gallery]')) {
  const viewport = gallery.querySelector('.animal-scroll');
  const track = gallery.querySelector('.animal-gallery');
  const toggle = gallery.querySelector('.animal-gallery-toggle');
  const originals = [...track.children];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let hovered = false;
  let focused = false;
  let visible = false;
  let frame = null;
  let previousTime = null;
  let loopWidth = 0;
  let position = 0;

  // A second, screen-reader-hidden set allows a continuous visual loop.
  for (const item of originals) {
    const copy = item.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.append(copy);
  }
  const measure = () => {
    loopWidth = track.children[originals.length].offsetLeft - originals[0].offsetLeft;
  };
  new ResizeObserver(measure).observe(viewport);
  measure();

  const canMove = () => !paused && !hovered && !focused && visible && !document.hidden;
  function advance(time) {
    frame = null;
    if (!canMove()) return;
    if (previousTime !== null && loopWidth > 0) {
      const distance = Math.min(time - previousTime, 64) * 0.025;
      position = (position + distance) % loopWidth;
      viewport.scrollLeft = position;
    }
    previousTime = time;
    frame = requestAnimationFrame(advance);
  }
  function update() {
    toggle.textContent = paused ? 'Resume scrolling' : 'Pause scrolling';
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTime = null;
    position = viewport.scrollLeft;
    if (canMove()) frame = requestAnimationFrame(advance);
  }
  function pauseForBrowsing() {
    paused = true;
    update();
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => { paused = !paused; update(); });
  viewport.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'touch') { hovered = true; update(); }
  });
  viewport.addEventListener('pointerleave', () => { hovered = false; update(); });
  viewport.addEventListener('focusin', () => { focused = true; update(); });
  viewport.addEventListener('focusout', (event) => {
    focused = viewport.contains(event.relatedTarget);
    update();
  });
  viewport.addEventListener('pointerdown', pauseForBrowsing, { passive: true });
  viewport.addEventListener('wheel', pauseForBrowsing, { passive: true });
  viewport.addEventListener('keydown', (event) => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) pauseForBrowsing();
  });
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) paused = true;
    update();
  });
  document.addEventListener('visibilitychange', update);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  }).observe(viewport);
  update();
}
