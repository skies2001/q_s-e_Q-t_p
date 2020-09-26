var cts001 = {
  maxBtnCnt : 11
};

var cts002 = {
  maxBtnCnt : 14
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
