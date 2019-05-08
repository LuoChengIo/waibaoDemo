$(function () {
  // 获取当前活动的nav
  var initialSlide = 1;
  $('#aboutNav .swiper-slide').each(function(i){
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
  $('.j-item').each(function(){
    
  })
  $('.j-item').on('click',function(){
    $(this).toggleClass('active').siblings().removeClass('active');
  })

  // 服务详情
  if($('#serviceNav').length){
    var iSlide = 1;
    $('#serviceNav .swiper-slide').each(function(i){
      if($(this).hasClass('active')){
        iSlide = i
      }
    })
    var serviceNav = new Swiper('#serviceNav', {
      slidesPerView: 5,
      initialSlide: iSlide,
      breakpoints: {
        1024: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 1,
        }
      }
    });
    common.addResizeFuc(function(){
      serviceNav.updateSize()
    })
  }
})