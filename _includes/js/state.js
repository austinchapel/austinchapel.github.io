(function() {
  var previous;
  var current = {};
  var eventBus = $({});

  window.state = function(_new) {
    if (arguments.length == 0)
      return current;

    previous = current;
    current = $.extend({}, current, _new);
    eventBus.trigger('change', [current, previous]);
  }

  window.state.onchange = function(f) {
    eventBus.on('change', f);
  };
})();
