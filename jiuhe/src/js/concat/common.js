
(function(){
	var count = 0;
	var common = {
		cwidth:0,
		cheight:0,
		resizeList:[],
		addResizeFuc:function(callBack){ // 添加屏幕变化事件
			callBack&&callBack();
			count++;
			common.resizeList.push({
				id:count,
				callBack:callBack
			})
			return count;
		},
		removeResizeFuc:function(id){ // 移除屏幕变化事件
			var array = common.resizeList
			for (var index = 0; index < array.length; index++) {
				var element = array[index];
				if(element.id === id){
					array.splice(index,1);
				}
				
			}
		}
	}
	var getCLient = function(){
		common.cwidth = $(window).width()
		common.cheight = $(window).height()
	}
	getCLient();
	var resizeFuc = function(){
		getCLient();
		var array = common.resizeList
		for (var index = 0; index < array.length; index++) {
			var element = array[index];
			element.callBack&&element.callBack()
		}
	}
	var resizeTimer = null;
	$(window).on('resize',function(){
		if(resizeTimer){
		  clearTimeout(resizeTimer)
		}
		resizeTimer = setTimeout(function(){
			resizeFuc()
		}, 400);

	});
	window.common = common
	return  common
}())
$(function(){
	$('.c-nav .c-more').on('click',function(){ // 导航
		$('.mobile-head').removeClass('slideOutRight dn').addClass('animated slideInRight');
	})
	$('.c-nav .c-back').on('click',function(){ // 返回
		history.back()
	})
	$('.c-nav').addClass($('body').data('head-class'));
	$('.c-nav .c-title').text(document.title)
	$('.mobile-head .m-close').on('click',function(){ //导航关闭
		$('.mobile-head').removeClass('slideInRight').addClass('slideOutRight')
		setTimeout(function() {
			$('.mobile-head').addClass('dn');
		}, 350);
	}) 
	$('[data-search="nav"]').on('click',function(){ // 导航搜索
		$('.pc-nav.st').hide();
		$('.pc-nav.search').show();
	})
	$('[data-search="close"]').on('click',function(){ // 导航搜索
		$('.pc-nav.st').show();
		$('.pc-nav.search').hide();
	})
	function gotoTop(min_height) {
		$("#toTop").click(//定义返回顶部点击向上滚动的动画
			function () {
				$('html,body').animate({ scrollTop: 0 }, 300);
			});
		//获取页面的最小高度，无传入值则默认为600像素
		min_height ? min_height = min_height : min_height = 600;
		if( $(window).scrollTop()>min_height){
			$("#toTop").fadeIn();
		}
		//为窗口的scroll事件绑定处理函数
		var resizeTimer = null;
		$(window).scroll(function () {
			//获取窗口的滚动条的垂直位置
			var s = $(window).scrollTop();
			//当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
			if(resizeTimer){
				clearTimeout(resizeTimer)
			}
			resizeTimer = setTimeout(function(){
			if (s > min_height) {
				console.log(2321)
				$("#toTop").fadeIn();
			} else {
				$("#toTop").fadeOut();
			};
			}, 20);
			
		});
	};
	gotoTop($(window).height());
})