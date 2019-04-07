$(function () {
  // 案例列表
  // 获取当前活动的nav
  var initialSlide = 1;
  $('.swiper-wrapper .swiper-slide').each(function (i) {
    if ($(this).hasClass('active')) {
      initialSlide = i
    }
  })
  // 初始化导航
  if($('#newsNav').length){
    var navSwper = new Swiper('#newsNav', {
      freeMode: true,
      slidesPerView: 'auto',
      freeModeSticky: true,
      initialSlide: initialSlide,
      centerInsufficientSlides: true,
    });
    common.addResizeFuc(function () {
      navSwper.updateSize()
    })
  }
  
})