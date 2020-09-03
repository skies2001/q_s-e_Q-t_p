if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}
function loadLinkBtn(target, maxBtnCnt){
    for(var i=0; i<maxBtnCnt ; i++){
        var aTag = $(document.createElement("a"));
        aTag.addClass("linkPage");
        aTag.attr("href", "javascript:void(0);");
        aTag.text(i+1);
        target.append("\n\t\t").append(aTag);
        if((i+1) == maxBtnCnt) target.append("\n");
    }
}
$(document).ready(function(){
    var cmmInfo      = null;
    var templateHtml = null;
    var audioList    = {};
    $.ajax({
          url : "../data/cmmInfo.json"
        , dataType : "json"
        , async : false
        , success : function(rslt){
            cmmInfo = rslt;
        }
    });

    $.ajax({
          url : "../data/template/template0001.html"
        , dataType : "html"
        , async : false
        , success : function(rslt){
             templateHtml = $(document.createElement("div")).html(rslt);
        }
    });
    $.ajax({
          url : "../data/template/template0002.html"
        , dataType : "html"
        , async : false
        , success : function(rslt){
            $("#loadLinkBtn").html(rslt);
        }
    });

    loadLinkBtn($("#movePage"), cmmInfo.maxBtnCnt);

    $("a.linkPage").click(function(){
        var pagePadCnt    = cmmInfo.page.padCount;
        var pageLoc       = this.innerText.padStart(pagePadCnt,"0");
        var pageHeadPath  = cmmInfo.page.headPath;
        var pageInfoUrl   = pageHeadPath + pageLoc + "/pageInfo.json";
        var baseHtml      = $(document.createElement("div"));
        var audioPadCount = cmmInfo.audio.padCount;
        var audioHeadPath = pageHeadPath + pageLoc + "/" + cmmInfo.audio.headPath;
        var audioTailPath = cmmInfo.audio.tailPath;
        var audioType     = cmmInfo.audio.type;
        var imagePadCount = cmmInfo.image.padCount;
        var imageHeadPath = pageHeadPath + pageLoc + "/" + cmmInfo.image.headPath;
        var imageTailPath = cmmInfo.image.tailPath;
        var buttonIcon    = cmmInfo.btnAwsIcon;
        var clickEvLoc    = ".clickEv001:not([style*='display: none'])";
        var playBtns      = null;
        
        audioList = {};
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
                    cpyHtml.html(templateHtml.html());
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
                                cpyDetalGrp.html(templateHtml.find(".detailGrp").html());
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

                baseHtml.find("i.sub003").addClass(buttonIcon);
           

//                $.each(baseHtml.find(".hanjaImg"), function(idx, item){
//                    var itemName = String(idx+1).padStart(imagePadCount, "0");
//                    var imgPath  =  imageHeadPath + itemName + imageTailPath;
//                    $(item).attr("src",imgPath)
//                });
                
                $("#loadHtml").html(baseHtml.html());
                playBtns = $("#loadHtml").find(clickEvLoc);
                
                playBtns.click(function(){
                    var curPos    = playBtns.index(this)+1; 
                    var itemName  = String(curPos).padStart(audioPadCount, "0");
                    var audioPath = "";
                    
                    if(!audioList.hasOwnProperty(itemName)){
                        audioPath = audioHeadPath + itemName + audioTailPath;
                        audioList[itemName] = new Audio(audioPath);   
                    }
                    audioList[itemName].play();
                });
            }
        });
        $(".activeBtn").removeClass("activeBtn");
        $(this).addClass("activeBtn")
    });
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
                scrollPos = $("#loadHtml").height()/3;
                break;
            case "moveBottom":
                scrollPos = $("#loadHtml").height();
                break;
        }
        slowTime == 0 ? body.scrollTop(scrollPos)
                      : body.animate({scrollTop : scrollPos}, slowTime);
    });
    $("a.linkPage").last().trigger("click");
    $("#moveBottom").trigger("click",{"slowTime" : 0});
});
