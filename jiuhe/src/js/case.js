$(function(){
    // 获取当前活动的nav
    var initialSlide = 1;
    $('.swiper-wrapper .swiper-slide').each(function(i){
      if($(this).hasClass('active')){
        initialSlide = i
      }
    })
    // 初始化导航
    var navSwper = new Swiper('#caseNav', {
      freeMode: true,
      slidesPerView: 'auto',
      freeModeSticky: true,
      initialSlide:initialSlide,
    });
    common.addResizeFuc(function(){
      navSwper.updateSize()
    })
})