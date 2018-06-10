if (typeof Object.create !== 'function') {
    Object.create = function (a) {
        function F() {
        };F.prototype = a;
        return new F()
    }
}

/*========================================================================================
 * AvertaScroll2top v1.02. | Copyright (c) averta | http://averta.net
 *========================================================================================*/
;(function ($) {
    var Scroll = {
        init: function (el, options) {
            //cache this
            var self = this;
            self.options = $.extend({}, $.fn.avertaScroll2top.defaultOptions, options || {});
            // Access to jQuery and DOM versions of element
            self.$el = $(el);
            self.el = el;

            self.setup();
        },
        setup: function () {
            var self = this;
            if (self.options.autoFade && (self.$el.data("autofade") != false)) self.autofade();
            self.$el.on("click", function () {
                $('body,html').animate({scrollTop: 0}, self.options.speed, self.options.ease);
                return false;
            });
        },
        autofade: function () {
            var self = this;
            //hide btn on init
            if (window.scrollY < self.options.offset) {
                self.$el.fadeOut(0);
            }
            $(window).scroll(function () {
                if ('pageXOffset' in window) {  // all browsers, except IE before version 9
                    var topOffset = window.pageYOffset;
                }
                else {      // Internet Explorer before version 9
                    var topOffset = document.documentElement.scrollTop;
                }
                if (topOffset > self.options.offset) {
                    self.$el.fadeIn(self.options.fadeDuration);
                } else {
                    self.$el.fadeOut(self.options.fadeDuration);
                }
            });
        }
    };

    $.fn.avertaScroll2top = function (options) {
        return this.each(function () {
            var scroll = Object.create(Scroll);
            scroll.init(this, options);
        });
    };

    $.fn.avertaScroll2top.defaultOptions = {
        speed: 200,                   // scroll duration in millisecond
        fadeDuration: 400,            // btn fade duration in millisecond
        ease: 'linear',              // scroll easing
        offset: 100,                  // the distance in pixel to autoFade the btn
        autoFade: true                // specify whether fade the element when scroll offset passed
    };
})(jQuery);

/* ================== init.superfish.js =================== */
;(function ($) {
    /*--------------------------------------------
     *   superfish menu init
     *--------------------------------------------*/
    function init_superfish(speed, delay, fade) {
        var animEff = {opacity: 'show', height: 'show'};
        if (fade) animEff.opacity = 'show';
        $('ul.sf-menu').superfish({
            delay: delay,    // one second delay on mouseout
            animation: animEff,  // fade-in and slide-down animation
            speed: speed,    // faster animation speed
            autoArrows: true,     // disable generation of arrow mark-up
            dropShadows: false     // disable drop shadows
        });
    }

    init_superfish('fast', 100, true);
})(jQuery);

/* ================== init.averta.js =================== */
;(function ($) {
    /*--------------------------------------------
     *  Averta plugins
     *--------------------------------------------*/
    $(".scroll2top").avertaScroll2top({ease: 'easeInOutQuint', speed: 800});
})(jQuery);

/* ================== click.js =================== */
;(function ($) {
    $('.nav-toggle').unbind('click')
        .bind('click', function (event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $('nav#access .sf-menu').animate({height: 'toggle'});
        });
})(jQuery);

// position callout button in safari
;(function ($) {
    if (!(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) return;
    var $callout = $('div.callout');
    var $btn = $callout.find('.featured_btn');
    var $label = $btn.find('span');

    function updateCalloutBtnPosition() {
        var topPos = ($btn.height() - $label.height()) * 0.5;
        $label.css('top', topPos);
    }

    updateCalloutBtnPosition();
    $(window).bind("resize", updateCalloutBtnPosition);
})(jQuery);

//提示消息框
function tip(options) {
    var conf = {
        html: "<div class=\"wj-tips\" id=\"__ID__\"><div class=\"box\"><div class=\"shade\"><\/div><p>__TEXT__<\/p><\/div><\/div>",
        text: '提示',
        url: '',
        reload: false,
        time: 3000,
        id: new Date().valueOf()
    };
    if (typeof options == "string") {
        conf.text = options;
    } else {
        conf = $.extend(conf, options);
    }

    $('body').append(conf.html.replace('__TEXT__', conf.text).replace('__ID__', conf.id));
    $('#' + conf.id).fadeIn(500);
    if (conf.url) {
        $.URL.url(conf.url);
        conf.reload = true;
    }
    setTimeout(function () {
        if (conf.reload) {
            $.URL.reload();
        } else {
            $('#' + conf.id).fadeOut(1000, null, function () {
                $(this).remove();
            });
        }
    }, conf.time);
}

//对浮点数格式化，防止出现0.99999998的现象(f为浮点数，size中保留小数位数)
function formatfloat(f, size) {
    var tf = f * Math.pow(10, size);
    tf = Math.round(tf + 0.000000001);
    tf = tf / Math.pow(10, size);
    return tf;
}

$.extend({
    loading: {
        imgsrc: "<div class=\"spinner\"><div class=\"rect1\"><\/div><div class=\"rect2\"><\/div><div class=\"rect3\"><\/div><div class=\"rect4\"><\/div><div class=\"rect5\"><\/div><\/div>",
        html: "<div id=\"jquery-loading\"><div class=\"shade\"><\/div><div class=\"loading-img\">__IMG_SRC__<\/div><p class=\"loading-text\"><\/p><\/div>",
        selector: '#jquery-loading',
        init: function () {
            this.hide();
            $('body').append(this.html.replace('__IMG_SRC__', this.imgsrc));
        },
        hide: function () {
            $(this.selector).length > 0 && $(this.selector).remove();
        },
        shade: function (timeout) {
            this.init();
            timeout = parseInt(timeout) || 0;
            if (timeout > 0) {
                setTimeout(function () {
                    $.loading.hide();
                }, timeout);
            }
        },
        text: function (loading_text, timeout) {
            this.shade(timeout);
            $(this.selector).children('.loading-img').show();
            $(this.selector).children('.loading-text').show().html(loading_text);
        }
    },
    tip: tip,
    formatfloat: formatfloat
});

$(function () {
    $(document).scroll(function () {
        var h = $(this).scrollTop(), selector = '#to-top', header = $('.column', '.header');
        if (h > 200) {
            header.slideUp('fast');
            if ($(selector).length == 0) {
                $('.container').append('<a id="to-top" class="to-top" href="javascript:;"></a>');
                $(selector).click(function () {
                    $("html,body").animate({scrollTop: 0}, 500);
                });
            }
            $(selector).show();
        } else {
            $(selector).hide();
            if (h == 0) {
                header.slideDown();
            }
        }
    });
    if (typeof $.fn.lazyload == 'function') {
        $("img.lazy").lazyload({
            effect: "show",
            threshold: 200
        });
    }
    //查看当前网速
    (function () {
        function getSpeed() {
            $('#fresh-net-speed').addClass('animate');
            var arr = [
                {
                    class_name: '',
                    text: '流畅(>__SPEED__K/秒)'
                },
                {
                    class_name: 'good',
                    text: '良好(>__SPEED__K/秒)'
                },
                {
                    class_name: 'common',
                    text: '普通(>__SPEED__K/秒)'
                },
                {
                    class_name: 'bad',
                    text: '拥挤(<__SPEED__K/秒)'
                },
                {
                    class_name: 'none',
                    text: '无网络'
                }
            ];
            var speedSum = 0;
            var index = 0;
            var total_count = 3;
            var loadImg = function () {
                var st = new Date(), img = new Image();
                img.src = 'https://ss3.bdstatic.com/iPoZeXSm1A5BphGlnYG/skin/54.jpg?' + Math.random();
                img.onload = function () {
                    var et = new Date();
                    speedSum += Math.round(200 * 1000 / (et - st));
                    index++;
                    total_count == index && calculate();
                };
                img.onerror = function () {
                    index++;
                    total_count == index && calculate();
                }
            };
            var calculate = function () {
                speedSum = parseInt(speedSum / total_count);
                var i = speedSum > 500 ? 0 : (speedSum > 200 ? 1 : (speedSum > 50 ? 2 : (speedSum > 0) ? 3 : 4));
                $('#net-speed').attr('class', arr[i]['class_name']).text(arr[i]['text'].replace('__SPEED__', speedSum));
                $('#fresh-net-speed').removeClass('animate');
            };
            for (var i = 0; i < total_count; i++) {
                loadImg();
            }
        }

        $('#fresh-net-speed').click(getSpeed);
        setTimeout(function () {
            getSpeed();
        }, 5000);
        setInterval(getSpeed, 600000);
    })();
    //动态显示时间
    (function () {
        function CurentTime() {
            if (typeof  current_serve_time == "undefined") {
                current_serve_time = undefined;
            }
            var now = new Date(current_serve_time);

            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日

            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();//秒

            var clock = year + "-";

            month < 10 && (clock += "0");
            clock += month + "-";

            day < 10 && (clock += "0");
            clock += day + " <span id='clock-hour'>";

            hh < 10 && (clock += "0");
            clock += hh + "</span>:<span id='clock-min'>";

            mm < 10 && (clock += '0');
            clock += mm + "</span>:<span id='clock-second'>";

            ss < 10 && (clock += '0');
            clock += ss + "</span>";
            $('#now-clock').html(clock);
        }

        CurentTime();

        function timeRun() {
            var h, m, s, hh, mm, ss;
            h = $('#clock-hour');
            m = $('#clock-min');
            s = $('#clock-second');

            hh = parseInt(h.text());
            mm = parseInt(m.text());
            ss = parseInt(s.text());
            var parse = function () {
                hh < 10 && (hh = "0" + hh);
                mm < 10 && (mm = "0" + mm);
                ss < 10 && (ss = "0" + ss);
                h.text(hh);
                m.text(mm);
                s.text(ss);
            };

            if (ss < 59) {
                ss++;
                parse();
                return false;
            }
            ss = 0;
            if (mm < 59) {
                mm++;
                parse();
                return false;
            }
            mm = 0;
            if (hh < 23) {
                hh++;
                parse();
            } else {
                CurentTime();
            }
        }

        setInterval(timeRun, 1000);
    })();
});

function currentNenu(id) {
    $('.sf-menu li').removeClass('current-menu-item');
    $('#' + id).addClass('current-menu-item');
}



