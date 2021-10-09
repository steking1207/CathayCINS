var dashboard = dashboard || {};
dashboard.prototype = {
    scope: null,
    paste_box_id:"dashboard-paste-box",
    promotion_code:"",
    facebook_share_url:'https://ins.doinsane.co/share.html',
    share_url:'https://www.cathay-ins.com.tw/INSOCWeb/servlet/HttpDispatcher/OCH1_0200/prompt?inviteCode=gooaye',
    show: function () {

        if (this.getCookies(this.cookie_name) != this.cookie_value) {
            $('.modal', this.scope).addClass('show');
            $('html').addClass('has-modal');
            this.setCookies(this.cookie_name, this.cookie_value, this.cookie_live_hour);
        }

    },
    tap:function(a_target){
        let self = a_target;
        self.addClass('hover');
        setTimeout(
            function(){
                self.removeClass('hover')
            },200
        )
    },
    addEventListener: function () {
        let o = this;
        $('[role="copy-promotion-code-btn"]', this.scope).bind('click.copy-promotion-code', function () {
            o.copyPromotionCode();
        });


        $('[role="share-promotion-code-fb-btn"]', this.scope).unbind('click.share-promotion-code-fb').bind('click.share-promotion-code-fb', function () {
            o.shareToFacebook(o.facebook_share_url+"?code="+o.promotion_code);
        });
        $('[role="share-promotion-code-line-btn"]', this.scope).unbind('click.share-promotion-code-line').bind('click.share-promotion-code-line', function () {
            let share_ur ='https://www.cathay-ins.com.tw/INSOCWeb/servlet/HttpDispatcher/OCH1_0200/prompt?inviteCode=gooaye'+"&code="+o.promotion_code
            o.shareToLine(share_ur,'Hihi~在國泰產險用我的推薦碼註冊或投保,我們都能參加會員抽獎活動喔,快一起來試手氣吧!');
        });
    },
    shareToFacebook:function(a_url){
        if(a_url==undefined){
            return false;
        }
        let url = a_url
        window.open('http://facebook.com/sharer/sharer.php?u='+encodeURIComponent(url), '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    },
    shareToLine:function(a_url,a_title){
        if(a_url==undefined){
            return false;
        }
        let url = a_url
        let title = a_title;
        let link = "https://line.naver.jp/R/msg/text/?";

        link += encodeURIComponent(title) + "%0D%0A" + encodeURIComponent(url) +  encodeURIComponent('&openExternalBrowser=1');
        window.open(link);
        return false;
    },
    copyPromotionCode:function(){
        $('#'+this.paste_box_id).remove();
		$('<input id="'+this.paste_box_id+'" style="position:absolute;top:-500px;">').appendTo($('body'));
		var copyText = document.getElementById(this.paste_box_id);
        copyText.value = this.promotion_code;
		copyText.select();
        copyText.setSelectionRange(0, 99999);
		document.execCommand("Copy");
		$('#'+this.paste_box_id).remove();
		$('.c-dashboard-copied-dialog').addClass('show');
        setTimeout(function(){
            $('.c-dashboard-copied-dialog').addClass('leave');
        },1000);
        setTimeout(function(){
            $('.c-dashboard-copied-dialog').removeClass('show');
            $('.c-dashboard-copied-dialog').removeClass('leave');
        },2000);
    },
    init: function (a_scope) {
        this.scope = a_scope;
        this.promotion_code = $('[role="promotion-code-value"]',this.scope).eq(0).text();
        this.addEventListener();
        document.addEventListener("touchstart", function(){}, true);

    }
}


$(function(){
    //demo
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var string_length = 7;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    $('[role="promotion-code-value"]',this.scope).text(randomstring);
    //demo end


    var _dashboard = dashboard.prototype;
    _dashboard.init($('.c-dashboard'));
})
