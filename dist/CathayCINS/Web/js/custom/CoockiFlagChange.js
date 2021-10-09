function setCookies(cname, cvalue, hours){
    var d = new Date();
    d.setTime(d.getTime() + (hours*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookies(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function coockieChange(cookieName) {
    var expiresDate = new Date;
    expiresDate = expiresDate.setDate(expiresDate.getDate() + 1);
    expiresDate = new Date(expiresDate);
    expiresDate = expiresDate.toGMTString();
    document.cookie = cookieName + "=1;path=/;expires =" + expiresDate;
}
//// system message lightbox trigger
var $systemMessageTriggerBtn = $('[data-target=".modal-layout-lightbox-1"]');
$(function () {

    var SMBtnClose = $('[data-close-btn-systemmessage]');
    var ClearCookieBtnClose = $('[role="clear-cookie-btn"]');
    var CMBtnClose = $('.btn.btn-outline-reverse.close');

    console.log("SMFirstTimeFlag",getCookies("SMFirstTimeFlag"));
    console.log("CMFirstTimeFlag",getCookies("CMFirstTimeFlag"));

    SMBtnClose.on('click.setCookie', function () {
        setCookies("SMFirstTimeFlag","Y",24);
    });

    CMBtnClose.on('click.setCookie', function () {
        setCookies("CMFirstTimeFlag","Y",24);
    });

    //alert(ClearCookieBtnClose.length);
    var ClearCookieBtnClose = $('[role="clear-cookie-btn"]');
    ClearCookieBtnClose.on('click.clearCookie', function () {
        alert("clear cookie complete");
        setCookies("CMFirstTimeFlag","N",24);
        setCookies("SMFirstTimeFlag","N",24);
    });


    if(getCookies("SMFirstTimeFlag")!="Y"){
       $systemMessageTriggerBtn.trigger('click');
    }
});
