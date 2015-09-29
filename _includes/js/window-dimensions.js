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
})();
