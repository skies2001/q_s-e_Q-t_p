var cmm = {};
cmm.info = {};

cmm.attachLinkDomFnc = function(target, maxBtnCnt, addClass){
    for(var i=0; i<maxBtnCnt ; i++){
        var aTag = $(document.createElement("a"));
        aTag.addClass(addClass);
        aTag.attr("href", "javascript:void(0);");
        aTag.text(i+1);
        target.append("\n\t\t").append(aTag);
        if((i+1) == maxBtnCnt) target.append("\n");
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
                },500);
        }
    });
};

  cmm.scrollEventFnc = function(loadHtml){
        $(".scrollMoveBtn").click(function(ev, param){
            if(!(param instanceof Object)) param = {};

            var body = $("body, html");
            var scrollPos = 0;
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
          console.log(loadPos, "load");
      }
  };

  cmm.afterScrollFnc = function(devMod){
    switch(devMod){
      case 1:
        $("a.linkPage").last().trigger("click");
        //$("#moveBottom").trigger("click",{"slowTime" : 0});

        break;
      default:
          $("a.linkPage").first().trigger("click");
         //$("#moveTop").trigger("click",{"slowTime" : 0});
        break;
    }
    this.loadScrollPos();
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
  };
