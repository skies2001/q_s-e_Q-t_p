var cts001 = {
  maxBtnCnt : 11
};

var cts002 = {
  maxBtnCnt : 5
};

var cts999 = {
    maxBtnCnt : 1
};

cts001.firstFnc = function(info, pageDictPage){
  this.cmmInfo = info;
  this.pageDictPath = pageDictPage + "/";
};

cts001.load = function(){
  this.firstFnc.apply(this, arguments);
   ctsCmm001.load(this.cmmInfo, this);
};

cts002.firstFnc = function(info, pageDictPage){
  this.cmmInfo = info;
  this.pageDictPath = pageDictPage + "/";
};

cts002.load = function(){
  this.firstFnc.apply(this, arguments);
   ctsCmm001.load(this.cmmInfo, this);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


cts999.firstFnc = function(info, pageDictPage){
  this.cmmInfo = info;
  this.clickEvLoc = ".clickEv001:not([style*='display: none'])";
  this.pageDictPath = pageDictPage + "/";
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
cts999.attachLinkPageFnc = function(){
  $(this.cmmInfo.loadHtmlId).html(this.templateHtml);
};

cts999.load = function(){
  this.firstFnc.apply(this, arguments);
  this.attachLinkPageFnc();
}
