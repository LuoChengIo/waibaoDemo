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
  if($('#caseNav').length){
    var navSwper = new Swiper('#caseNav', {
      freeMode: true,
      slidesPerView: 'auto',
      freeModeSticky: true,
      initialSlide: initialSlide,
    });
    common.addResizeFuc(function () {
      navSwper.updateSize()
    })
  }
 

  // 案例详情
  // 初始化
  if($('#caseRecommend').length){
    var caseRecommend = null;
    if(common.cwidth>750){
      caseRecommend = new Swiper('#caseRecommend', {
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
    }else{
      caseRecommend = new Swiper('#caseRecommend', {
        slidesPerView: 'auto',
        spaceBetween: 10
      });
    }
  }
  
})