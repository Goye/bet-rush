(function() {
  angular
  .module('prodigi.common')
  .factory('parallaxFactory', parallaxFactory);

  function parallaxFactory() {
    jsProperties = {
      'background-position': 'backgroundPosition',
      'height': 'height'
    };

    function Parallax(element, options) {
      this.element = element;
      this.defaultPosition = options.defaultPosition || 1000;
      this.delay = options.delay || 0.3;
      this.property = options.property || 'background-position';
      this.init();
    }

    Parallax.prototype.init = function() {
      this.onScroll = this.onScroll.bind(this);
      window.addEventListener('scroll', this.onScroll);
    };

    Parallax.prototype.onScroll = function(event) {
      var bst = document.body.scrollTop;
      var dst = document.documentElement.scrollTop;
      var wcs = window.getComputedStyle(this.element);
      this.scrollTop = Math.max(bst, dst);
      if (wcs.getPropertyValue(this.property)) {
        var bg = '0px ';
        var diff = parseInt(this.scrollTop) - parseInt(this.defaultPosition);
        bg += -diff * this.delay + 'px';
        this.element.style[jsProperties[this.property]] = bg;
      }
    };

    return {
      startParallax: function(element, options) {
        return new Parallax(element, options);
      }
    };
  }
}());
