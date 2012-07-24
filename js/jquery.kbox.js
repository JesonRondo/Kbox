/*
 * @author longzhou
 * demo 
 *      $(document).openKbox($dom, {
 *          title:  "测试弹出框",
 *          width:  450,
 *          height: 300
 *      });
 *
 *      $(document).animateKbox($dom2, {
 *          title: "测试",
 *          width:  250,
 *          height: 200
 *      });
 *
 *      $(document).closeKbox();
 */

(function($) {
    $.fn.openKbox = function($dom, options) {
        var settings = $.extend({
            title    : "",        // 弹出框标题
            width    : 400,       // 弹出框默认宽度
            height   : 200,       // 弹出框默认高度
            callback : null       // 关闭时回调函数
        }, options);
        
        var closeBox = function() {
            if (settings.callback !== null) {
                try {
                    settings.callback();
                } catch (e) {
                
                }
            }
            
            $(".kboxmask, .kboxcnt").fadeOut("fast", function() {
                $(".kboxmask, .kboxcnt").remove();
            });
        };
        
        var randerBox = function() {
            var $box = '<div class="kboxmask"></div>'
                     + '<div class="kboxcnt">'
                     + '<div class="kboxheader">'
                     + '<h5 class="singleline">' + settings.title + '</h5>'
                     + '<a href="javascript:void(0);" class="kboxclose" hidefocus="true">×</a>'
                     + '</div>'
                     + '<div class="kboxinfo">'
                     + $dom
                     + '</div>'
                     + '</div>';
            
            
            $(".kboxclose, .kboxmask").die("click").live("click", function() {
                closeBox();
            });
            
            $("body").append($box);
            $(".kboxcnt, .kboxmask").css("opacity", 0);
            $(window).resize(function() {
                var winHeight = $(window).height();
                var docHeight = $(document).height();
                var docWidth  = $(document).width();
                
                $(".kboxmask").css({
                    "height": (winHeight > docHeight ? winHeight : docHeight) + "px",
                    "width" : docWidth + "px"
                });
            }).resize();
            $(".kboxcnt").css({
                "width": settings.width + "px",
                "height": settings.height + "px",
                "margin": "-" + settings.height/2 + "px 0 0 -" + settings.width/2 + "px"
            });
            
            $(".kboxmask").animate({
                "opacity": 0.2
            });
            $(".kboxcnt").animate({
                "opacity": 1
            });
        };
        
        return this.each(function() {
            if ($(".kboxcnt").length === 0) {
                randerBox();
            } else {
                return;
            }
        });
    };
    
    $.fn.animateKbox = function($dom, options) {
        var settings = $.extend({
            title    : $(".kboxheader:eq(0) h5").text(),          // 弹出框标题
            width    : $(".kboxcnt").css("width"),                // 弹出框默认宽度
            height   : $(".kboxcnt").css("height")                // 弹出框默认高度
        }, options);
        
        var animateBox = function() {
            $(".kboxheader:eq(0) h5").text(settings.title);
            
            $(".kboxinfo:eq(0)").html($dom);
            
            $(".kboxcnt").animate({
                "width": settings.width,
                "height": settings.height,
                "marginTop": -settings.height/2,
                "marginLeft": -settings.width/2
            });
        };
        
        return this.each(function() {
            animateBox();
        });
    };
    
    $.fn.closeKbox = function() {
        var closeBox = function() {
            $(".kboxmask, .kboxcnt").fadeOut("fast", function() {
                $(".kboxmask, .kboxcnt").remove();
            });
        };
        
        return this.each(function() {
            closeBox();
        });
    };
}(jQuery));
