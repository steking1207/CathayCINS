$(function() {
    var top3 = function() {

        var root_scope = $('.cathay-comp.cathay-card.cc--layout-top3')

        var img2Bg = function(){

            var imgWrap = $('[cathay-img2bg]',root_scope);

            imgWrap.each(function(i){

              var _this = $(this);
              var d = new Date();
              var time = d.valueOf();
              var class_name = 'cathay-img2bg-'+i+'-'+time;
              var inlineStyle = "";
              inlineStyle += '<style id="cathay-img2bg-'+time+'">';
              var media_ary = [0,768,992];
              if(_this.attr('data-sm')!=undefined && _this.attr('data-sm')!=''){
                inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
                inlineStyle += '  .'+class_name+'{';
                inlineStyle += '    background-image:url("'+_this.attr('data-sm')+'");';
                inlineStyle += '  }';
                inlineStyle += '}';
                media_ary.shift();
              }
              if(_this.attr('data-md')!=undefined && _this.attr('data-md')!=''){
                inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
                inlineStyle += '  .'+class_name+'{';
                inlineStyle += '    background-image:url("'+_this.attr('data-md')+'");';
                inlineStyle += '  }';
                inlineStyle += '}';
                media_ary.shift();
              }

              if(_this.attr('data-lg')!=undefined && _this.attr('data-lg')!=''){
                inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
                inlineStyle += '  .'+class_name+'{';
                inlineStyle += '    background-image:url("'+_this.attr('data-lg')+'");';
                inlineStyle += '  }';
                inlineStyle += '}';
                media_ary.shift();
              }

              inlineStyle += "</style>";

              if(media_ary.length<3){
                _this.addClass(class_name);
                $(inlineStyle).appendTo("head");
              }
            })
        }();

        var init = function() {

            var target = $('.top3-item',root_scope);
            target.each(function(i) {
                var scope = $(this);
                var d = new Date();
                var t = d.getTime();

                $('.cc-more-content', $(this)).mCustomScrollbar({
                    theme: "default"
                });
                var color_title = scope.attr('color-title');
                var color_price = scope.attr('color-price');
                var color_btn = scope.attr('color-btn');
                var color_ribbon = scope.attr('color-ribbon');
                var color_border = scope.attr('color-border');
                var random_name = 'cathay-top3-id-' + t + '-' + i;
                scope.addClass(random_name);

                var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;


                if (RegExp.test(color_border))
                    scope.css('border-color', color_border);

                if (RegExp.test(color_title))
                    $('.cc-title', scope).css('color', color_title);

                if (RegExp.test(color_price))
                    $('.cc-price', scope).css('color', color_price);

                if (RegExp.test(color_btn))
                    $('.cc-link', scope).css('background-color', color_btn);

                var styles = "<style id='" + random_name + "' type='text/css'>";

                if (RegExp.test(color_ribbon)) {
                    styles += ".cathay-comp.cathay-card.cc--layout-top3 " + "." + random_name + " .cc-more-content .mCS-default.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar{background-color: " + color_ribbon + "}";
                    styles += ".cathay-comp.cathay-card.cc--layout-top3 " + "." + random_name + " .cc-ribbon{background-color: " + color_ribbon + ";}";
                    styles += ".cathay-comp.cathay-card.cc--layout-top3 " + "." + random_name + " .cc-ribbon:before{color: " + color_ribbon + ";filter:brightness(80%);}";
                    styles += ".cathay-comp.cathay-card.cc--layout-top3 " + "." + random_name + " .cc-more:hover{color: " + color_title + ";}";
                    styles += ".cathay-comp.cathay-card.cc--layout-top3 " + "." + random_name + " .cc-more:hover:after{border-top: 2px solid " + color_title + ";border-right: 2px solid " + color_title + ";}";
                }
                styles += "</style>";
                $(styles).appendTo('head');



                $('.cc-more', scope).unbind().bind('click', function(e) {
                    $('.cc-more-content', scope).slideToggle();
                    if ($(this).attr('status') == 'on') {
                        $(this).attr('status', 'off');
                        $('.cc-more-content', scope).attr('status', 'off');
                    } else {
                        $(this).attr('status', 'on');
                        setTimeout(function() {
                            $('.cc-more-content', scope).attr('status', 'on');
                        }, 500)
                    }
                })
            });
        }();
    }();
})
