/* resumo-extras.js
   Colocar na pasta docs/ e carregar no final de cada página "analise-executiva-*.html".
   1) Corrige o link "Voltar" quebrado (index.html -> ../index.html)
   2) Garante o botão "Ver no GitHub" no topo e no rodapé de cada resumo */
(function () {
  var REPOS = {
    livros: 'Analise_vendas_livros',
    rfm: 'Segmentacao_clientes_Ecommerce_RFM',
    churn: 'Previs-o-de-churn-de-clientes--Telecom',
    logistica: 'Dashboard-Log-stica',
    rh: 'Projeto-RH',
    comercial: 'Projeto-Comercial-Power-Bi',
    fitnesslife: 'Projeto_Analise_Receita_FitnessLife'
  };

  // 1) links de volta
  document.querySelectorAll('a[href]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (/^(\.\/)?index\.html(#.*)?$/i.test(h)) {
      a.setAttribute('href', '../' + h.replace(/^\.\//, ''));
    }
  });

  // 2) GitHub
  var m = location.pathname.match(/analise-executiva-([a-z]+)\.html/i);
  var repo = m && REPOS[m[1].toLowerCase()];
  if (!repo) return;
  var url = 'https://github.com/VivianeAndrade1988/' + repo;

  // topo
  var bar = document.querySelector('.back-bar');
  if (bar && !bar.querySelector('a[href*="github.com"]')) {
    bar.style.display = 'flex';
    bar.style.alignItems = 'center';
    bar.style.justifyContent = 'space-between';
    bar.style.gap = '16px';
    var top = document.createElement('a');
    top.href = url; top.target = '_blank'; top.rel = 'noopener';
    top.textContent = 'Ver no GitHub ↗';
    top.style.cssText = 'padding:6px 14px;border:1px solid rgba(255,255,255,.35);border-radius:20px;font-size:13px;color:#CADCFC;text-decoration:none;font-weight:600';
    bar.appendChild(top);
  }

  // rodapé
  var foot = document.querySelector('.page-footer') || document.querySelector('footer');
  if (foot && !foot.querySelector('a[href*="github.com/VivianeAndrade1988"]')) {
    var back = foot.querySelector('a.btn');
    var gh = document.createElement('a');
    gh.href = url; gh.target = '_blank'; gh.rel = 'noopener';
    gh.className = back ? back.className : 'btn';
    gh.textContent = 'Ver repositório no GitHub';
    gh.style.marginRight = '10px';
    if (back) { back.parentNode.insertBefore(gh, back); } else { foot.appendChild(gh); }
  }
})();
