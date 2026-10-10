/* script.js — carrosséis de Projetos e Artigos
   Setas sempre ativas (voltam ao início/fim em ciclo) e arrastar no celular. */
(function () {
  function initCarousel(trackId, prevId, nextId) {
    var track = document.getElementById(trackId);
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    if (!track || !prev || !next || !track.children.length) return;

    var viewport = track.parentElement;
    var cards = track.children;
    var index = 0;

    function metrics() {
      var cs = getComputedStyle(track);
      var gap = parseFloat(cs.columnGap || cs.gap) || 0;
      var step = cards[0].getBoundingClientRect().width + gap;
      var visible = Math.max(1, Math.round((viewport.clientWidth + gap) / step));
      return { step: step, max: Math.max(0, cards.length - visible) };
    }

    function update() {
      var m = metrics();
      if (index > m.max) index = m.max;
      if (index < 0) index = 0;
      track.style.transform = 'translateX(' + (-index * m.step) + 'px)';
      var show = m.max > 0 ? '' : 'none';
      prev.style.display = show;
      next.style.display = show;
    }

    function go(dir) {
      var m = metrics();
      index += dir;
      if (index > m.max) index = 0;       // passou do fim: volta ao começo
      if (index < 0) index = m.max;       // passou do começo: vai ao fim
      update();
    }

    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);

    var startX = null;
    viewport.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      startX = null;
    });

    update();
  }

  initCarousel('projectsTrack', 'prevProject', 'nextProject');
  initCarousel('articlesTrack', 'prevArticle', 'nextArticle');
})();
