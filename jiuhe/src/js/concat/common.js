(function () {
	var count = 0;
	var common = {
		cwidth: 0,
		cheight: 0,
		resizeList: [],
		addResizeFuc: function (callBack) { // 添加屏幕变化事件
			callBack && callBack();
			count++;
			common.resizeList.push({
				id: count,
				callBack: callBack
			})
			return count;
		},
		removeResizeFuc: function (id) { // 移除屏幕变化事件
			var array = common.resizeList
			for (var index = 0; index < array.length; index++) {
				var element = array[index];
				if (element.id === id) {
					array.splice(index, 1);
				}

			}
		}
	}
	var getCLient = function () {
		common.cwidth = $(window).width()
		common.cheight = $(window).height()
	}
	getCLient();
	var resizeFuc = function () {
		getCLient();
		var array = common.resizeList
		for (var index = 0; index < array.length; index++) {
			var element = array[index];
			element.callBack && element.callBack()
		}
	}
	var resizeTimer = null;
	$(window).on('resize', function () {
		if (resizeTimer) {
			clearTimeout(resizeTimer)
		}
		resizeTimer = setTimeout(function () {
			resizeFuc()
		}, 400);

	});
	window.common = common
	return common
}())
$(function () {
	document.body.addEventListener('touchstart', function () {});
	//-------------导航--------------
	// var autoscrsd = function(){
	// 	var autoct = $('.auto-contanter')	
	// 	if(autoct.length&&autoct.data('head-fiexd')){
	// 		autoct.css('padding-top',$('.c-nav').outerHeight());
	// 	}
	// }
	// autoscrsd();
	// common.addResizeFuc(function(){
	//   autoscrsd();
	// })
	$('.c-nav .c-more').on('click', function () { // 导航
		$('.mobile-head').removeClass('slideOutRight dn').addClass('animated slideInRight');
	})
	$('.c-nav .c-back').on('click', function () { // 返回
		history.back()
	})
	$('.c-nav').addClass($('body').data('head-class'));
	$('.c-nav .c-title').text(document.title)
	$('.mobile-head .m-close').on('click', function () { //导航关闭
		$('.mobile-head').removeClass('slideInRight').addClass('slideOutRight')
		setTimeout(function () {
			$('.mobile-head').addClass('dn');
		}, 350);
	})
	$('[data-search="nav"]').on('click', function () { // 导航搜索
		$('.pc-nav.st').hide();
		$('.pc-nav.search').show();
	})
	$('[data-search="close"]').on('click', function () { // 导航搜索
		$('.pc-nav.st').show();
		$('.pc-nav.search').hide();
	})
	//-------------浮动客服--------------
	$('[data-kefu="show"]').on('click', function () { // 客服
		$('.f-k-detail').removeClass('dn');
		setTimeout(function () {
			$('.f-k-detail').addClass('active');
		}, 10);
	})
	$('[data-kefu="close"]').on('click', function () { // 客服
		$('.f-k-detail').removeClass('active');
		setTimeout(function () {
			$('.f-k-detail').addClass('dn');
		}, 350);
	})
	//---------------------滚动置顶------------------------
	function goTop() {
		console.log(456)
		var doc = document.body.scrollTop ? document.body : document.documentElement;
		Math.easeout(doc.scrollTop, 0, 4, function (value) {
			doc.scrollTop = value;
		});
	}

	function gotoTop(min_height) {
		$("#toTop").click(goTop);
		//获取页面的最小高度，无传入值则默认为600像素
		min_height ? min_height = min_height : min_height = 600;
		if ($(window).scrollTop() > min_height) {
			$("#toTop").fadeIn();
		}
		//为窗口的scroll事件绑定处理函数
		var resizeTimer = null;
		$(window).scroll(function () {
			//获取窗口的滚动条的垂直位置
			var s = $(window).scrollTop();
			//当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
			if (resizeTimer) {
				clearTimeout(resizeTimer)
			}
			resizeTimer = setTimeout(function () {
				if (s > $(window).height()) {
					$("#toTop").fadeIn();
				} else {
					$("#toTop").fadeOut();
				};
			}, 20);

		});
	};
	gotoTop($(window).height());
	//---------------------联系我们表单------------------------
	if($('[data-portamento=child]').length){
		//为窗口的scroll事件绑定处理函数
		var resizeTimer = null;
		$(window).scroll(function () {
			//获取窗口的滚动条的垂直位置
			if (resizeTimer) {
				clearTimeout(resizeTimer)
			}
			resizeTimer = setTimeout(function () {
				var cdom = $('[data-portamento=child]'),
				 		s = $(window).scrollTop(), // 滚动距离
				 		sTop = cdom.parent().offset().top-$('.c-nav').outerHeight(), // 当前元素距顶部的距离
						hClass = cdom.data('top-class') || 0,// 距离另外一个元素的距离
						top= 0;
				cdom.parent().height(cdom.outerHeight()); // 给当前元素的父元素一个高度，防止当前元素fixed定位导致页面抖动
				if(hClass){
					top = $(hClass).outerHeight();
				}
				if(s>sTop){
					cdom.css({ "position": "fixed", "top": top, "left":0, "right":0,"z-index":100 ,'box-shadow':'0 1px 1px rgba(34,25,25,.1)'});
				}else{
					cdom.removeAttr("style");
				}
			}, 20);
		});
	}
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
/**
 * url地址修改
 * @param url 待修改url
 * @param arg 修改的参数名
 * @param arg_val 修改的具体值
 * @returns {String}
 */
function changeURLArg(url, arg, arg_val) {
	var pattern = arg + '=([^&]*)';
	var replaceText = arg + '=' + arg_val;
	if (url.match(pattern)) {
			var tmp = '/(' + arg + '=)([^&]*)/gi';
			tmp = url.replace(eval(tmp), replaceText);
			return tmp;
	} else {
			if (url.match('[\?]')) {
					return url + '&' + replaceText;
			} else {
					return url + '?' + replaceText;
			}
	}
}

/**
* 获取url里的参数
* @param arg 参数名
* @returns
*/
function getURLString(arg) {
	var reg = new RegExp("(^|&)" + arg + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
			return unescape(r[2]);
	return null;
}