(function() {
  var windowDimentsionStyles = document.createElement('style');

  document.head.appendChild(windowDimentsionStyles);

  function setWindowDimensionStyles() {
    var height = window.innerHeight;
    windowDimentsionStyles.innerHTML = '.fullscreen {\n  height: ' + height +
      'px;\n}';
  }

  // only bind to orientationchange because resize fires when the browser
  // switches to/from minimal ui (i.e. hiding/showing browser chrome in
  // mobile), and that causes a jarring jump in the page layout
  $(window).on('orientationchange', setWindowDimensionStyles);

  setWindowDimensionStyles();

  $(document).ready(setWindowDimensionStyles);
  $(window).load(setWindowDimensionStyles);

  // ios is weird and i keep seeing glitches where the window dimension style
  // is wrong, so we'll set it on a timeout with an exponential backoff.
  var interval = 50;

  function windowDimensionSetter() {
    setWindowDimensionStyles();
    interval *= 2;
    setTimeout(windowDimensionSetter, interval);
  }

  setTimeout(windowDimensionSetter, interval);
})();
