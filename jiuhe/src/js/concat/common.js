
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
	document.body.addEventListener('touchstart', function(){ });
	//-------------导航--------------
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
	//-------------浮动客服--------------
	$('[data-kefu="show"]').on('click',function(){ // 客服
		$('.f-k-detail').removeClass('dn');
		setTimeout(function() {
			$('.f-k-detail').addClass('active');
		}, 10);
	})
	$('[data-kefu="close"]').on('click',function(){ // 客服
		$('.f-k-detail').removeClass('active');
		setTimeout(function() {
			$('.f-k-detail').addClass('dn');
		}, 350);
	})
	//---------------------滚动置顶------------------------
	function goTop(){
		console.log(456)
    var doc = document.body.scrollTop? document.body : document.documentElement;
		Math.easeout(doc.scrollTop, 0, 4, function (value) {
			doc.scrollTop = value;
		});
	}
	function gotoTop(min_height) {
		$("#toTop").click(goTop);
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
				console.log(123)
			if (s > min_height) {
				$("#toTop").show();
			} else {
				$("#toTop").hide();
			};
			}, 20);
			
		});
	};
	gotoTop($(window).height());
})
Math.easeout = function (A, B, rate, callback) {
	if (A == B || typeof A != 'number') {
	return;
	}
	B = B || 0;
	rate = rate || 2;
	var step = function () {
	A = A + (B - A) / rate;
	if (A < 1) {
	callback(B, true);
	return;
	}
	callback(A, false);
	requestAnimationFrame(step);
	};
	step();
};