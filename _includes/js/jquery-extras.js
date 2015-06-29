(function() {
  // even when i include this in the jquery build, it gets removed, so i'll
  // just mock it
  if (!$.fn.height)
    $.fn.height = function() {
      var h = this && this[0] && this[0].offsetHeight;

      return h == null?
        Math.max(document.documentElement.clientHeight, window.innerHeight || 0) :
        h;
    };
})();
