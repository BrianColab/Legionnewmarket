(function () {
  'use strict';

  // -- Hero content injection -------------------------------------------- //
  function initHero() {
    var section = document.getElementById('sp-section-1');
    if (!section) return;

    // Capture original banner image before wiping innerHTML
    var origImg = section.querySelector('img');
    var imgSrc  = origImg ? origImg.getAttribute('src') : null;

    var isHome = document.body.className.indexOf('view-featured') !== -1;
    var photoHtml = imgSrc ? '<div class="olh-hero-photo"></div>' : '';
    var textHtml;

    if (isHome) {
      section.classList.add('olh-hero-home');
      textHtml =
        '<div class="olh-hero-content">' +
        '  <p class="olh-eyebrow">Newmarket, Ontario &bull; Est. 1946</p>' +
        '  <h1 class="olh-h1">Branch 426<span>Royal Canadian<br>Legion</span></h1>' +
        '  <p class="olh-tagline">Veterans &bull; Family &bull; Community</p>' +
        '  <a href="index.php/about-br-426/" class="olh-btn-hero">Learn About Us</a>' +
        '</div>';
    } else {
      section.classList.add('olh-hero-sub');
      var h1El  = document.querySelector('.article-header h1');
      var title = h1El ? h1El.textContent.trim() : '';
      if (!title) { title = (document.title || '').split('-')[0].trim(); }
      textHtml =
        '<div class="olh-hero-content olh-hero-subpage">' +
        '  <p class="olh-eyebrow">Branch 426 Royal Canadian Legion</p>' +
        '  <h2 class="olh-page-title">' + title + '</h2>' +
        '</div>';
    }

    section.innerHTML = photoHtml + textHtml;

    // Set photo background-image directly on the injected div (avoids CSS var issues)
    if (imgSrc) {
      var photoEl = section.querySelector('.olh-hero-photo');
      if (photoEl) { photoEl.style.backgroundImage = 'url("' + imgSrc + '")'; }
    }
  }

  // -- Sidebar social link buttons --------------------------------------- //
  function initSidebarLinks() {
    var FB_SVG =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">' +
      '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954' +
      ' 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669' +
      ' 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25' +
      'h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';

    var PIN_SVG =
      '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="#CF1F2A" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13' +
      'c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5' +
      ' 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';

    // Facebook
    var fbAnchor = document.querySelector('#sp-right a[href*="facebook.com"]');
    if (fbAnchor) {
      var fbBox = fbAnchor.closest('.sp-module-content');
      if (fbBox) {
        fbBox.innerHTML =
          '<a href="' + fbAnchor.href + '" class="olh-social-btn olh-social-fb"' +
          ' target="_blank" rel="noopener">' +
          FB_SVG +
          '<span class="olh-social-text">' +
          '<span class="olh-social-label">Find us on</span>' +
          '<span class="olh-social-name">Facebook</span>' +
          '</span></a>';
      }
    }

    // Google Maps
    var mapsAnchor = document.querySelector('#sp-right a[href*="google.com/maps"]');
    if (mapsAnchor) {
      var mapsBox = mapsAnchor.closest('.sp-module-content');
      if (mapsBox) {
        mapsBox.innerHTML =
          '<a href="' + mapsAnchor.href + '" class="olh-social-btn olh-social-maps"' +
          ' target="_blank" rel="noopener">' +
          PIN_SVG +
          '<span class="olh-social-text">' +
          '<span class="olh-social-label">707 Srigley St, Newmarket</span>' +
          '<span class="olh-social-name">Get Directions</span>' +
          '</span></a>';
      }
    }
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

  function init() { initHero(); initSidebarLinks(); initAnimations(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
}());
