$(function(){
  // 设置视频高度为浏览器的高度
  $('.in-video').height($('.in-video').height());
  $('body').removeClass('hp100 ovh');
  var winWidth = $(window).width();
  var isPC = winWidth>750;
  var myPlayer = videojs('player-Abbreviated');
  if(isPC){
    videojs("player-Abbreviated").ready(function(){
      $('#video_cover').hide();
      $('.palybut').hide();
      myPlayer.play();
  });
  }else{// 移动端不自动播放视频
    $('.palybut').on('click',function(){
      $('#video_cover').hide();
      myPlayer.play();
    })
  }
  $('.video-mask').on('click',function(){
    myPlayer.pause();
  })
})