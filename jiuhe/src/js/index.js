$(function(){
  // 初始化
  var headTHme = 'Dark Light';
  $('.c-nav').addClass('index-nav');
  $('.c-nav').addClass($('.swiper-container-v').data('head'))
  var swiperV = new Swiper('.swiper-container-v', {
    direction: 'vertical',
    mousewheel: true,
    lazy: {
      loadPrevNext: true,
    },
    on:{
      slideChange: function(){
        var ele = swiperV.slides[swiperV.activeIndex];
        $('.c-nav').removeClass(headTHme).addClass($(ele).data('head'))
      },
    },
  });
  // 首次banner图
  var indexBanner = new Swiper('.index-banner', {
    autoplay: true,
    loop: true,
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.index-swiper-pagination',
    },
    on:{
      slideChange: function(){
        if(indexBanner){
          console.log(swiperV.activeIndex)
          if(swiperV.activeIndex){
            return
          }
          var ele = indexBanner.slides[indexBanner.activeIndex]
          $('.c-nav').removeClass(headTHme).addClass($(ele).data('head'))
        } 
      },
    },
  });
  
  common.addResizeFuc(function(){
    indexBanner.updateSize()
    swiperV.updateSize()
  })
})