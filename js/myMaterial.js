//提供函数
$.card = {
    // aim参数建议为card_tit
    setBG: function (aim, path, scaleW, scaleH) {
        getimgSize(path, function (w, h) {
            var target = $(aim);
            target.css('background', 'url(' + path + ') center/cover');
            target.css('height', h * scaleH);
            target.parent().css('width', w * scaleW);
        });
    }
};
//全局操作
$(function () {
    $(".hideScroll").css('width', $('.hideScroll').width() + 18 + 'px');
    $(".hideScroll").parent().css('overflow-x', 'hidden');
    $('.drop').data('state','off');
    if ($('.drawer-icon')) {
        var cur = $('<div></div>').addClass('curtain');
        cur.click(function () {
            $(".drawer").addClass('drawer-hide');
            cur.removeClass('curtain-down');
        });
        $("body").prepend(cur);
    }
    if ($(".switch"))
        $(".switch").append($("<div>").addClass('switch_cir'));
});
$(window).resize(function () {
    $(".card").css('max-width', $(window).width() - 30);
});

//js语法
function getimgSize(url, callback) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        callback(img.width, img.height);
    } else {
        img.onload = function () {
            callback(img.width, img.height);
        }
    }
}

//控件操作
$('.btn-icon:has(.icon-share)').click(function () {
    if ($(this).parent().hasClass('card_menu')) {
        $(this).animate({
            width: '0px',
            height: '0px',
            pointerEvents: 'none'
        });
        for (var i = 0; i < $(this).nextAll().length; i++) {
            var target = $(this).nextAll().eq(i);
            target.css('transform', 'rotate(-' + 90 * i + 'deg)');
            target.css('opacity', '1');
            target.css('right', 56 * i + 'px'); //按钮列表间距
            target.css('pointer-events', 'auto');
        }
    }
});
/*
取消按钮的动画配置：大小，旋转角度
 */
$('.btn-icon:has(.cancel)').click(function () {
    if ($(this).parent().hasClass('card_menu')) {
        $(this).prev().animate({
            width: '56px',
            height: '56px',
            pointerEvents: 'auto'
        });
        var ehide = $(this).parent().children('.hide');
        for (var i = 0; i < ehide.length; i++) {
            var target = ehide.eq(i);
            target.css('transform', 'rotate(' + 90 * (i - 1) + 'deg)');
            target.css('opacity', '0');
            target.css('right', '4px');
            target.css('pointer-events', 'none');
        }
    }
});
$('.ripple').click(function (e) {
    e = e || window.event;
    _x = e.pageX || e.clientX + document.body.scroolLeft;
    _y = e.pageY || e.clientY + document.body.scrollTop;
    var anew = $('<div>');
    anew.addClass('ripple-animate');
    anew.css('left', _x - $(this).offset().left + 'px');
    anew.css('top', _y - $(this).offset().top + 'px');
    $(this).append(anew);
    anew.animate({
        left: '-=78px',
        top: '-=78px',
        width: '156px',
        height: '156px',
        opacity: '0'
    }, function () {
        anew.remove();
    });
});
$('.drawer-icon').click(function () {
    $(".drawer").removeClass('drawer-hide');
    $(".curtain").addClass('curtain-down');
});
$(".drop").prev(".item").click(function () {
    var icon = false;
    if($(this).children('.icon-triple')) icon = true;
    var p = $(this).next('.drop');
    if (p.data('state') == 'on') {
        p.height(0);
        p.css('overflow','hidden');
        p.data('state', 'off');
        if (icon) $(this).children('.icon-triple').css('transform','rotate(0deg)');
    } else {
        p.data('state', 'on');
        p.css('overflow','scroll');
        p.height(menuHeight(p));
        if (icon) $(this).children('.icon-triple').css('transform','rotate(-90deg)');
    }
});

function menuHeight(menu) {
    var allheight = 0;
    menu.children().each(function () {
        allheight += $(this).height() + eval($(this).css('padding-top').split("px")[0]) + eval($(this).css('padding-bottom').split("px")[0]);
    });
    return allheight;
}

$(".switch").click(function () {
    var cir = $(this).children('.switch_cir');
    if (cir.data('state') == 'on') {
        cir.data('state', 'off');
        cir.css('left', '-3px');
        cir.css('background-color', 'rgb(250,250,250)');
        $(this).css('background-color', 'rgba(0,0,0, 0.26)');
    } else {
        cir.data('state', 'on');
        cir.css('left', '21px');
        cir.css('background-color', 'rgb(63,81,181)');
        $(this).css('background-color', 'rgba(63,81,181, 0.5)');
    }
});
