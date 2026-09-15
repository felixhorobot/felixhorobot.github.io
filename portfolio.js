/* Small progressive enhancements. No analytics, APIs, accounts or live telemetry. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const data = window.PORTFOLIO || { projects: [], measurement: {} };
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  // Only allow ordinary web URLs and local paths in editable project data.
  function safeHref(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const parsed = new URL(value, document.baseURI);
      if (['http:', 'https:'].includes(parsed.protocol)) return value;
      if (window.location.protocol === 'file:' && parsed.protocol === 'file:' && !value.startsWith('//')) return value;
    } catch (_) { /* Invalid links become plain headings. */ }
    return null;
  }
  function initNavigation() {
    const button = $('.menu-toggle');
    const nav = $('#main-nav');
    if (!button || !nav) return;
    document.body.classList.add('enhanced');
    button.hidden = false;
    function setOpen(open) {
      button.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      button.querySelector('span').textContent = open ? '−' : '＋';
    }
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
    });
    // The old /#gpu URL remains useful after moving the long-form portfolio.
    function legacyAnchor() { if (window.location.hash === '#gpu') window.location.replace('engineering.html#gpu'); }
    window.addEventListener('hashchange', legacyAnchor);
    legacyAnchor();
  }
  function initProjects() {
    const grid = $('#project-grid');
    const filters = $('#project-filters');
    const counter = $('#project-count');
    if (!grid || !filters || !counter) return;
    const projects = Array.isArray(data.projects) ? data.projects : [];
    const categories = ['All work', ...new Set(projects.map((p) => p.category).filter(Boolean))];
    function render(category) {
      const selected = category === 'All work' ? projects : projects.filter((p) => p.category === category);
      grid.replaceChildren();
      for (const project of selected) {
        const card = el('article', 'project-card');
        const top = el('div', 'card-top');
        const icon = el('span', 'project-icon', project.icon || '＋'); icon.setAttribute('aria-hidden', 'true');
        top.append(icon, el('span', 'card-category', project.category));
        const title = el('h3');
        const href = safeHref(project.href);
        if (href) {
          const a = el('a', '', project.title); a.href = href;
          const arrow = el('span', '', '↗'); arrow.setAttribute('aria-hidden', 'true'); a.append(arrow);
          if (/^https?:\/\//i.test(href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
          title.append(a);
        } else title.textContent = project.title;
        const tags = el('div', 'tags');
        for (const tag of project.tags || []) tags.append(el('span', '', tag));
        card.append(top, title, el('p', '', project.description), tags);
        grid.append(card);
      }
      counter.textContent = `${selected.length} ${selected.length === 1 ? 'project' : 'projects'}`;
      if (!selected.length) grid.append(el('p', '', 'No projects in this category yet.'));
      filters.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.textContent === category)));
    }
    for (const category of categories) {
      const button = el('button', '', category); button.type = 'button';
      button.addEventListener('click', () => render(category)); filters.append(button);
    }
    render('All work');
  }
  // Sample state transcription, NOT a production tolerance-classification algorithm.
  // This capture has no above-range samples: its nonnegative displayed offsets are green.
  function readingState(value) { return value === null ? 'empty' : value === 'X' ? 'invalid' : value < 0 ? 'under' : 'good'; }
  const stateNames = { empty: 'No sample', invalid: 'Invalid', under: 'Under', good: 'In range' };
  function displayReading(value) { return value === null ? '—' : value === 'X' ? 'X' : value >= 0 ? `+${value}` : `−${Math.abs(value)}`; }
  function initMeasurement() {
    const matrix = $('#length-matrix'); const select = $('#length-select');
    const strip = $('#reading-strip'); const summary = $('#reading-summary');
    if (!matrix || !select || !strip || !summary) return;
    const readings = data.measurement || {};
    const lengths = Object.keys(readings).sort((a,b) => Number(a) - Number(b));
    select.replaceChildren();
    for (const length of lengths) {
      const option = el('option', '', `${length} m`); option.value = length; select.append(option);
      const column = el('div', 'matrix-column'); column.append(el('h4', '', `${length}m`));
      readings[length].forEach((value, index) => {
        const cell = el('span', 'matrix-cell', displayReading(value)); const state = readingState(value);
        cell.dataset.state = state;
        cell.setAttribute('aria-label', `${length} metres, sample ${index + 1}: ${stateNames[state]}${typeof value === 'number' ? `, offset ${value}` : ''}`);
        cell.title = cell.getAttribute('aria-label'); column.append(cell);
      });
      matrix.append(column);
    }
    function updateReadings() {
      const current = readings[select.value] || []; strip.replaceChildren();
      const counts = { good: 0, under: 0, invalid: 0, empty: 0 };
      current.forEach((value, index) => {
        const state = readingState(value); counts[state]++;
        const item = el('div', 'reading', displayReading(value)); item.dataset.state = state;
        item.setAttribute('aria-label', `Sample ${index + 1}: ${stateNames[state]}${typeof value === 'number' ? `, offset ${value}` : ''}`);
        item.append(el('small', '', stateNames[state])); strip.append(item);
      });
      summary.textContent = `${select.value} m · ${counts.good} in range · ${counts.under} under · ${counts.invalid} invalid${counts.empty ? ` · ${counts.empty} no sample` : ''}`;
    }
    select.value = lengths.includes('5.1') ? '5.1' : (lengths[0] || '');
    select.addEventListener('change', updateReadings); updateReadings();
  }
  function initLightbox() {
    const dialog = $('#image-dialog'); const image = $('#dialog-image');
    const viewport = $('.dialog-image-wrap'); const status = $('#zoom-status');
    if (!dialog || !image || !viewport || !status || typeof dialog.showModal !== 'function') return;
    const zoomButtons = [...dialog.querySelectorAll('[data-zoom]')];
    let opener = null; let zoom = 'fit'; let drag = null;

    function layout(preserveCentre = false) {
      if (!dialog.open || !image.naturalWidth || !viewport.clientHeight) return;
      const oldImage = image.getBoundingClientRect();
      const view = viewport.getBoundingClientRect();
      const clamp = (value) => Math.max(0, Math.min(1, value));
      const centreX = oldImage.width ? clamp((view.left + viewport.clientWidth / 2 - oldImage.left) / oldImage.width) : .5;
      const centreY = oldImage.height ? clamp((view.top + viewport.clientHeight / 2 - oldImage.top) / oldImage.height) : .5;
      const fit = Math.min((viewport.clientWidth - 24) / image.naturalWidth, (viewport.clientHeight - 24) / image.naturalHeight, 1);
      const scale = zoom === 'fit' ? Math.max(.01, fit) : Number(zoom);
      image.style.width = `${Math.max(1, Math.floor(image.naturalWidth * scale))}px`;
      const isZoomed = image.offsetWidth > viewport.clientWidth || image.offsetHeight > viewport.clientHeight;
      viewport.classList.toggle('is-zoomed', isZoomed);
      zoomButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.zoom === zoom)));
      status.textContent = `${zoom === 'fit' ? 'Fit · ' : ''}${Math.round(scale * 100)}% · ${image.naturalWidth} × ${image.naturalHeight} px original`;
      if (zoom === 'fit' || !preserveCentre) {
        viewport.scrollLeft = 0; viewport.scrollTop = 0;
      } else {
        viewport.scrollLeft = image.offsetLeft + centreX * image.offsetWidth - viewport.clientWidth / 2;
        viewport.scrollTop = image.offsetTop + centreY * image.offsetHeight - viewport.clientHeight / 2;
      }
    }
    zoomButtons.forEach((button) => {
      button.addEventListener('click', () => { zoom = button.dataset.zoom; layout(true); });
    });
    image.addEventListener('load', () => layout());
    image.addEventListener('error', () => { status.textContent = 'This image could not be loaded.'; });
    window.addEventListener('resize', () => layout(true));
    document.querySelectorAll('[data-lightbox]').forEach((link) => {
      link.addEventListener('click', (event) => {
        // Preserve ordinary browser gestures and the image link when JS is unavailable.
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); opener = link; zoom = 'fit';
        image.style.width = '1px';
        image.src = link.href;
        image.alt = link.querySelector('img')?.alt || link.dataset.title || 'Production dashboard screenshot';
        $('#dialog-title').textContent = link.dataset.title || 'System dashboard';
        $('#dialog-caption').textContent = link.dataset.caption || '';
        status.textContent = 'Loading image…';
        document.body.classList.add('dialog-open'); dialog.showModal();
        requestAnimationFrame(() => layout());
      });
    });
    $('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('button, a[href], [tabindex="0"]')].filter((node) => !node.hidden && !node.disabled);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    // Touch uses native scrolling; mouse users may also grab and drag at pixel zoom.
    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || !viewport.classList.contains('is-zoomed')) return;
      // Leave native scrollbar interaction alone.
      const bounds = viewport.getBoundingClientRect();
      if (event.clientX >= bounds.left + viewport.clientWidth || event.clientY >= bounds.top + viewport.clientHeight) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
      viewport.setPointerCapture(event.pointerId); viewport.classList.add('is-panning');
      viewport.focus({ preventScroll: true }); event.preventDefault();
    });
    viewport.addEventListener('pointermove', (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      viewport.scrollLeft = drag.left + drag.x - event.clientX;
      viewport.scrollTop = drag.top + drag.y - event.clientY;
    });
    function endDrag() { drag = null; viewport.classList.remove('is-panning'); }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('lostpointercapture', endDrag);
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      endDrag(); document.body.classList.remove('dialog-open'); opener?.focus({ preventScroll: true });
    });
  }
  function initOriginalImages() {
    document.querySelectorAll('[data-original-image]').forEach((image) => {
      const message = image.closest('[data-original-frame]')?.querySelector('[data-image-error]');
      if (!message) return;
      image.addEventListener('load', () => { message.hidden = true; });
      image.addEventListener('error', () => { message.hidden = false; });
      if (image.complete && !image.naturalWidth) message.hidden = false;
    });
  }
  initNavigation(); initProjects(); initMeasurement(); initLightbox(); initOriginalImages();
  if ($('#year')) $('#year').textContent = new Date().getFullYear();
})();
