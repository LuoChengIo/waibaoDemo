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
        console.log($(ele).data('head'))
        $('.c-nav').removeClass(headTHme).addClass($(ele).data('head'));
        if(swiperV.isEnd){ // 是否最末
          $('.index-next').hide()
        }else{
          $('.index-next').show()
        }
        
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
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on:{
      slideChange: function(){
        if(indexBanner){
          if(swiperV.activeIndex){
            return
          }
          var ele = indexBanner.slides[indexBanner.activeIndex]
          $('.c-nav').removeClass(headTHme).addClass($(ele).data('head'))
          $('.index-banner').parent().data('head',$(ele).data('head'))
        } 
      },
    },
  });
  $('.index-next').on('click',function(){
    swiperV.slideNext()
  })
  common.addResizeFuc(function(){
    indexBanner.updateSize()
    swiperV.updateSize()
  })
})