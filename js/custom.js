(function () {
  'use strict';

  // -- Hero content injection -------------------------------------------- //
  function initHero() {
    var section = document.getElementById('sp-section-1');
    if (!section) return;

    // Capture original banner image before we wipe innerHTML
    var origImg = section.querySelector('img');
    if (origImg) {
      var imgSrc = origImg.getAttribute('src');
      if (imgSrc) {
        section.style.setProperty('--hero-bg-image', 'url("' + imgSrc + '")');
      }
    }

    var isHome = document.body.className.indexOf('view-featured') !== -1;
    var content;

    if (isHome) {
      content =
        '<div class="olh-hero-content">' +
        '  <p class="olh-eyebrow">Newmarket, Ontario &bull; Est. 1946</p>' +
        '  <h1 class="olh-h1">Branch 426<span>Royal Canadian Legion</span></h1>' +
        '  <p class="olh-tagline">Veterans &bull; Family &bull; Community</p>' +
        '  <a href="index.php/about-br-426/" class="olh-btn-hero">Learn About Us</a>' +
        '</div>';
    } else {
      var h1El = document.querySelector('.article-header h1');
      var title = h1El ? h1El.textContent.trim() : '';
      if (!title) {
        var raw = document.title || '';
        title = raw.split('-')[0].trim();
      }
      content =
        '<div class="olh-hero-content olh-hero-subpage">' +
        '  <p class="olh-eyebrow">Branch 426 Royal Canadian Legion</p>' +
        '  <h2 class="olh-page-title">' + title + '</h2>' +
        '</div>';
    }

    section.innerHTML = content;
  }

  // -- Scroll fade-in animations ----------------------------------------- //
  function initAnimations() {
    var targets = [].slice.call(document.querySelectorAll(
      '.blog-featured .article, #sp-right .sp-module, .article-details, .gallery-item'
    ));

    targets.forEach(function (el, i) {
      el.classList.add('will-animate');
      el.style.transitionDelay = Math.min(i * 80, 320) + 'ms';
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  function init() {
    initHero();
    initAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
