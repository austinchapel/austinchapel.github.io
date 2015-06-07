(function() {
  var $window = $(window);
  var $nav = $(document.getElementsByTagName('nav'));
  var NAV_HEIGHT = $nav.height();
  var vh = $window.height();

  state({
    vh: $window.height(),
    scroll: window.scrollY,
    fixed: false
  });

  function navShouldBeFixed() {
    return state().scroll >= state().vh - NAV_HEIGHT;
  }

  function fixNav(shouldFix) {
    if (shouldFix)
      $nav.addClass('fixed');
    else
      $nav.removeClass('fixed');
  }

  $(window).on('resize orientationchange', function() {
    state({vh: $window.height()});
  });

  $(window).on('scroll', function() {
    state({scroll: window.scrollY});
  });

  state.onchange(function(event, current, previous) {
    if (current.scroll != previous.scroll || current.vh != previous.vh)
      state({fixed: navShouldBeFixed()});

    if (current.fixed != previous.fixed)
      fixNav(current.fixed);
  });
})();
