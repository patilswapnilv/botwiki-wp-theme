(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var back_to_top = {
  init: function init() {
    $(window).scroll(function () {
      /* TODO: Legacy script, rewrite with jQuery. */
      var backToTop = document.getElementById('back-to-top'),
          documentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (documentScrollTop > screen.height / 2) {
        backToTop.classList.add('slide-up');
        backToTop.classList.remove('slide-down');
      } else {
        backToTop.classList.remove('slide-up');
        backToTop.classList.add('slide-down');
      }
    });
  }
};

exports.back_to_top = back_to_top;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function unshift_elements(shifted_els) {
  if (shifted_els.length > 0) {
    Array.prototype.forEach.call(shifted_els, function (el, index) {
      setTimeout(function () {
        el.classList.remove('shifted');
        el.classList.add('unshifted');
      }, 55 * index * index);
    });
  }
}

exports.unshift_elements = unshift_elements;

},{}],3:[function(require,module,exports){
"use strict";
/*
  Lazy Load Images without jQuery
  http://kaizau.github.com/Lazy-Load-Images-without-jQuery/
  Original by Mike Pulaski - http://www.mikepulaski.com
  Modified by Kai Zau - http://kaizau.com
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
function lazyLoaderFn() {
  var addEventListener = window.addEventListener || function (n, f) {
    window.attachEvent('on' + n, f);
  },
      removeEventListener = window.removeEventListener || function (n, f, b) {
    window.detachEvent('on' + n, f);
  };

  // For IE7 compatibility
  // Adapted from http://www.quirksmode.org/js/findpos.html
  function getOffsetTop(el) {
    var val = 0;
    if (el.offsetParent) {
      do {
        val += el.offsetTop;
      } while (el = el.offsetParent);
      return val;
    }
  }

  var lazyLoader = {
    cache: [],
    mobileScreenSize: 500,
    //tinyGif: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',

    addObservers: function addObservers() {
      addEventListener('scroll', lazyLoader.throttledLoad);
      addEventListener('resize', lazyLoader.throttledLoad);
    },

    removeObservers: function removeObservers() {
      removeEventListener('scroll', lazyLoader.throttledLoad, false);
      removeEventListener('resize', lazyLoader.throttledLoad, false);
    },

    throttleTimer: new Date().getTime(),

    throttledLoad: function throttledLoad() {
      var now = new Date().getTime();
      if (now - lazyLoader.throttleTimer >= 200) {
        lazyLoader.throttleTimer = now;
        lazyLoader.loadVisibleImages();
      }
    },

    loadVisibleImages: function loadVisibleImages() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var pageHeight = window.innerHeight || document.documentElement.clientHeight;
      var range = {
        min: scrollY - 200,
        max: scrollY + pageHeight + 200
      };

      var i = 0;
      while (i < lazyLoader.cache.length) {
        var image = lazyLoader.cache[i];
        var imagePosition = getOffsetTop(image);
        var imageHeight = image.height || 0;

        if (imagePosition >= range.min - imageHeight && imagePosition <= range.max) {
          var mobileSrc = image.getAttribute('data-src-mobile');

          // image.onload = function() {
          //   this.className = this.className.replace(/(^|\s+)lazy-load(\s+|$)/, '$1lazy-loaded$2');
          // };
          //        Temporary fix for Safari!

          image.className = image.className.replace(/(^|\s+)lazy-load(\s+|$)/, '$1lazy-loaded$2');

          if (mobileSrc && screen.width <= lazyLoader.mobileScreenSize) {
            image.src = mobileSrc;
          } else {
            image.src = image.getAttribute('data-src');
          }

          image.removeAttribute('data-src');
          image.removeAttribute('data-src-mobile');

          lazyLoader.cache.splice(i, 1);
          continue;
        }

        i++;
      }

      if (lazyLoader.cache.length === 0) {
        lazyLoader.removeObservers();
      }
    },

    init: function init() {
      // Patch IE7- (querySelectorAll)
      if (!document.querySelectorAll) {
        document.querySelectorAll = function (selector) {
          var doc = document,
              head = doc.documentElement.firstChild,
              styleTag = doc.createElement('STYLE');
          head.appendChild(styleTag);
          doc.__qsaels = [];
          styleTag.styleSheet.cssText = selector + '{x:expression(document.__qsaels.push(this))}';
          window.scrollBy(0, 0);
          return doc.__qsaels;
        };
      }

      addEventListener('load', function _lazyLoaderInit() {
        var imageNodes = document.querySelectorAll('img[data-src]');

        for (var i = 0; i < imageNodes.length; i++) {
          var imageNode = imageNodes[i];

          // Add a placeholder if one doesn't exist
          //imageNode.src = imageNode.src || lazyLoader.tinyGif;

          lazyLoader.cache.push(imageNode);
        }

        lazyLoader.addObservers();
        lazyLoader.loadVisibleImages();

        removeEventListener('load', _lazyLoaderInit, false);
      });
    }
  };

  return lazyLoader;
}

exports.lazyLoaderFn = lazyLoaderFn;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menu_toggle = {
  init: function init() {
    var $body = $('body'),
        $menu_toggle = $('#menu-toggle');

    $('#menu-icon').on('click', function (ev) {
      var $menu_icon = $menu_icon || $('#menu-icon');

      console.log($menu_toggle);

      if ($('#menu-toggle').is(':checked') === true) {
        console.log('1');
        $('body').removeClass('menu-open');
        $menu_icon.html('☰').removeClass('mr-3 mt-0');
      } else {
        console.log('0');
        $('body').addClass('menu-open');
        $menu_icon.html('×').addClass('mr-3 mt-0');
      }
    });
  }
};

exports.menu_toggle = menu_toggle;

},{}],5:[function(require,module,exports){
"use strict";

var _menuToggle = require("./menu-toggle.js");

var _backToTop = require("./back-to-top.js");

var _submitYourBot = require("./submit-your-bot.js");

var _smoothScroll = require("./smooth-scroll.js");

var _helpers = require("./helpers.js");

var _lazyLoadImages = require("./lazy-load-images.js");

$ = jQuery.noConflict(true);

/* TODO: Legacy code, needs a cleanup. */

/* END TODO */

$(function () {
  _menuToggle.menu_toggle.init();
  _backToTop.back_to_top.init();
  _submitYourBot.bot_submission.init();

  /* TODO: Legacy code, needs a cleanup. */

  var articleImages = document.querySelectorAll('img.wp-post-image');

  for (var i = 0, j = articleImages.length; i < j; i++) {
    articleImages[i].dataset.src = articleImages[i].src;
    // articleImages[i].classList.add('lazy-load');
  }

  (0, _helpers.unshift_elements)(document.getElementsByClassName('shifted'));
  (0, _smoothScroll.smooth_scroll_fn)();
  (0, _lazyLoadImages.lazyLoaderFn)().init();
});

},{"./back-to-top.js":1,"./helpers.js":2,"./lazy-load-images.js":3,"./menu-toggle.js":4,"./smooth-scroll.js":6,"./submit-your-bot.js":7}],6:[function(require,module,exports){
"use strict";
/*
  https://github.com/alicelieutier/smoothScroll
  Modified by Stefan Bohacek to use the HTML5 History API.
*/

Object.defineProperty(exports, "__esModule", {
    value: true
});
function smooth_scroll_fn() {
    if (document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) {
        return;
    }

    var getTop = function getTop(element) {

        if (element.nodeName === 'HTML') {
            return -window.pageYOffset;
        }
        return element.getBoundingClientRect().top + window.pageYOffset;
    };
    var easeInOutCubic = function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    var position = function position(start, end, elapsed, duration) {
        if (elapsed > duration) {
            return end;
        }
        return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
    };
    var smoothScroll = function smoothScroll(el, duration, callback) {
        duration = duration || 500;
        var start = window.pageYOffset,
            end;
        if (typeof el === 'number') {
            end = parseInt(el);
        } else {
            end = getTop(el) - 50;
        }
        var clock = Date.now();
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
            window.setTimeout(fn, 15);
        };
        var step = function step() {
            var elapsed = Date.now() - clock;
            window.scroll(0, position(start, end, elapsed, duration));
            if (elapsed > duration) {
                if (typeof callback === 'function') {
                    callback(el);
                }
            } else {
                requestAnimationFrame(step);
            }
        };
        step();
    };
    var linkHandler = function linkHandler(ev) {
        ev.preventDefault();
        var hash = this.hash.substring(1);
        if (window.history && window.history.pushState) {
            history.pushState(null, null, '#' + hash);
        }
        smoothScroll(document.getElementById(hash), 500, function (el) {});
    };
    var internal = document.querySelectorAll('a[href^="#"]'),
        a;
    for (var i = internal.length; a = internal[--i];) {
        a.addEventListener("click", linkHandler, false);
    }

    if (window.location.hash) {
        setTimeout(function () {
            smoothScroll(document.getElementById(window.location.hash.substring(1)), 200, function (el) {});
        }, 300);
    }

    return smoothScroll;
}

exports.smooth_scroll_fn = smooth_scroll_fn;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bot_submission = {
  init: function init() {
    var $body = $('body');
    if ($body.hasClass('page-template-template-submit-your-bot')) {

      $('#test').click(function (ev) {
        ev.preventDefault();

        $('#add-author-fields').before('<div class="author-fields form-row"><div class="form-group col-md-6"><label for="author-${new_id}-name">Author\'s name</label><input type="text" class="form-control" id="author-2-name" name="author-names[]" placeholder="Author"></div><div class="form-group col-md-6"><label for="author-2-url">Author\'s URL</label><input type="url" class="form-control" id="author-2-url" name="author-urls[]" placeholder="https://twitter.com/author"></div></div>');

        $('#bot-name').val('@coolbot');
        $('#author-1-name').val('Stefan');
        $('#author-1-url').val('https://twitter.com/fourtonfish');
        $('#author-2-name').val('John Doe');
        // $('#author-2-url').val('https://twitter.com/jd');
        $('#bot-description').val('This bot generates random images.');
        $('#bot-urls').val('https://twitter.com/coolbot');
        $('#bot-tagline').val('This is a cool bot.');
        $('#bot-networks').val('5');
        $('#bot-networks').trigger('change');
        $('#bot-tags').val(['92', '64', '55']);
        $('#bot-tags').trigger('change');

        $('#bot-is-opensource').click();

        $('#bot-source-url').val('https://github.com/botwiki/botwiki.org');
        $('#bot-source-language').val('25');
        $('#bot-source-language').trigger('change');

        $('html, body').animate({
          scrollTop: $('#bot-form-submit').offset().top - 500
        }, 450);

        return false;
      });

      $('.js-select2').each(function (i) {
        $(this).select2({
          placeholder: $(this).attr('placeholder')
        });
      });

      $('#submit-bot-form').submit(function () {
        $('#bot-form-submit').attr('disabled', 'disabled').html('Please wait...');
      });

      $('#add-author-fields').click(function (ev) {
        ev.preventDefault();

        var new_id = $('.author-fields').length + 1;

        $(this).before('<div class="author-fields form-row"><div class="form-group col-md-6"><label for="author-' + new_id + '-name">Author\'s name</label><input type="text" class="form-control" id="author-' + new_id + '-name" name="author-' + new_id + '-name" placeholder="Author"></div><div class="form-group col-md-6"><label for="author-' + new_id + '-url">Author\'s URL</label><input type="url" class="form-control" id="author-' + new_id + '-url" name="author-' + new_id + '-url" placeholder="https://twitter.com/author"></div></div>');

        return false;
      });

      var $bot_source_info = $('#bot-source-info');
      $bot_source_info.addClass('d-none');

      $('#bot-is-opensource').click(function (ev) {

        if ($(this).is(':checked')) {
          $bot_source_info.removeClass('d-none');
        } else {
          $bot_source_info.addClass('d-none');
        }
      });
    }
  }
};

exports.bot_submission = bot_submission;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9iYWNrLXRvLXRvcC5qcyIsInNyYy9zY3JpcHRzL2hlbHBlcnMuanMiLCJzcmMvc2NyaXB0cy9sYXp5LWxvYWQtaW1hZ2VzLmpzIiwic3JjL3NjcmlwdHMvbWVudS10b2dnbGUuanMiLCJzcmMvc2NyaXB0cy9zY3JpcHRzLmpzIiwic3JjL3NjcmlwdHMvc21vb3RoLXNjcm9sbC5qcyIsInNyYy9zY3JpcHRzL3N1Ym1pdC15b3VyLWJvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7OztBQUVBLElBQUksY0FBYztBQUNoQixRQUFNLGdCQUFVO0FBQ2QsTUFBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFVO0FBQ3pCO0FBQ0EsVUFBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QixhQUF4QixDQUFoQjtBQUFBLFVBQ0ksb0JBQW9CLE9BQU8sV0FBUCxJQUFzQixTQUFTLGVBQVQsQ0FBeUIsU0FBL0MsSUFBNEQsU0FBUyxJQUFULENBQWMsU0FBMUUsSUFBdUYsQ0FEL0c7O0FBR0EsVUFBSSxvQkFBcUIsT0FBTyxNQUFQLEdBQWMsQ0FBdkMsRUFBMEM7QUFDeEMsa0JBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixVQUF4QjtBQUNBLGtCQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsWUFBM0I7QUFDRCxPQUhELE1BSUk7QUFDRixrQkFBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLFVBQTNCO0FBQ0Esa0JBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixZQUF4QjtBQUNEO0FBQ0YsS0FiRDtBQWNEO0FBaEJlLENBQWxCOztRQW9CRSxXLEdBQUEsVzs7O0FDdEJGOzs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsV0FBMUIsRUFBc0M7QUFDcEMsTUFBSSxZQUFZLE1BQVosR0FBcUIsQ0FBekIsRUFBMkI7QUFDekIsVUFBTSxTQUFOLENBQWdCLE9BQWhC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YjtBQURDLFNBQWhCO0FBR0QsT0FKRDs7QUFPQSxRQUFFLGtCQUFGLEVBQXNCLE1BQXRCLENBQTZCLFlBQVU7QUFDckMsVUFBRSxrQkFBRixFQUFzQixJQUF0QixDQUEyQixVQUEzQixFQUF1QyxVQUF2QyxFQUFtRCxJQUFuRCxDQUF3RCxnQkFBeEQ7QUFDRCxPQUZEOztBQUlBLFFBQUUsb0JBQUYsRUFBd0IsS0FBeEIsQ0FBOEIsVUFBUyxFQUFULEVBQVk7QUFDeEMsV0FBRyxjQUFIOztBQUVBLFlBQUksU0FBUyxFQUFFLGdCQUFGLEVBQW9CLE1BQXBCLEdBQTZCLENBQTFDOztBQUVBLFVBQUUsSUFBRixFQUFRLE1BQVIsOEZBQTBHLE1BQTFHLHdGQUFrTSxNQUFsTSw0QkFBK04sTUFBL04sOEZBQThULE1BQTlULHFGQUFtWixNQUFuWiwyQkFBK2EsTUFBL2E7O0FBRUEsZUFBTyxLQUFQO0FBQ0QsT0FSRDs7QUFVQSxVQUFJLG1CQUFtQixFQUFFLGtCQUFGLENBQXZCO0FBQ0EsdUJBQWlCLFFBQWpCLENBQTBCLFFBQTFCOztBQUVBLFFBQUUsb0JBQUYsRUFBd0IsS0FBeEIsQ0FBOEIsVUFBUyxFQUFULEVBQVk7O0FBRXhDLFlBQUksRUFBRSxJQUFGLEVBQVEsRUFBUixDQUFXLFVBQVgsQ0FBSixFQUEyQjtBQUN6QiwyQkFBaUIsV0FBakIsQ0FBNkIsUUFBN0I7QUFDRCxTQUZELE1BR0k7QUFDRiwyQkFBaUIsUUFBakIsQ0FBMEIsUUFBMUI7QUFDRDtBQUVGLE9BVEQ7QUFhRDtBQUNGO0FBM0VrQixDQUFyQjs7UUErRUUsYyxHQUFBLGMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBiYWNrX3RvX3RvcCA9IHtcbiAgaW5pdDogZnVuY3Rpb24oKXtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XG4gICAgICAvKiBUT0RPOiBMZWdhY3kgc2NyaXB0LCByZXdyaXRlIHdpdGggalF1ZXJ5LiAqL1xuICAgICAgdmFyIGJhY2tUb1RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrLXRvLXRvcCcpLFxuICAgICAgICAgIGRvY3VtZW50U2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMDtcblxuICAgICAgaWYgKGRvY3VtZW50U2Nyb2xsVG9wID4gKHNjcmVlbi5oZWlnaHQvMikpe1xuICAgICAgICBiYWNrVG9Ub3AuY2xhc3NMaXN0LmFkZCgnc2xpZGUtdXAnKTtcbiAgICAgICAgYmFja1RvVG9wLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlLWRvd24nKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGJhY2tUb1RvcC5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZS11cCcpO1xuICAgICAgICBiYWNrVG9Ub3AuY2xhc3NMaXN0LmFkZCgnc2xpZGUtZG93bicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIGJhY2tfdG9fdG9wXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIHVuc2hpZnRfZWxlbWVudHMoc2hpZnRlZF9lbHMpe1xuICBpZiAoc2hpZnRlZF9lbHMubGVuZ3RoID4gMCl7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChzaGlmdGVkX2VscywgZnVuY3Rpb24oZWwsIGluZGV4KSB7XG4gICAgICBzZXRUaW1lb3V0KFxuICAgICAgICBmdW5jdGlvbigpe1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaWZ0ZWQnKTtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd1bnNoaWZ0ZWQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgNTUgKiBpbmRleCAqIGluZGV4KTtcbiAgICB9KTtcbiAgfSAgXG59XG5cbmV4cG9ydCB7XG4gIHVuc2hpZnRfZWxlbWVudHNcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qXG4gIExhenkgTG9hZCBJbWFnZXMgd2l0aG91dCBqUXVlcnlcbiAgaHR0cDovL2thaXphdS5naXRodWIuY29tL0xhenktTG9hZC1JbWFnZXMtd2l0aG91dC1qUXVlcnkvXG4gIE9yaWdpbmFsIGJ5IE1pa2UgUHVsYXNraSAtIGh0dHA6Ly93d3cubWlrZXB1bGFza2kuY29tXG4gIE1vZGlmaWVkIGJ5IEthaSBaYXUgLSBodHRwOi8va2FpemF1LmNvbVxuKi9cblxuZnVuY3Rpb24gbGF6eUxvYWRlckZuKCkge1xuICB2YXIgYWRkRXZlbnRMaXN0ZW5lciA9ICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCBmdW5jdGlvbihuLGYpIHsgd2luZG93LmF0dGFjaEV2ZW50KCdvbicrbiwgZik7IH0sXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyID0gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgfHwgZnVuY3Rpb24obixmLGIpIHsgd2luZG93LmRldGFjaEV2ZW50KCdvbicrbiwgZik7IH07XG5cbiAgLy8gRm9yIElFNyBjb21wYXRpYmlsaXR5XG4gIC8vIEFkYXB0ZWQgZnJvbSBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnL2pzL2ZpbmRwb3MuaHRtbFxuICBmdW5jdGlvbiBnZXRPZmZzZXRUb3AoZWwpIHtcbiAgICB2YXIgdmFsID0gMDtcbiAgICBpZiAoZWwub2Zmc2V0UGFyZW50KSB7XG4gICAgICBkbyB7XG4gICAgICAgIHZhbCArPSBlbC5vZmZzZXRUb3A7XG4gICAgICB9IHdoaWxlIChlbCA9IGVsLm9mZnNldFBhcmVudCk7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgfSAgICAgIFxuXG4gIHZhciBsYXp5TG9hZGVyID0ge1xuICAgIGNhY2hlOiBbXSxcbiAgICBtb2JpbGVTY3JlZW5TaXplOiA1MDAsXG4gICAgLy90aW55R2lmOiAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFBQUFBQ0g1QkFFS0FBRUFMQUFBQUFBQkFBRUFBQUlDVEFFQU93PT0nLFxuXG4gICAgYWRkT2JzZXJ2ZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxhenlMb2FkZXIudGhyb3R0bGVkTG9hZCk7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBsYXp5TG9hZGVyLnRocm90dGxlZExvYWQpO1xuICAgIH0sXG5cbiAgICByZW1vdmVPYnNlcnZlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGF6eUxvYWRlci50aHJvdHRsZWRMb2FkLCBmYWxzZSk7XG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBsYXp5TG9hZGVyLnRocm90dGxlZExvYWQsIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgdGhyb3R0bGVUaW1lcjogbmV3IERhdGUoKS5nZXRUaW1lKCksXG5cbiAgICB0aHJvdHRsZWRMb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGlmICgobm93IC0gbGF6eUxvYWRlci50aHJvdHRsZVRpbWVyKSA+PSAyMDApIHtcbiAgICAgICAgbGF6eUxvYWRlci50aHJvdHRsZVRpbWVyID0gbm93O1xuICAgICAgICBsYXp5TG9hZGVyLmxvYWRWaXNpYmxlSW1hZ2VzKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGxvYWRWaXNpYmxlSW1hZ2VzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICB2YXIgcGFnZUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgdmFyIHJhbmdlID0ge1xuICAgICAgICBtaW46IHNjcm9sbFkgLSAyMDAsXG4gICAgICAgIG1heDogc2Nyb2xsWSArIHBhZ2VIZWlnaHQgKyAyMDBcbiAgICAgIH07XG5cbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHdoaWxlIChpIDwgbGF6eUxvYWRlci5jYWNoZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGltYWdlID0gbGF6eUxvYWRlci5jYWNoZVtpXTtcbiAgICAgICAgdmFyIGltYWdlUG9zaXRpb24gPSBnZXRPZmZzZXRUb3AoaW1hZ2UpO1xuICAgICAgICB2YXIgaW1hZ2VIZWlnaHQgPSBpbWFnZS5oZWlnaHQgfHwgMDtcblxuICAgICAgICBpZiAoKGltYWdlUG9zaXRpb24gPj0gcmFuZ2UubWluIC0gaW1hZ2VIZWlnaHQpICYmIChpbWFnZVBvc2l0aW9uIDw9IHJhbmdlLm1heCkpIHtcbiAgICAgICAgICB2YXIgbW9iaWxlU3JjID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYy1tb2JpbGUnKTtcblxuICAgICAgICAgIC8vIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKC8oXnxcXHMrKWxhenktbG9hZChcXHMrfCQpLywgJyQxbGF6eS1sb2FkZWQkMicpO1xuICAgICAgICAgIC8vIH07XG4vLyAgICAgICAgVGVtcG9yYXJ5IGZpeCBmb3IgU2FmYXJpIVxuXG4gICAgICAgICAgaW1hZ2UuY2xhc3NOYW1lID0gaW1hZ2UuY2xhc3NOYW1lLnJlcGxhY2UoLyhefFxccyspbGF6eS1sb2FkKFxccyt8JCkvLCAnJDFsYXp5LWxvYWRlZCQyJyk7XG5cblxuICAgICAgICAgIGlmIChtb2JpbGVTcmMgJiYgc2NyZWVuLndpZHRoIDw9IGxhenlMb2FkZXIubW9iaWxlU2NyZWVuU2l6ZSkge1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gbW9iaWxlU3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IGltYWdlLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpbWFnZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG4gICAgICAgICAgaW1hZ2UucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYy1tb2JpbGUnKTtcblxuICAgICAgICAgIGxhenlMb2FkZXIuY2FjaGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSsrO1xuICAgICAgfVxuXG4gICAgICBpZiAobGF6eUxvYWRlci5jYWNoZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbGF6eUxvYWRlci5yZW1vdmVPYnNlcnZlcnMoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBQYXRjaCBJRTctIChxdWVyeVNlbGVjdG9yQWxsKVxuICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgICAgIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgICAgICAgICAgICAgaGVhZCA9IGRvYy5kb2N1bWVudEVsZW1lbnQuZmlyc3RDaGlsZCxcbiAgICAgICAgICAgICAgc3R5bGVUYWcgPSBkb2MuY3JlYXRlRWxlbWVudCgnU1RZTEUnKTtcbiAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcbiAgICAgICAgICBkb2MuX19xc2FlbHMgPSBbXTtcbiAgICAgICAgICBzdHlsZVRhZy5zdHlsZVNoZWV0LmNzc1RleHQgPSBzZWxlY3RvciArICd7eDpleHByZXNzaW9uKGRvY3VtZW50Ll9fcXNhZWxzLnB1c2godGhpcykpfSc7XG4gICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIDApO1xuICAgICAgICAgIHJldHVybiBkb2MuX19xc2FlbHM7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiBfbGF6eUxvYWRlckluaXQoKSB7XG4gICAgICAgIHZhciBpbWFnZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nW2RhdGEtc3JjXScpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1hZ2VOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBpbWFnZU5vZGUgPSBpbWFnZU5vZGVzW2ldO1xuXG4gICAgICAgICAgLy8gQWRkIGEgcGxhY2Vob2xkZXIgaWYgb25lIGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgICAvL2ltYWdlTm9kZS5zcmMgPSBpbWFnZU5vZGUuc3JjIHx8IGxhenlMb2FkZXIudGlueUdpZjtcblxuICAgICAgICAgIGxhenlMb2FkZXIuY2FjaGUucHVzaChpbWFnZU5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGF6eUxvYWRlci5hZGRPYnNlcnZlcnMoKTtcbiAgICAgICAgbGF6eUxvYWRlci5sb2FkVmlzaWJsZUltYWdlcygpO1xuXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBfbGF6eUxvYWRlckluaXQsIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGF6eUxvYWRlcjtcbn1cblxuZXhwb3J0IHtsYXp5TG9hZGVyRm59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW51X3RvZ2dsZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24oKXtcbiAgICB2YXIgJGJvZHkgPSAkKCdib2R5JyksXG4gICAgICAgICRtZW51X3RvZ2dsZSA9ICQoJyNtZW51LXRvZ2dsZScpO1xuXG4gICAgJCgnI21lbnUtaWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgIHZhciAkbWVudV9pY29uID0gJG1lbnVfaWNvbiB8fCAkKCcjbWVudS1pY29uJyk7XG5cbiAgICAgIGNvbnNvbGUubG9nKCRtZW51X3RvZ2dsZSk7XG5cbiAgICAgIGlmICgkKCcjbWVudS10b2dnbGUnKS5pcygnOmNoZWNrZWQnKSA9PT0gdHJ1ZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCcxJyk7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XG4gICAgICAgICRtZW51X2ljb24uaHRtbCgn4piwJykucmVtb3ZlQ2xhc3MoJ21yLTMgbXQtMCcpO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coJzAnKTsgICAgICBcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdtZW51LW9wZW4nKTsgICAgICBcbiAgICAgICAgJG1lbnVfaWNvbi5odG1sKCfDlycpLmFkZENsYXNzKCdtci0zIG10LTAnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBtZW51X3RvZ2dsZVxufTtcblxuXG5cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbiQgPSBqUXVlcnkubm9Db25mbGljdCh0cnVlKTtcblxuaW1wb3J0IHttZW51X3RvZ2dsZX0gZnJvbSBcIi4vbWVudS10b2dnbGUuanNcIjtcbmltcG9ydCB7YmFja190b190b3B9IGZyb20gXCIuL2JhY2stdG8tdG9wLmpzXCI7XG5pbXBvcnQge2JvdF9zdWJtaXNzaW9ufSBmcm9tIFwiLi9zdWJtaXQteW91ci1ib3QuanNcIjtcblxuLyogVE9ETzogTGVnYWN5IGNvZGUsIG5lZWRzIGEgY2xlYW51cC4gKi9cblxuaW1wb3J0IHtzbW9vdGhfc2Nyb2xsX2ZufSBmcm9tIFwiLi9zbW9vdGgtc2Nyb2xsLmpzXCI7XG5pbXBvcnQge3Vuc2hpZnRfZWxlbWVudHN9IGZyb20gXCIuL2hlbHBlcnMuanNcIjtcbmltcG9ydCB7bGF6eUxvYWRlckZufSBmcm9tIFwiLi9sYXp5LWxvYWQtaW1hZ2VzLmpzXCI7XG5cbi8qIEVORCBUT0RPICovXG5cblxuJChmdW5jdGlvbigpIHtcbiAgbWVudV90b2dnbGUuaW5pdCgpO1xuICBiYWNrX3RvX3RvcC5pbml0KCk7XG4gIGJvdF9zdWJtaXNzaW9uLmluaXQoKTtcblxuXG5cblxuXG5cblxuICAvKiBUT0RPOiBMZWdhY3kgY29kZSwgbmVlZHMgYSBjbGVhbnVwLiAqL1xuXG4gIHZhciBhcnRpY2xlSW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nLndwLXBvc3QtaW1hZ2UnKTtcbiAgXG4gIGZvciAodmFyIGkgPSAwLCBqID0gYXJ0aWNsZUltYWdlcy5sZW5ndGg7IGkgPCBqOyBpKyspe1xuICAgIGFydGljbGVJbWFnZXNbaV0uZGF0YXNldC5zcmMgPSBhcnRpY2xlSW1hZ2VzW2ldLnNyYztcbiAgICAvLyBhcnRpY2xlSW1hZ2VzW2ldLmNsYXNzTGlzdC5hZGQoJ2xhenktbG9hZCcpO1xuICB9XG5cbiAgdW5zaGlmdF9lbGVtZW50cyhkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaGlmdGVkJykpO1xuICBzbW9vdGhfc2Nyb2xsX2ZuKCk7XG4gIGxhenlMb2FkZXJGbigpLmluaXQoKTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxuICBodHRwczovL2dpdGh1Yi5jb20vYWxpY2VsaWV1dGllci9zbW9vdGhTY3JvbGxcbiAgTW9kaWZpZWQgYnkgU3RlZmFuIEJvaGFjZWsgdG8gdXNlIHRoZSBIVE1MNSBIaXN0b3J5IEFQSS5cbiovXG5mdW5jdGlvbiBzbW9vdGhfc2Nyb2xsX2ZuKCl7XG4gIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgPT09IHZvaWQgMCB8fCB3aW5kb3cucGFnZVlPZmZzZXQgPT09IHZvaWQgMCB8fCBoaXN0b3J5LnB1c2hTdGF0ZSA9PT0gdm9pZCAwKSB7IHJldHVybjsgfVxuXG4gIHZhciBnZXRUb3AgPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cbiAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgPT09ICdIVE1MJyl7XG4gICAgICAgIHJldHVybiAtd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB9O1xuICB2YXIgZWFzZUluT3V0Q3ViaWMgPSBmdW5jdGlvbiAodCkgeyByZXR1cm4gdDwwLjUgPyA0KnQqdCp0IDogKHQtMSkqKDIqdC0yKSooMip0LTIpKzE7IH07XG4gIHZhciBwb3NpdGlvbiA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIGVsYXBzZWQsIGR1cmF0aW9uKSB7XG4gICAgICBpZiAoZWxhcHNlZCA+IGR1cmF0aW9uKXtcbiAgICAgICAgcmV0dXJuIGVuZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGFydCArIChlbmQgLSBzdGFydCkgKiBlYXNlSW5PdXRDdWJpYyhlbGFwc2VkIC8gZHVyYXRpb24pOyAvLyA8LS0geW91IGNhbiBjaGFuZ2UgdGhlIGVhc2luZyBmdW50aW9uIHRoZXJlXG4gIH07XG4gIHZhciBzbW9vdGhTY3JvbGwgPSBmdW5jdGlvbihlbCwgZHVyYXRpb24sIGNhbGxiYWNrKXtcbiAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gfHwgNTAwO1xuICAgICAgdmFyIHN0YXJ0ID0gd2luZG93LnBhZ2VZT2Zmc2V0LFxuICAgICAgICAgIGVuZDtcbiAgICAgIGlmICh0eXBlb2YgZWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGVuZCA9IHBhcnNlSW50KGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuZCA9IGdldFRvcChlbCkgLSA1MDtcbiAgICAgIH1cbiAgICAgIHZhciBjbG9jayA9IERhdGUubm93KCk7XG4gICAgICB2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgIGZ1bmN0aW9uKGZuKXt3aW5kb3cuc2V0VGltZW91dChmbiwgMTUpO307XG4gICAgICB2YXIgc3RlcCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gY2xvY2s7XG4gICAgICAgICAgd2luZG93LnNjcm9sbCgwLCBwb3NpdGlvbihzdGFydCwgZW5kLCBlbGFwc2VkLCBkdXJhdGlvbikpO1xuICAgICAgICAgIGlmIChlbGFwc2VkID4gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICAgIH1cbiAgICAgIH07XG4gICAgICBzdGVwKCk7XG4gIH07XG4gIHZhciBsaW5rSGFuZGxlciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGhhc2ggPSB0aGlzLmhhc2guc3Vic3RyaW5nKDEpO1xuICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSl7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsICcjJyArIGhhc2gpO1xuICAgICAgfVxuICAgICAgc21vb3RoU2Nyb2xsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpLCA1MDAsIGZ1bmN0aW9uKGVsKSB7XG4gICAgICB9KTtcbiAgfTtcbiAgdmFyIGludGVybmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKSwgYTtcbiAgZm9yKHZhciBpPWludGVybmFsLmxlbmd0aDsgYT1pbnRlcm5hbFstLWldOyl7XG4gICAgICBhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaW5rSGFuZGxlciwgZmFsc2UpO1xuICB9XG5cbiAgaWYod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzbW9vdGhTY3JvbGwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQod2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpKSwgMjAwLCBmdW5jdGlvbihlbCl7fSk7ICAgICAgXG4gICAgfSwgMzAwKTtcbiAgfVxuXG5cbiAgcmV0dXJuIHNtb290aFNjcm9sbDtcbn1cblxuZXhwb3J0IHtzbW9vdGhfc2Nyb2xsX2ZufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYm90X3N1Ym1pc3Npb24gPSB7XG4gIGluaXQ6IGZ1bmN0aW9uKCl7XG4gICAgdmFyICRib2R5ID0gJCgnYm9keScpO1xuICAgIGlmICgkYm9keS5oYXNDbGFzcygncGFnZS10ZW1wbGF0ZS10ZW1wbGF0ZS1zdWJtaXQteW91ci1ib3QnKSl7XG5cbiAgICAgICQoJyN0ZXN0JykuY2xpY2soZnVuY3Rpb24oZXYpe1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQoJyNhZGQtYXV0aG9yLWZpZWxkcycpLmJlZm9yZSgnPGRpdiBjbGFzcz1cImF1dGhvci1maWVsZHMgZm9ybS1yb3dcIj48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2wtbWQtNlwiPjxsYWJlbCBmb3I9XCJhdXRob3ItJHtuZXdfaWR9LW5hbWVcIj5BdXRob3JcXCdzIG5hbWU8L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJhdXRob3ItMi1uYW1lXCIgbmFtZT1cImF1dGhvci1uYW1lc1tdXCIgcGxhY2Vob2xkZXI9XCJBdXRob3JcIj48L2Rpdj48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2wtbWQtNlwiPjxsYWJlbCBmb3I9XCJhdXRob3ItMi11cmxcIj5BdXRob3JcXCdzIFVSTDwvbGFiZWw+PGlucHV0IHR5cGU9XCJ1cmxcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiYXV0aG9yLTItdXJsXCIgbmFtZT1cImF1dGhvci11cmxzW11cIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vdHdpdHRlci5jb20vYXV0aG9yXCI+PC9kaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgJCgnI2JvdC1uYW1lJykudmFsKCdAY29vbGJvdCcpO1xuICAgICAgICAkKCcjYXV0aG9yLTEtbmFtZScpLnZhbCgnU3RlZmFuJyk7XG4gICAgICAgICQoJyNhdXRob3ItMS11cmwnKS52YWwoJ2h0dHBzOi8vdHdpdHRlci5jb20vZm91cnRvbmZpc2gnKTtcbiAgICAgICAgJCgnI2F1dGhvci0yLW5hbWUnKS52YWwoJ0pvaG4gRG9lJyk7XG4gICAgICAgIC8vICQoJyNhdXRob3ItMi11cmwnKS52YWwoJ2h0dHBzOi8vdHdpdHRlci5jb20vamQnKTtcbiAgICAgICAgJCgnI2JvdC1kZXNjcmlwdGlvbicpLnZhbCgnVGhpcyBib3QgZ2VuZXJhdGVzIHJhbmRvbSBpbWFnZXMuJyk7XG4gICAgICAgICQoJyNib3QtdXJscycpLnZhbCgnaHR0cHM6Ly90d2l0dGVyLmNvbS9jb29sYm90Jyk7XG4gICAgICAgICQoJyNib3QtdGFnbGluZScpLnZhbCgnVGhpcyBpcyBhIGNvb2wgYm90LicpO1xuICAgICAgICAkKCcjYm90LW5ldHdvcmtzJykudmFsKCc1Jyk7XG4gICAgICAgICQoJyNib3QtbmV0d29ya3MnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgJCgnI2JvdC10YWdzJykudmFsKFsnOTInLCAnNjQnLCAnNTUnXSk7XG4gICAgICAgICQoJyNib3QtdGFncycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJyNib3QtaXMtb3BlbnNvdXJjZScpLmNsaWNrKCk7XG5cbiAgICAgICAgJCgnI2JvdC1zb3VyY2UtdXJsJykudmFsKCdodHRwczovL2dpdGh1Yi5jb20vYm90d2lraS9ib3R3aWtpLm9yZycpO1xuICAgICAgICAkKCcjYm90LXNvdXJjZS1sYW5ndWFnZScpLnZhbCgnMjUnKTtcbiAgICAgICAgJCgnI2JvdC1zb3VyY2UtbGFuZ3VhZ2UnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQoJyNib3QtZm9ybS1zdWJtaXQnKS5vZmZzZXQoKS50b3AgLSA1MDBcbiAgICAgICAgfSwgNDUwKTtcblxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcuanMtc2VsZWN0MicpLmVhY2goZnVuY3Rpb24oaSl7XG4gICAgICAgICQodGhpcykuc2VsZWN0Mih7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6ICQodGhpcykuYXR0cigncGxhY2Vob2xkZXInKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG5cbiAgICAgICQoJyNzdWJtaXQtYm90LWZvcm0nKS5zdWJtaXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI2JvdC1mb3JtLXN1Ym1pdCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJykuaHRtbCgnUGxlYXNlIHdhaXQuLi4nKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcjYWRkLWF1dGhvci1maWVsZHMnKS5jbGljayhmdW5jdGlvbihldil7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIG5ld19pZCA9ICQoJy5hdXRob3ItZmllbGRzJykubGVuZ3RoICsgMTtcblxuICAgICAgICAkKHRoaXMpLmJlZm9yZShgPGRpdiBjbGFzcz1cImF1dGhvci1maWVsZHMgZm9ybS1yb3dcIj48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2wtbWQtNlwiPjxsYWJlbCBmb3I9XCJhdXRob3ItJHtuZXdfaWR9LW5hbWVcIj5BdXRob3IncyBuYW1lPC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiYXV0aG9yLSR7bmV3X2lkfS1uYW1lXCIgbmFtZT1cImF1dGhvci0ke25ld19pZH0tbmFtZVwiIHBsYWNlaG9sZGVyPVwiQXV0aG9yXCI+PC9kaXY+PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLW1kLTZcIj48bGFiZWwgZm9yPVwiYXV0aG9yLSR7bmV3X2lkfS11cmxcIj5BdXRob3IncyBVUkw8L2xhYmVsPjxpbnB1dCB0eXBlPVwidXJsXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImF1dGhvci0ke25ld19pZH0tdXJsXCIgbmFtZT1cImF1dGhvci0ke25ld19pZH0tdXJsXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL3R3aXR0ZXIuY29tL2F1dGhvclwiPjwvZGl2PjwvZGl2PmApO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgJGJvdF9zb3VyY2VfaW5mbyA9ICQoJyNib3Qtc291cmNlLWluZm8nKTtcbiAgICAgICRib3Rfc291cmNlX2luZm8uYWRkQ2xhc3MoJ2Qtbm9uZScpO1xuXG4gICAgICAkKCcjYm90LWlzLW9wZW5zb3VyY2UnKS5jbGljayhmdW5jdGlvbihldil7XG5cbiAgICAgICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpe1xuICAgICAgICAgICRib3Rfc291cmNlX2luZm8ucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgJGJvdF9zb3VyY2VfaW5mby5hZGRDbGFzcygnZC1ub25lJyk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cblxuXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7XG4gIGJvdF9zdWJtaXNzaW9uXG59O1xuXG5cblxuXG4iXX0=
