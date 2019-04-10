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
  //---------------------分页处理------------------------
  var pageNum = $('.v-pagination').data('pageNum'),
      pageSize = $('.v-pagination').data('pageSize'),
      field = $('.v-pagination').data('pageName'),
      maxShowLength = 6,
      pageHtml='';
 // 获取跳转链接
  // var href = changeURLArg(location.href,field,num)
  if(pageNum !=1){ // 如果当前页面不是第一页 显示上一页按钮
    pageHtml+='<a class="v-page prev" href="'+changeURLArg(location.href,field,pageNum-1)+'"><span class="iconfont">&#xe605;</span></a>';
  }
  
  if(pageSize<=maxShowLength){ // 如果总页数小于=最大显示按钮数
    for (var index = 1; index < pageSize+1; index++) {
      if(index == pageNum){
        pageHtml+='<span class="v-page active">'+index+'</span>';
      }else{
        pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,index)+'">'+index+'</a>';
      }
    }
  }else{
    if(pageNum<4){
      for (var index = 1; index < pageNum+1; index++) {
        if(index == pageNum){
          pageHtml+='<span class="v-page active">'+index+'</span>';
        }else{
          pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,index)+'">'+index+'</a>';
        }
      }
      pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum+1)+'">'+(pageNum+1)+'</a>';
      pageHtml+='<span class="v-page">...</span>';
      pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageSize)+'">'+pageSize+'</a>';
    }else{
      pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,1)+'">'+1+'</a>';
      pageHtml+='<span class="v-page">...</span>';
      if(pageNum>=pageSize-2){
          if(pageNum == pageSize){
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum-3)+'">'+(pageNum-3)+'</a>';
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum-2)+'">'+(pageNum-2)+'</a>';
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum-1)+'">'+(pageNum-1)+'</a>';
            pageHtml+='<span class="v-page active">'+pageNum+'</span>';
          }else if(pageNum == pageSize-1){
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum-2)+'">'+(pageNum-2)+'</a>';
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum-1)+'">'+(pageNum-1)+'</a>';
            pageHtml+='<span class="v-page active">'+pageNum+'</span>';
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum+1)+'">'+(pageNum+1)+'</a>';
          }else{
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum-1)+'">'+(pageNum-1)+'</a>';
            pageHtml+='<span class="v-page active">'+pageNum+'</span>';
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum+1)+'">'+(pageNum+1)+'</a>';
            pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum+2)+'">'+(pageNum+2)+'</a>';
          }
      }else{
        pageHtml+='<span class="v-page active">'+pageNum+'</span>';
        pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageNum+1)+'">'+(pageNum+1)+'</a>';
        pageHtml+='<span class="v-page">...</span>';
        pageHtml+='<a class="v-page" href="'+changeURLArg(location.href,field,pageSize)+'">'+pageSize+'</a>';
      }
      
    }
  }
  if(pageNum !=pageSize){ // 如果当前页面不是最后一页 显示下一页按钮
    pageHtml+='<a class="v-page next" href="'+changeURLArg(location.href,field,pageNum+1)+'"><span class="iconfont">&#xe633;</span></a>';
  }
  $('.v-pagination').html(pageHtml);


  // 案例详情
  // 初始化
  if($('#newsRecommend').length){
    var newsRecommend = null;
    if(common.cwidth>750){
      newsRecommend = new Swiper('#newsRecommend', {
        slidesPerView: 3,
        spaceBetween: 30,
      });
    }else{
      newsRecommend = new Swiper('#newsRecommend', {
        slidesPerView: 'auto',
        spaceBetween: 10
      });
    }
    common.addResizeFuc(function () {
      newsRecommend.updateSize()
    })
  }
})