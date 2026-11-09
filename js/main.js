/* Renders content from data.js and handles navigation, tabs, and the project panel. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var VIEWS = ['home', 'projects', 'experience', 'skills', 'contact'];
  var ALIASES = { expertise: 'skills' };           // old #expertise links still work

  /* Escape text from data.js before it goes into innerHTML */
  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function li(arr) { return arr.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join(''); }
  function byId(id) { return PROJECTS.filter(function (x) { return x.id === id; })[0]; }

  /* ---------- Navigation (hash based: #projects, #experience ...) ---------- */
  var navLinks = document.querySelectorAll('#nav a');
  var toggle = $('.nav-toggle'), nav = $('#nav');

  function showView() {
    var id = location.hash.slice(1);
    id = ALIASES[id] || id;
    if (VIEWS.indexOf(id) < 0) id = 'home';
    VIEWS.forEach(function (v) { $('#' + v).classList.toggle('on', v === id); });
    navLinks.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    closeDrawer(); window.scrollTo({ top: 0, behavior: 'instant' });  // 'instant' beats the CSS smooth-scroll
  }
  window.addEventListener('hashchange', showView);
  toggle.addEventListener('click', function () {
    toggle.setAttribute('aria-expanded', nav.classList.toggle('open'));
  });

  /* ---------- Project cards (Projects page + homepage Selected Work) ---------- */
  function makeCard(p, compact, parent) {
    var b = document.createElement('button');
    b.className = 'card' + (compact ? ' compact' : '');
    b.innerHTML =
      '<span class="when">' + esc(p.when) + '</span>' +
      '<h3>' + esc(p.name) + '</h3>' +
      '<p class="meta">' + esc(p.company) + ' · ' + esc(p.role) + ' · ' + esc(p.platforms) + '</p>' +
      '<p class="sum">' + esc(p.summary) + '</p>' +
      (compact ? '' : '<p class="ovw">' + esc(p.overview) + '</p>') +
      (compact ? '' : '<ul class="focus">' + li(p.focus) + '</ul>') +
      '<span class="more">View details →</span>';
    b.addEventListener('click', function () { openProject(p.id, b); });
    parent.appendChild(b);
  }
  PROJECTS.forEach(function (p) {
    makeCard(p, false, $('#cards'));
    if (p.featured) makeCard(p, true, $('#selected'));
  });

  /* ---------- Project detail panel ---------- */
  var drawer = $('#drawer'), scrim = $('#scrim'), body = $('#d-body'), lastFocus = null;

  function openProject(id, from) {
    var p = byId(id);
    if (!p) return;
    lastFocus = from || document.activeElement;

    // Link back to the related company tab in Experience
    var expIdx = -1;
    EXPERIENCE.forEach(function (e, i) { if (e.projects.indexOf(id) >= 0) expIdx = i; });

    body.innerHTML =
      '<h3 id="d-title">' + esc(p.name) + '</h3>' +
      '<dl class="kv facts">' +
        '<dt>Company</dt><dd>' + esc(p.company) + '</dd>' +
        '<dt>Role</dt><dd>' + esc(p.role) + '</dd>' +
        '<dt>Period</dt><dd>' + esc(p.when) + '</dd>' +
        '<dt>Platform</dt><dd>' + esc(p.platforms) + '</dd>' +
      '</dl>' +
      '<h4>1 · Project overview</h4><p class="ov">' + esc(p.overview) + '</p>' +
      '<h4>2 · My contribution</h4><ul class="dash">' + li(p.duties) + '</ul>' +
      '<div class="h4row"><h4>3 · Testing coverage</h4><button class="toggle-all" type="button">Expand all</button></div>' +
      '<div class="coverage">' + p.coverage.map(function (s, i) {
        return '<details' + (i === 0 ? ' open' : '') + '><summary>' + esc(s[0]) + '<small>' + s[1].length + ' areas</small></summary><ul class="scope">' + li(s[1]) + '</ul></details>';
      }).join('') + '</div>' +
      '<h4>4 · Testing types &amp; tools</h4><dl class="kv"><dt>Types</dt><dd>' + esc(p.types) + '</dd><dt>Tools</dt><dd>' + esc(p.tools) + '</dd></dl>' +
      '<p class="d-links">' +
        (expIdx >= 0 ? '<button class="chip" type="button" id="d-exp">See role at ' + esc(EXPERIENCE[expIdx].co) + ' →</button>' : '') +
        (p.link ? '<a href="' + esc(p.link[0]) + '" target="_blank" rel="noopener">' + esc(p.link[1]) + ' ↗</a>' : '') +
      '</p>';

    // Expand / collapse every coverage category at once
    var all = $('.toggle-all', body), groups = body.querySelectorAll('.coverage details');
    all.addEventListener('click', function () {
      var open = all.textContent === 'Expand all';
      groups.forEach(function (d) { d.open = open; });
      all.textContent = open ? 'Collapse all' : 'Expand all';
    });
    var goExp = $('#d-exp', body);
    if (goExp) goExp.addEventListener('click', function () { goExperience(expIdx); });

    scrim.hidden = drawer.hidden = false;
    drawer.scrollTop = 0; document.body.style.overflow = 'hidden';
    $('#close').focus();
  }
  function closeDrawer() {
    if (drawer.hidden) return;
    scrim.hidden = drawer.hidden = true; document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $('#close').addEventListener('click', closeDrawer);
  scrim.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
    if (e.key === 'Tab' && !drawer.hidden) {            // keep keyboard focus inside the panel
      var f = drawer.querySelectorAll('a,button,summary'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Experience tabs ---------- */
  var tabs = $('#exp-tabs'), panel = $('#exp-panel');
  function selectTab(i) {
    var e = EXPERIENCE[i];
    tabs.querySelectorAll('.tab').forEach(function (t, n) {
      t.setAttribute('aria-selected', n === i); t.tabIndex = n === i ? 0 : -1;
    });
    panel.innerHTML =
      '<h3>' + esc(e.co) + '</h3>' +
      '<p class="title">' + esc(e.role) + '</p><p class="meta">' + esc(e.dates) + '</p>' +
      '<p class="about">' + esc(e.about) + '</p>' +
      '<div class="cols">' +
        '<div><h4>Responsibilities</h4><ul class="dash">' + li(e.points) + '</ul></div>' +
        '<div><h4>Relevant contributions</h4><ul class="dash">' + li(e.contrib) + '</ul></div>' +
      '</div>' +
      '<h4>Related projects</h4><div class="related">' + e.projects.map(function (id) {
        var p = byId(id);
        return '<button class="rel" type="button" data-p="' + id + '"><span><b>' + esc(p.name) + '</b><small>' +
          esc(p.platforms) + ' · ' + esc(p.when) + '</small></span><span class="go">View project →</span></button>';
      }).join('') + '</div>';
    panel.querySelectorAll('.rel').forEach(function (c) {
      c.addEventListener('click', function () { openProject(c.dataset.p, c); });
    });
  }
  function goExperience(i) {                              // used by the "See role at ..." button
    selectTab(i);
    if (location.hash === '#experience') showView(); else location.hash = '#experience';
  }
  EXPERIENCE.forEach(function (e, i) {
    var t = document.createElement('button');
    t.className = 'tab'; t.setAttribute('role', 'tab');
    t.innerHTML = '<b>' + esc(e.co) + '</b><small>' + esc(e.dates.replace(/[A-Z][a-z]+ (?=\d{4})/g, '')) + '</small>';
    t.addEventListener('click', function () { selectTab(i); });
    t.addEventListener('keydown', function (ev) {      // arrow keys move between tabs
      var d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[ev.key];
      if (!d) return; ev.preventDefault();
      var n = (i + d + EXPERIENCE.length) % EXPERIENCE.length; selectTab(n); tabs.children[n].focus();
    });
    tabs.appendChild(t);
  });
  selectTab(0);

  /* ---------- Skills & Tools ---------- */
  $('#skills-list').innerHTML = SKILLS.map(function (s) {
    return '<div class="srow"><dt>' + esc(s.name) + '</dt><dd>' +
      s.items.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</dd></div>';
  }).join('');

  showView();
})();
