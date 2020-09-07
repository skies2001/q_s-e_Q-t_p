$(document).ready(function(){
  cmm.load();

  $(cmm.info.mainMenuId).change(function(){
    window[this.value].load(cmm.info);
  }).trigger("change");
});
