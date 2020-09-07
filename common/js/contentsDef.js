var cts001 = {
  maxBtnCnt : 11
};

var cts002 = {
    maxBtnCnt : 1
};

cts001.firstFnc = function(info){
  this.cmmInfo = info;
  this.clickEvLoc = ".clickEv001:not([style*='display: none'])";
  var that = this;

  $.ajax({
        url : this.cmmInfo.headTempletePath + "template0001.html"
      , dataType : "html"
      , async : false
      , success : function(rslt){
           that.templateHtml = $(document.createElement("div")).html(rslt);
      }
  });

$.ajax({
      url :  this.cmmInfo.headTempletePath + this.cmmInfo.linkHtmlNm
    , dataType : "html"
    , async : false
    , success : function(rslt){
        $(that.cmmInfo.loadLinkBtnId).html(rslt);
    }
  });
  cmm.attachLinkDomFnc($("#movePage"), this.maxBtnCnt, "linkPage");
};

cts001.attachLinkPageFnc = function(){
  var that = this;
  $("a.linkPage").click(function(){
      var pageLoc = this.innerText.padStart(that.cmmInfo.page.padCount,"0");
      var pageHeadPath =  that.cmmInfo.page.headPath;
      var pageInfoUrl = pageHeadPath + pageLoc + "/pageInfo.json";
      var baseHtml = $(document.createElement("div"));
      var audioHeadPath =pageHeadPath + pageLoc + "/" + that.cmmInfo.audio.headPath;
      var playBtns = null;
      var audioList = [];

        $.ajax({
              url : pageInfoUrl
            , dataType : "json"
            , async : false
            , success : function(rsltList){
                var subjectNum  = 0;
                var subjectName = "";
                var detailGrp   = [];
                var detailNum   = 0;
                var detailName  = "";
                var detailContJap = "";
                var detailContKor = "";
                var cpyHtml = null;
                var cpyDetalGrp = null;
                var mainHanjaTop = "";
                var mainHanjaBottom = "";

                $.each(rsltList, function(idx, data){
                    subjectNum   = idx+1;
                    subjectName  = data.subjectName;
                    mainHanjaTop = data.mainHanja.top;
                    mainHanjaBottom = data.mainHanja.bottom;
                    detailGrp    = data.detailGrp;
                    cpyHtml      = $(document.createElement("div"));
                    cpyHtml.html(that.templateHtml.html());
                    cpyHtml.find(".subjectNum").text("[" + subjectNum + "]");
                    cpyHtml.find(".subjectName").text(subjectName);
                    cpyHtml.find("#mainHanja > .top > span").text(mainHanjaTop);
                    cpyHtml.find("#mainHanja > .bottom > span").text(mainHanjaBottom);

                    $.each(detailGrp, function(subIdx, subData){
                        detailNum  = subIdx+1;
                        detailName = detailNum + ". " +subData.detailName;
                        detailContJap = subData.detailContJap;
                        detailContKor = subData.detailContKor;
                        switch(subIdx){
                            case 0:
                                cpyHtml.find(".detailName").text(detailName);
                                cpyHtml.find(".detailContJap").text(detailContJap);
                                cpyHtml.find(".detailContKor").text(detailContKor);

                                if(subData.soundFlg === 0) cpyHtml.find(".clickEv001").hide();

                                break;
                            default:
                                cpyDetalGrp = $(document.createElement("div"));
                                cpyDetalGrp.html(that.templateHtml.find(".detailGrp").html());
                                cpyDetalGrp.find(".detailName").text(detailName);
                                cpyDetalGrp.find(".detailContJap").text(detailContJap);
                                cpyDetalGrp.find(".detailContKor").text(detailContKor);

                                if(subData.soundFlg === 0) cpyDetalGrp.find(".clickEv001").hide();

                                cpyHtml.find(".detailGrp").append(cpyDetalGrp.html());
                                break;
                        }

                    });
                    baseHtml.append(cpyHtml.html());
                });
                baseHtml.find("i.sub003").addClass(that.cmmInfo.btnAwsIcon);

                $(that.cmmInfo.loadHtmlId).html(baseHtml.html());
                playBtns = $(that.cmmInfo.loadHtmlId).find(that.clickEvLoc);

                playBtns.click(function(){
                    var curPos    = playBtns.index(this)+1;
                    var itemName  = String(curPos).padStart(that.cmmInfo.audio.padCount, "0");
                    var audioPath = "";

                    if(!audioList.hasOwnProperty(itemName)){
                        audioPath = audioHeadPath + itemName + that.cmmInfo.audio.tailPath;
                        audioList[itemName] = new Audio(audioPath);
                    }
                    audioList[itemName].play();
                });  //end clickEvent
            } // end success
        }); // end ajax
        $(".activeBtn").removeClass("activeBtn");
        $(this).addClass("activeBtn")
    }); // end clickEvent

    cmm.scrollEventFnc($(that.cmmInfo.loadHtmlId));
    cmm.afterScrollFnc(that.cmmInfo.devMod);


}; // end attachLinkPage

cts001.load = function(info){
  this.firstFnc(info);
  this.attachLinkPageFnc();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


cts002.firstFnc = function(info){
  this.cmmInfo = info;
  this.clickEvLoc = ".clickEv001:not([style*='display: none'])";
  var that = this;

$.ajax({
      url : this.cmmInfo.headTempletePath + "template0003.html"
    , dataType : "html"
    , async : false
    , success : function(rslt){
         that.templateHtml = $(document.createElement("div")).html(rslt);
    }
});

  $.ajax({
        url :  this.cmmInfo.headTempletePath + this.cmmInfo.linkHtmlNm
      , dataType : "html"
      , async : false
      , success : function(rslt){
          $(that.cmmInfo.loadLinkBtnId).html(rslt);
      }
    });
    cmm.attachLinkDomFnc($("#movePage"), this.maxBtnCnt, "linkPage");
  };
cts002.attachLinkPageFnc = function(){
  $(this.cmmInfo.loadHtmlId).html(this.templateHtml);
};

cts002.load = function(info){
  this.firstFnc(info);
  this.attachLinkPageFnc();
}
