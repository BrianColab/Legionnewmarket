(function () {
  'use strict';

  function initAnimations() {
    var targets = [].slice.call(document.querySelectorAll(
      '.blog-featured .article, ' +
      '#sp-right .sp-module, ' +
      '.article-details, ' +
      '.gallery-item'
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
}());
