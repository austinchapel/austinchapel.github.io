// via https://github.com/Modernizr/Modernizr/blob/33a3721544eb191bf677d6337cd58fda9af0778e/feature-detects/css/positionsticky.js
(function() {
  var stickyIsSupported;

  window.stickySupported = function() {
    if (stickyIsSupported == null) {
      var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
      var p = 'position:';
      var value = 'sticky';
      var el = document.createElement('a');
      var s = el.style;

      s.cssText = p + prefixes.join(value + ';' + p).slice(0, -p.length);
      stickyIsSupported = s.position.indexOf(value) !== -1;
    }

    return stickyIsSupported;
  };
})();
