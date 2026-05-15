// Strips browser extension attributes (e.g. Bitdefender's bis_skin_checked)
// before React hydration to prevent hydration mismatch errors.
(function () {
  var attrs = ['bis_skin_checked'];
  function strip() {
    attrs.forEach(function (attr) {
      document.querySelectorAll('[' + attr + ']').forEach(function (el) {
        el.removeAttribute(attr);
      });
    });
  }
  strip();
  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.type === 'attributes' && attrs.indexOf(m.attributeName) !== -1) {
        m.target.removeAttribute(m.attributeName);
      }
    });
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: attrs,
    subtree: true,
  });
})();
