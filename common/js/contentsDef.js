var cts001 = {
  maxBtnCnt : 11
};
var cts002 = {
  maxBtnCnt : 18
};
var cts003 = {
  maxBtnCnt : 21
};
var cts004 = {
  maxBtnCnt : 8
};

{
    ["cts001","cts002","cts003","cts004"].forEach(function(e){
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
