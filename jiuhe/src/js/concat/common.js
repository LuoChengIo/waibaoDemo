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
	//---------------------联系我们表单------------------------
	if ($('.contact-from').length) {
		$('.team-item').each(function () {
			$(this).on('click', function () {
				$('[name=companyName]').val($(this).data('cname'));
				$(this).addClass('active').siblings().removeClass('active');
				randerAcle();
			})
		})
		var correct = ' <img class="tip" src="./images/correct.png" alt="" srcset="">';
		var error = ' <img class="tip" src="./images/error.png" alt="" srcset="">';

		function errorTip(dom, text) {
			if (text) {
				dom.after('<p class="text-info f12 mt5 mb5 error-tip">' + text + '</p>')
			} else {
				dom.next('.error-tip').remove();
			}
		}
		function randerAcle(){
			$('.c-from .submit').addClass('disabled');
			if($('#userName').val()&&$('[name=companyName]').val()&&$('#userEmail').val()&&$('#userPhone').val()){
				var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
				if(reg.test($('#userEmail').val())){
					$('.c-from .submit').removeClass('disabled');
				}
			}
		}
		// 姓名验证
		$('#userName').on('blur', function () {
			var parent = $(this).parent(".from-item");
			$(this).next('.sdst').empty();
			errorTip(parent)
			if ($(this).val()) {
				parent.find('.sdst').append(correct);
			} else {
				errorTip(parent, '请输入姓名！');
				parent.find('.sdst').append(error);
			}
			randerAcle();
		})
		// 电子邮件
		$('#userEmail').on('blur', function () {
			var parent = $(this).parent(".from-item");
			$(this).next('.sdst').empty();
			errorTip(parent)
			var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
			if ($(this).val() === '') { //输入不能为空
				errorTip(parent, '请输入电子邮件！');
				parent.find('.sdst').append(error);
				return false;
			} else if (!reg.test($(this).val())) { //正则验证不通过，格式不对
				errorTip(parent, '邮箱格式不正确！');
				parent.find('.sdst').append(error);
				return false;
			} else {
				parent.find('.sdst').append(correct);
				return true;
			}
			randerAcle();
		})
		// 联系电话
		$('#userPhone').on('blur', function () {
			var parent = $(this).parent(".from-item");
			$(this).next('.sdst').empty();
			errorTip(parent)
			if ($(this).val()) {
				parent.find('.sdst').append(correct);
			} else {
				errorTip(parent, '请输入联系电话！');
				parent.find('.sdst').append(error);
			}
			randerAcle();
		})
		// 提交按钮
		var loading = false;
		
		$('.c-from .submit').on('click',function(){
			if($(this).addClass('disabled')&&!loading){
				return;
			}
			loading = true;
			$.ajax({
					type: "post",
					url: "/api/user/register",
					data: $('#contactFrom').serialize(),
			}).done(function(message) {
				console.log(message)
				$('#contactFromDialog').modal('show');
				loading = false;
			}).fail(function(err){
				console.log(err)
				loading = false;
			})
		})
		
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