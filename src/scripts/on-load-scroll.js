$(function() {
  'use strict';
  if (window.location.hash) {
    if ($('.twitter-tweet').length > 0){
      $('.twitter-tweet-rendered').waitUntilExists(function(){
        $('html, body').animate({
          scrollTop: $(window.location.hash).offset().top - 20
        });
      });
    }
  }
});