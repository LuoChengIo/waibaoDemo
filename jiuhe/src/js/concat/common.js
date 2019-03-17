
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
})