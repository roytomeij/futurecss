jQuery.easing = {
 easeinout: function(x, t, b, c, d) {
  if (t < d/2) return 2*c*t*t/(d*d) + b;
  var ts = t - d/2;
  return -2*c*ts*ts/(d*d) + 2*c*ts/d + c/2 + b;
 },
 linear: function(x, t, b, c, d) {
  return c*t/d + b; //linear
 }
};

(function($) {
 $.extend($.fx.step,{
  backgroundPosition: function(fx) {
   if (fx.state === 0 && typeof fx.end == 'string') {
    var start = $.curCSS(fx.elem,'backgroundPosition');
    start = toArray(start);
    fx.start = [start[0],start[2]];
    var end = toArray(fx.end);
    fx.end = [end[0],end[2]];
    fx.unit = [end[1],end[3]];
   }
   var nowPosX = [];
   nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
   nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
   fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
   function toArray(strg){
    strg = strg.replace(/left|top/g,'0px');
    strg = strg.replace(/right|bottom/g,'100%');
    strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
    var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
    return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
   }
  }
 });
})(jQuery);

$(function() {

 /* Let CSS know JavaScript is on */
 $('html').addClass('js-enabled');

 /* Anti spam */
 $('#comment-spam').val('Nee').parent().hide();
 $('#signup-spam').val('Nee').parent().hide().prev().hide();
 $('.spam-check').val('Nee').parent().hide();

 /* Technical skills on signup form */
 $('#kunde input').click(function() {
  $(this).addClass('current').siblings().removeClass('selected current').end().prevAll().addClass('selected');
 });

 /* Original Lavalamp menu by Ganeshji Marwaha */
 var menu = $('#menu'), marker = $('<li class="marker"></li>').appendTo(menu), lis = $('li', menu), current = $('li.current', menu)[0] || $(lis[0]).addClass('current')[0], as = lis.not('.marker').find('a');
 if ($.browser.msie) {
  as.bind('mouseenter', function() {
   mark(this.parentNode);
  }).bind('mouseleave', function() {
   mark(current);
  });
 } else {
  as.mouseover(function() {
   mark(this.parentNode);
  }).mouseout(function() {
   mark(current);
  });
 }
 as.focus(function() {
  mark(this.parentNode);
 }).blur(function() {
  mark(current);
 });
 marker.css({'top': $(current).parent().parent() == menu ? current.offsetTop : current.offsetTop + current.parentNode.parentNode.offsetTop + 'px' });
 function mark(e) {
  try {
   if (marker.is(':visible')) {
    marker.dequeue().animate({'top': $(e).parent().parent() == menu ? e.offsetTop : e.offsetTop + e.parentNode.parentNode.offsetTop}, 600, 'easeinout');
   }
  } catch(e) {
   // No idea why Fx whines here..
  }
 }

 /* (Un)collapsable submenus */
 /*
 $('#submenu .collapse > ul').hide().prev().click(function() {
  $(this).next().slideToggle('fast');
 }).attr('tabindex', '0').addClass('collapsable');
 */

 /* Google Maps stuff */
 var mapContainers = $('div.google-maps');
 if (mapContainers.length && typeof(GBrowserIsCompatible) == 'function' && GBrowserIsCompatible()) {
  var mapContainer, address, map, geocoder, renderedMap;
  mapContainers.each(function() {
   mapContainer = $(this).addClass('google-maps-styled');
   address = mapContainer.find('a').html();
   map = $('<div class="map"></div>');
   mapContainer.prepend(map);
   renderedMap = new GMap2(map[0]);
   geocoder = new GClientGeocoder();
   geocoder.getLatLng(address, function(p) {
    if (p) {
     renderedMap.addControl(new GSmallMapControl());
     renderedMap.addControl(new GMapTypeControl());
     renderedMap.setCenter(p, 14);
     renderedMap.addOverlay(new GMarker(p));
    }
   });
  });
 }

 $('#student').click(function() {
  $(this).nextAll('span').toggle($(this).is(':checked'));
 }).each(function() {
  $(this).nextAll('span').toggle($(this).is(':checked'));
 });

 /*
 var pane = $('#pane div');
 if (!pane.is('.important')) {
  pane.hide();
  $('html').addClass('pane-closed');
 };
 pane.after('<p id="pull"><a href="#pane" title="In- / uitklappen"><span>In- / uitklappen</span></a></p>').next().find('a').click(function() {
  var heightOfPane = $('#pane div').height();
  if (pane.is(':hidden')) {
   $('#menu, #submenu').animate({top: 12.5 + heightOfPane / 10 + 'em'}, 'normal');
   $('#main').animate({marginTop: heightOfPane / 10 + 'em'}, 'normal');
   pane.slideDown('normal', function() {
    pane.find(':input:first').select().focus();
   });
  } else {
   $('#menu, #submenu').animate({top: '12.5em'}, 'normal');
   $('#main').animate({marginTop: '0'}, 'normal');
   pane.slideUp('normal', function() {
    $('html').addClass('pane-closed');
   });
  };
  return false;
 });
 */

 $('.transcript').delegate('p', 'click', function() {
  if (this.hasAttribute('data-start-seconds')) {
   var playAt = this.getAttribute('data-start-seconds') - 1;
   $('video')[0].currentTime = playAt;
  }
 }).prev('h3').append(' (click to jump to that part in the video)');

 /* IE hacks */
 if ($.browser.msie) {

  if ($.browser.version == 6) {
   try {
    document.execCommand('BackgroundImageCache', false, true);
   } catch(e) {}
  }

  /* :hover and :focus */
  $('input.text, textarea').bind('mouseenter', function() {
   $(this).addClass('hover');
  }).bind('mouseleave', function() {
   $(this).removeClass('hover');
  }).focus(function() {
   $(this).addClass('focus').removeClass('hover');
  }).blur(function() {
   $(this).removeClass('focus');
  });

 }

});
