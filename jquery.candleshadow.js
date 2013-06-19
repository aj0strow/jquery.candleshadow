(function($) {

  // random number within min..max
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // random move offset <= step size, and s.t. it does not
  // go too far past the variance
  function randOffset(offset, variance, step) {
    var min = -step, max = step;
    if (offset < -variance) min = 0;
    else if (offset > variance) max = 0;
    return rand(min, max);
  }
  
  // calculate move offsets, and update the total offset
  // return animation instructions
  function randMove(offset, variance, step) {
    var dx = randOffset(offset.x, variance, step), 
        dy = randOffset(offset.y, variance, step);
    offset.x += dx;
    offset.y += dy;
    return { left: '+=' + dx, top: '+=' + dy };
  }
  
  // extend jquery api with .candleshadow
  $.fn.candleshadow = function(opts) {
    
    // set and override default options
    var options = $.extend({ 
      delay: 800, easing: 'linear', css: {}, variance: 5, step: 0.8
    }, opts);
    
    // returning the each expression preserves chaining
    return $(this).each(function() {
      var $el = $(this), offset = { x: 0, y: 0 };
      
      // create the shadow
      var $shadow = $el.clone()
        .css($.extend({ opacity: 0.5, margin: 0 }, options.css, $el.offset(), 
              { position: 'absolute' }))
        .appendTo('body');
    
      // infinitely loop random movement animations by self-referencing an 
      // anonymous function
      return (function() {
        $shadow.animate(randMove(offset, options.variance, options.step), options.delay, 
          options.easing, arguments.callee);
      })();
    });
  };
  
})(jQuery);