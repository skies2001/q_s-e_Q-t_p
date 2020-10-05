var cts001 = {
  maxBtnCnt : 11
};
var cts002 = {
  maxBtnCnt : 18
};
var cts003 = {
  maxBtnCnt : 1
};

{
    ["cts001","cts002","cts003"].forEach(function(e){
        window[e].firstFnc = function(info, dictPage){
          this.cmmInfo = info;
          this.pageDictPath = dictPage + "/";
        };
        window[e].load = function(){
          this.firstFnc.apply(this, arguments);
           ctsCmm001.load(this.cmmInfo, this);
        };
    });
}
