$(function () {
  // 获取当前活动的nav
  var initialSlide = 1;
  $('.swiper-wrapper .swiper-slide').each(function(i){
    if($(this).hasClass('active')){
      initialSlide = i
    }
  })
  // 初始化导航
  if($('#aboutNav').length){
    var navSwper = new Swiper('#aboutNav', {
      freeMode: true,
      slidesPerView: 'auto',
      freeModeSticky: true,
      initialSlide:initialSlide,
    });
    common.addResizeFuc(function(){
      navSwper.updateSize()
    })
  }
  // 加入职位切换
  $('.j-item').on('click',function(){
    $(this).toggleClass('active');
  })

  // 服务详情
  if($('#serviceNav').length){
    var serviceNav = new Swiper('#serviceNav', {
      freeMode: true,
      slidesPerView: 'auto',
      freeModeSticky: true,
      initialSlide:initialSlide,
    });
    common.addResizeFuc(function(){
      serviceNav.updateSize()
    })
  }
})