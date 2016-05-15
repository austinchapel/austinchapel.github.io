(function() {
  var windowDimentsionStyles = document.createElement('style');
  var lastHeight;

  document.head.appendChild(windowDimentsionStyles);

  function setWindowDimensionStyles() {
    var height = window.innerHeight;

    // mobile browsers tend to trigger resize events when they hide their
    // chrome (which makes the window slightly bigger). we don't want to
    // reflect these small changes in the size at which we set `.fullscreen`,
    // so we'll require them to be at least 20% different.
    if (lastHeight == null || Math.abs(height - lastHeight) / lastHeight > .2) {
      windowDimentsionStyles.innerHTML = '.fullscreen {\n  height: ' + height +
        'px;\n}\n.halfscreen {\n  height: ' + (height / 2) + 'px;\n}';
      lastHeight = height;
    }
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
