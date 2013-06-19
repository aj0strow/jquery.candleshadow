(function($) {

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function randOffset(offset, variance, step) {
    var min = -step, max = step;
    if (offset < -variance) min = 0;
    else if (offset > variance) max = 0;
    return rand(min, max);
  }
  
  function randMove(offset, variance, step) {
    var dx = randOffset(offset.x, variance, step), 
        dy = randOffset(offset.y, variance, step);
    offset.x += dx;
    offset.y += dy;
    return { left: '+=' + dx, top: '+=' + dy };
  }
  
  $.fn.candleshadow = function(opts) {
    var options = $.extend({ 
      delay: 800, easing: 'linear', css: {}, variance: 5, step: 0.8
    }, opts);
        
    return $(this).each(function(i, self) {
      var $this = $(self), coords = $this.offset();
    
      var $el = $this.clone();
    
      $el.css($.extend({ opacity: 0.5, margin: 0 }, options.css, coords, 
              { position: 'absolute' }))
        .appendTo('body');
    
      var offset = { x: 0, y: 0 };
    
      (function() {
        $el.animate(randMove(offset, options.variance, options.step), options.delay, 
          options.easing, arguments.callee);
      })();
    });
  };
  
})(jQuery);