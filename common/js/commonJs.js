var cmm = {};
cmm.info = {};

cmm.attachLinkDomFnc = function(target, maxBtnCnt, addNames){
var drawBtsCnt = 7;
    for(var i=0; i<drawBtsCnt ; i++){
      var aTag = $(document.createElement("a"));
      aTag.addClass(addNames.linkPage);
     aTag.addClass(addNames.hidden);
      aTag.attr("href", "javascript:void(0);");
        if(i == 0 || drawBtsCnt == i+1){
          var arrowBtn = $(document.createElement("i"));;
          if(i == 0){
              arrowBtn.addClass("fas fa-arrow-up");
              aTag.addClass(addNames.prevPage);
          }else{
              arrowBtn.addClass("fas fa-arrow-down");
              aTag.addClass(addNames.nextPage);
          }
          aTag.addClass(addNames.arrow);
          aTag.append(arrowBtn);
        }else{
            aTag.addClass(addNames.number);
        }
        target.append("\n\t\t").append(aTag);
        if((i+1) == drawBtsCnt) target.append("\n");
    }
    this.changeMoveBtn(target, maxBtnCnt,1,addNames, {first : true});
};
cmm.changeMoveBtn = function(target, maxBtnCnt, movePage, addNames, options){
    if(!(options instanceof Object)) options = {};
    if(movePage < 1) movePage = 1;
    if(movePage > maxBtnCnt) movePage = maxBtnCnt;

    var changeFlg = true;
    var firstNum = (Math.ceil(movePage/5)-1)*5+1;
    var numBtns = target.find("."+addNames.number);
    var prevBtn = target.find("."+addNames.prevPage);
    var nextBtn = target.find("."+addNames.nextPage);

    if(options.first && maxBtnCnt > 5){
        nextBtn.removeClass(addNames.hidden);
    }
    if(options.first){
      $.each(numBtns, function(idx, item){
          $(item).text(firstNum+idx).removeClass(addNames.activeBtn);
          ($(item).text() <= maxBtnCnt) ? $(item).removeClass(addNames.hidden)
                                                                        : $(item).addClass(addNames.hidden);
      });
      changeFlg = false;
    }else{
      $.each(numBtns, function(idx, item){
          if($(item).text() == movePage){
              changeFlg = false;
          }
      });
    }
    if(changeFlg){
        (firstNum > 1) ? prevBtn.removeClass(addNames.hidden)
                                     :  prevBtn.addClass(addNames.hidden);
        $.each(numBtns, function(idx, item){
            $(item).text(firstNum+idx).removeClass(addNames.activeBtn);
            ($(item).text() <= maxBtnCnt) ? $(item).removeClass(addNames.hidden)
                                                                          : $(item).addClass(addNames.hidden);
        });
        (maxBtnCnt >= firstNum+5) ? nextBtn.removeClass(addNames.hidden)
                                                                  :  nextBtn.addClass(addNames.hidden);
    }
};
cmm.storePos = function(){
    localStorage.setItem("scrollTop", $(window).scrollTop());
}

cmm.scrollPosCheckEvt = function(){
    var timeInfo = null;
    $(window).on("scroll", function(){
        if(timeInfo == null){
                timeInfo = setTimeout(function(){
                        cmm.storePos();
                        timeInfo = null;
                },250);
        }
    });
};

  cmm.scrollEventFnc = function(loadHtml){
        $(".scrollMoveBtn").click(function(ev, param){
            if(!(param instanceof Object)) param = {};

            var body = $("body, html");
            var scrollPos =  0;
            var slowTime = $.isNumeric(param.slowTime)
                                         ? param.slowTime : 400;

            body.stop();
            switch(this.id){
                case "moveTop":
                    break;
                case "moveCenter":
                    scrollPos = loadHtml.height()/3;
                    break;
                case "moveBottom":
                    scrollPos = loadHtml.height();
                    break;
            }
            slowTime == 0 ? body.scrollTop(scrollPos)
                                           : body.animate({scrollTop : scrollPos}, slowTime);
        });
  };

  cmm.loadScrollPos  = function(){
      var loadPos = localStorage.getItem("scrollTop");
      if($.isNumeric(loadPos)){
          $(window).scrollTop(loadPos);
      }
  };
  cmm.afterScrollFnc = function(pageInfo){
    var loadScroll = true;
      if(this.info.firstLoad == 1){
           var linkPageNum = localStorage.getItem("linkPageNum");
           this.changeMoveBtn($("#movePage"), pageInfo.maxBtnCnt,linkPageNum,pageInfo.addNames);
           var activeBtn = null;
           if(!$.isNumeric(linkPageNum)){
              linkPageNum = 1;
              loadScroll = false;
              localStorage.setItem("scrollTop","0");
           }
           $.each($("a.linkPage." +pageInfo.addNames.number ), function(idx, item){
             if($(item).text() == linkPageNum){
               $(item).trigger("click");
               return false;
             }
           });
           if(loadScroll) this.loadScrollPos();

           cmm.info.firstLoad = 0;
      }else{
          $("a.linkPage.number").first().trigger("click");
          $("#moveTop").trigger("click",{"slowTime" : 0});
      }
  };
  cmm.load = function(){
    var that = this;
    $.ajax({
          url : "../data/cmmInfo.json"
        , dataType : "json"
        , async : false
        , success : function(rslt){
            that.info = rslt;
        }
    });
    this.scrollPosCheckEvt();
    var mainMenuIndex =  localStorage.getItem("mainMenuIndex");
    var loadOp = $("#mainMenu option").eq(mainMenuIndex);
    if(loadOp.length > 0){
        loadOp.prop("selected", true);
    }
  };
