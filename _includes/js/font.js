(function() {
  // just live with default fonts if browser doesn't support FontFace
  if (!document.fonts) return;

  document.fonts.ready.then(function() {
    document.body.className += " font-loaded";
  });
})();
