/**
 * Smart Resume Analyzer — Landing page behavior
 */

(function () {
  'use strict';

  // Smooth scroll for anchor links (fallback if CSS scroll-behavior not enough)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Optional: subtle CTA button pulse to draw attention
  var cta = document.getElementById('cta-main');
  if (cta) {
    cta.addEventListener('focus', addPulse);
    cta.addEventListener('blur', removePulse);
  }

  function addPulse() {
    if (cta) cta.classList.add('is-focused');
  }

  function removePulse() {
    if (cta) cta.classList.remove('is-focused');
  }
})();
