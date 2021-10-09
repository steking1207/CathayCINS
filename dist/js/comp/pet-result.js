/**
 * @fileoverview syncscroll - scroll several areas simultaniously
 */
 !function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):"undefined"!=typeof exports?t(exports):t(e.syncscroll={})}(this,function(e){var t="scroll",n=Math.round,o={},l=function(){var e,l,r,i,s,c=document.getElementsByClassName("syncscroll");for(s in o)if(o.hasOwnProperty(s))for(e=0;e<o[s].length;e++)o[s][e].removeEventListener(t,o[s][e].syn,0);for(e=0;e<c.length;)if(i=l=0,s=(r=c[e++]).getAttribute("name")){for(r=r.scroller||r;l<(o[s]=o[s]||[]).length;)i|=o[s][l++]==r;i||o[s].push(r),r.eX=r.eY=0,function(e,l){e.addEventListener(t,e.syn=function(){var t,r=o[l],i=e.scrollLeft,s=e.scrollTop,c=i/(e.scrollWidth-e.clientWidth),f=s/(e.scrollHeight-e.clientHeight),d=i!=e.eX,h=s!=e.eY,a=0;for(e.eX=i,e.eY=s;a<r.length;)(t=r[a++])!=e&&(d&&n(t.scrollLeft-(i=t.eX=n(c*(t.scrollWidth-t.clientWidth))))&&(t.scrollLeft=i),h&&n(t.scrollTop-(s=t.eY=n(f*(t.scrollHeight-t.clientHeight))))&&(t.scrollTop=s))},0)}(r,s)}};"complete"==document.readyState?l():window.addEventListener("load",l,0),e.reset=l});


function petResult() {

    var scope;
    var window_w;
    var window_h;
    var addClass_random_id;

    var resize = function(){
        window_w = $(window).width();
        window_h = $(window).height();
        let mode;
        // let mode = detectOrientation()

        if(window_w>window_h){
            mode = 'landscape';
        }
        if(window_h > 600){
            mode = 'portrait';
        }

        switch(mode){
            case 'portrait':
                $('.c-view-reminder').removeClass('c-view-reminder--show');
            break;

            case 'landscape':
                $('.c-view-reminder').addClass('c-view-reminder--show');
            break;

        }


        let wrap = $(".c-pet-result-wrap",scope);
        let item = $(".c-pet-result-head .c-pet-result-head-item",scope);
        let item_length = item.length;
        let item_w;
        let wrap_w;
        if(window_w<1000){
            $('.c-pet-result-head',scope).addClass('sticky');
            $('.c-pet-result-cost',scope).addClass('sticky');
            ///////////////
            if(item_length>=3){
                item_w = window_w * .45;
                wrap_w = item_w * item_length
                $(".c-pet-result-inner",scope).css("overflow-x","scroll");
            }else{
                item_w =  "auto";
                wrap_w = "100%";
                $(".c-pet-result-inner",scope).css("overflow-x","hidden");
            }

        }else{
            $('.c-pet-result-head',scope).removeClass('sticky');
            $('.c-pet-result-cost',scope).removeClass('sticky');
            item_w = "auto";
            wrap_w = "auto";
            $(".c-pet-result-inner",scope).css("overflow-x","hidden");
        }

        item.css("width",item_w)
        wrap.css("width",wrap_w)
    }

    var obj1 = {}
    var obj2 = {}
    var obj3 = {}
    //
    var updateTotalAmount = function(){

        var totalPetExtra = 0;
        $('.c-pet-result-additional-item input[type="checkbox"]:checked',scope).each(function(){
            totalPetExtra += parseInt($(this).attr('data-value'));
        })

        var _target1 = $('#plan1DiscountPremium');
        var _target2 = $('#plan2DiscountPremium');
        var _target3 = $('#plan3DiscountPremium');
        //
        obj1.current_total =  parseInt(_target1.attr('data-total-value'));
        obj2.current_total =  parseInt(_target2.attr('data-total-value'));
        obj3.current_total =  parseInt(_target3.attr('data-total-value'));
        //
        var _start1 =  parseInt(_target1.attr('data-start-value'));
        var _start2 =  parseInt(_target2.attr('data-start-value'));
        var _start3 =  parseInt(_target3.attr('data-start-value'));
        //
        var _total1 = _start1 + totalPetExtra;
        var _total2 = _start2 + totalPetExtra;
        var _total3 = _start3 + totalPetExtra;

        // var np6AddtionalAmount = $('#np6AddtionalAmount').attr('data-value');
        // if('Y' != petExtra && !isEmpty(np6AddtionalAmount)) {
        //     _total1 = _total1 - parseInt(np6AddtionalAmount);
        //     _total2 = _total2 - parseInt(np6AddtionalAmount);
        //     _total3 = _total3 - parseInt(np6AddtionalAmount);
        // }

        TweenLite.to(obj1,.6,{current_total:_total1,onUpdate:function(){
            _target1.html('$'+UTILS.numberWithCommas(Math.round(obj1.current_total)));
        }});

        TweenLite.to(obj2,.6,{current_total:_total2,onUpdate:function(){
            _target2.html('$'+UTILS.numberWithCommas(Math.round(obj2.current_total)));
        }});

        TweenLite.to(obj3,.6,{current_total:_total3,onUpdate:function(){
            _target3.html('$'+UTILS.numberWithCommas(Math.round(obj3.current_total)));
        }});

        _target1.attr("data-total-value",_total1);
        _target2.attr("data-total-value",_total2);
        _target3.attr("data-total-value",_total3);
    }

    var addEventListener = function(){

        $(window).bind('resize.petResult',function(e){
            setTimeout(resize,100);
        });

        if(scope.hasClass('c-pet-result--theme-form')){
            $('.c-pet-result-additional-item input[type="checkbox"]',scope).bind('change',function(e){
                updateTotalAmount();
            })
        }
        resize();
    }


    return {
        init: function (a_scope) {
            scope = a_scope;
            // additional_random_id = new Date().getTime();

            // $('#plan1DiscountPremium',scope).addClass("r-"+additional_random_id);
            // $('#plan2DiscountPremium',scope).addClass("r-"+additional_random_id)
            // $('#plan3DiscountPremium',scope).addClass("r-"+additional_random_id)
            addEventListener();
        }
    }
}




$(function(){

    $('.c-pet-result').each(function(){
        var pr = new petResult();
        pr.init($(this));
    })

})

