$(function(){

    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;


    if (Sys.ie) {

//        $('span.a').text(Sys.ie);

        var browserie = Sys.ie;//$('span.a').text();

        if (browserie <= 10.0) {

            var modal = $('[data-modal-id="browser-detect"]')

            modal.addClass('is-open')
            $('html, body').addClass('overlay-open');
        }
    }

    $("[role='browserDetectModal']").click(function (e) {
        if ($(e.target).hasClass('modal')) {
            $(this).removeClass('is-open')
            $('html, body').removeClass('overlay-open')
        }
    }).end().find('[role="close"]').click(function () {
        $(this).parents('.modal').removeClass('is-open')
        $('html, body').removeClass('overlay-open')
    })



});
