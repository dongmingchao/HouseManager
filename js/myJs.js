function login() {
    var remotePasswd = document.getElementsByName('passwd')[0].value;
    var remoteAccount = document.getElementsByName('account')[0].value;
    var forlogin = new XMLHttpRequest();
    forlogin.open('POST', 'login', true);
    forlogin.send("account=" + remoteAccount + "&passwd=" + remotePasswd);
    forlogin.onreadystatechange = () => {
        if (forlogin.status == 200 && forlogin.readyState == 4) {
            if (forlogin.responseText == "NoThisGuy") {
                var acc = document.getElementsByName('account')[0];
                acc.setAttribute('data-toggle', 'popover');
                acc.setAttribute('data-placement', 'right');
                acc.setAttribute('data-container', 'body');
                acc.setAttribute('data-content', '此用户不存在，请检查您的用户名');
                $(function () {
                    $("[data-toggle='popover']").popover('show');
                    setTimeout(
                        function () {
                            $("[name='account']").popover('destroy');
                        }, 2000);
                })
            } else if (forlogin.responseText == "PassWordNotCorrect") {
                var ps = document.getElementsByName('passwd')[0];
                ps.setAttribute('data-toggle', 'popover');
                ps.setAttribute('data-placement', 'right');
                ps.setAttribute('data-container', 'body');
                ps.setAttribute('data-content', '密码不正确');
                $(function () {
                    $("[name='passwd']").popover('show');
                    setTimeout(
                        function () {
                            $("[data-toggle='popover']").popover('destroy');
                        }, 2000);
                })
            } else {
                window.location="department.html";
            }
        }
    }
}

//类似手机的Toast,结合Label使用
$('.toast').css({
    left: ($(window).width() - $('.toast').outerWidth()) / 2,
});
$(document).ready(function () {
    $("#run").click(function () {
        var toast = $(".toast");
        toast.animate({
            bottom: '+=100px',
            opacity: 1,
        }, 0, function () {
            toast.css({'transform': 'rotate(0deg)'});
        });
    });
});