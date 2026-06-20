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

    // Google Maps — interactive toggle with embedded map
    var mapsAnchor = document.querySelector('#sp-right a[href*="google.com/maps"]');
    if (mapsAnchor) {
      var mapsBox = mapsAnchor.closest('.sp-module-content');
      if (mapsBox) {
        var ADDR_RAW  = '707 Srigley St, Newmarket, ON L3Y 1X4';
        var ADDR_ENC  = encodeURIComponent(ADDR_RAW);
        var EMBED_URL = 'https://maps.google.com/maps?q=' + ADDR_ENC + '&output=embed&z=15';
        var GMAP_URL  = 'https://www.google.com/maps/search/?api=1&query=' + ADDR_ENC;
        var AMAP_URL  = 'https://maps.apple.com/?q=' + ADDR_ENC;

        var GMAPS_ICON =
          '<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">' +
          '<path fill="#34A853" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>' +
          '<path fill="#FBBC04" d="M5 9c0-3.87 3.13-7 7-7 1.6 0 3.07.54 4.24 1.43L12 9H5z"/>' +
          '<path fill="#EA4335" d="M12 2c2.3 0 4.37.88 5.93 2.32L12 9l-2-3 2-4z" opacity=".9"/>' +
          '<circle cx="12" cy="9" r="2.8" fill="white"/>' +
          '<circle cx="12" cy="9" r="1.3" fill="#4285F4"/>' +
          '</svg>';

        var CHEVRON =
          '<svg class="olh-maps-chevron" width="16" height="16" viewBox="0 0 24 24"' +
          ' fill="none" stroke="currentColor" stroke-width="2.5"' +
          ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<polyline points="6 9 12 15 18 9"/></svg>';

        var GPIN =
          '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">' +
          '<path fill="#EA4335" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>' +
          '<circle cx="12" cy="9" r="2" fill="white"/></svg>';

        var APPLE_ICON =
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
          '<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79' +
          '-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39' +
          'c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91' +
          '.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04' +
          '-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35' +
          '-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>';

        mapsBox.innerHTML =
          '<div class="olh-maps-widget">' +
          '<button type="button" class="olh-social-btn olh-maps-toggle" aria-expanded="false">' +
          GMAPS_ICON +
          '<span class="olh-social-text">' +
          '<span class="olh-social-label">707 Srigley St, Newmarket</span>' +
          '<span class="olh-social-name">Get Directions</span>' +
          '</span>' + CHEVRON +
          '</button>' +
          '<div class="olh-maps-panel">' +
          '<div class="olh-maps-frame-wrap">' +
          '<iframe src="' + EMBED_URL + '" loading="lazy"' +
          ' referrerpolicy="no-referrer-when-downgrade"' +
          ' title="Branch 426 location"></iframe>' +
          '</div>' +
          '<div class="olh-maps-actions">' +
          '<a href="' + GMAP_URL + '" target="_blank" rel="noopener" class="olh-maps-action-btn olh-maps-google">' +
          GPIN + 'View on Google Maps</a>' +
          '<a href="' + AMAP_URL + '" target="_blank" rel="noopener" class="olh-maps-action-btn olh-maps-apple">' +
          APPLE_ICON + 'Apple Maps</a>' +
          '</div>' +
          '</div>' +
          '</div>';

        var toggle = mapsBox.querySelector('.olh-maps-toggle');
        var panel  = mapsBox.querySelector('.olh-maps-panel');
        if (toggle && panel) {
          toggle.addEventListener('click', function () {
            var open = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!open));
            panel.classList.toggle('open', !open);
            toggle.classList.toggle('active', !open);
          });
        }
      }
    }
  }

  // -- Enhanced sidebar navigation --------------------------------------- //
  function initSidebarNav() {
    var nav = document.querySelector('#sp-right .menu');
    if (!nav) return;

    var ICONS = {
      'veterans':
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      'ladies-auxiliary':
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
      'membership':
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>' +
        '<path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      'bursary':
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>' +
        '<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
      'sports':
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
      'hall-rentals':
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>' +
        '<polyline points="9 22 9 12 15 12 15 22"/></svg>',
      'photo-gallery':
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>' +
        '<circle cx="12" cy="13" r="4"/></svg>'
    };

    var CHEVRON =
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
      ' stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<polyline points="9 18 15 12 9 6"/></svg>';

    // Add "Explore" header to the first nav module
    var firstModule = nav.closest('.sp-module');
    if (firstModule && !firstModule.querySelector('.olh-nav-header')) {
      var hdr = document.createElement('div');
      hdr.className = 'olh-nav-header';
      hdr.innerHTML = '<span class="olh-nav-eyebrow">Explore</span>';
      firstModule.insertBefore(hdr, firstModule.firstChild);
    }

    // Add icon + chevron to each link
    var links = nav.querySelectorAll('li a');
    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var iconHtml = '';
      Object.keys(ICONS).forEach(function (k) {
        if (href.indexOf(k) !== -1) { iconHtml = ICONS[k]; }
      });

      var iconSpan = document.createElement('span');
      iconSpan.className = 'olh-nav-icon';
      iconSpan.innerHTML = iconHtml || ICONS['veterans']; // fallback
      link.insertBefore(iconSpan, link.firstChild);

      var arrowSpan = document.createElement('span');
      arrowSpan.className = 'olh-nav-arrow';
      arrowSpan.innerHTML = CHEVRON;
      link.appendChild(arrowSpan);
    });
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

  function init() { initHero(); initSidebarLinks(); initSidebarNav(); initAnimations(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
}());
