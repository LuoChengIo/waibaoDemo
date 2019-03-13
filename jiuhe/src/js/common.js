var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
$(function(){
	$('#mobileNav').on('click',function(){
		$('.mobile-head').removeClass('slideOutRight dn').addClass('animated slideInRight');
	}) 
	$('.mobile-head .m-close').on('click',function(){
		$('.mobile-head').removeClass('slideInRight').addClass('slideOutRight')
		setTimeout(function() {
			$('.mobile-head').addClass('dn');
		}, 350);
	}) 
	
})