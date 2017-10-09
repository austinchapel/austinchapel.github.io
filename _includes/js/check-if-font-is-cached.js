(function() {
  var lastFontLoad = parseInt(localStorage.getItem('lastFontLoad'), 10);
  if (lastFontLoad != null && Date.now() - lastFontLoad < 10 * 60 * 1000)
    document.body.className += ' font-loaded';
})();
