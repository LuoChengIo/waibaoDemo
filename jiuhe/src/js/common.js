var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
$(function(){
	$('.c-nav .c-more').on('click',function(){ // 导航
		$('.mobile-head').removeClass('slideOutRight dn').addClass('animated slideInRight');
	})
	$('.c-nav .c-back').on('click',function(){ // 返回
		history.back()
	})
	$('.c-nav .c-title').text(document.title)
	$('.mobile-head .m-close').on('click',function(){ //导航关闭
		$('.mobile-head').removeClass('slideInRight').addClass('slideOutRight')
		setTimeout(function() {
			$('.mobile-head').addClass('dn');
		}, 350);
	}) 
	
})