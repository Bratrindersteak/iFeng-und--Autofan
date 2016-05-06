$(document).ready(function() {
	// 判断顶部广告是否有效.
	advertisementHandle('#advertisement');

	// text ellipsis.
	var textEffect = new TextEffect();

	textEffect.textEllipsis('hotNews', 3);

	// 执行轮播图.
	var swiperEvent = new SwiperEvent();
	swiperEvent.liSwiperAuto('iautosBanner li', 'iautosBannerPager li', 3, 600);

	// 厂商认证模块车源初始随机显示一个品牌.
	randomConfirmCars('.brand-ico');

	// 字母重复解决办法.
	$('.normal-cities').each(function() {
		var _letter = $(this).data('letter');
		var _letterLength = $('[data-letter=' + _letter + ']').length;

		for ( var i=1;i<_letterLength; i++ ) {
			$('[data-letter=' + _letter + ']').eq(i).find('.province-letter-wrap').html('');
		}
	});

	// 初始灰层的高度值.
	$('#alphaMaskLayer').height( $(document).height() );

	// 选车输入框焦点事件
	$('.search-text').focus(function() {
		$(this).css({
			'border-color': '#f29600',
			'border-bottom-left-radius': '0px',
			'border-bottom-right-radius': '0px'
		});
		$('.search-list').show();
	});

	$('.search-text').blur(function() {
		var $that = $(this);

		var blurEvent = setTimeout(function() {
			$that.css({
				'border-color': '#ccc',
				'border-bottom-left-radius': '3px',
				'border-bottom-right-radius': '3px'
			});
			$('.search-list').hide();
		}, 150);
	});

	$('.search-list li').on('click', function() {
		var _text = $(this).text();

		$('.search-text').val( _text );
	});

	$('.link-title').hover(function() {
		var $that = $(this);

		activeTag($that);
		$('.link-list').hide();
		$('.' + $that.data('name')).show();
	});

	// 身边好车导航条滑过事件.
	$('.good-cars .nav li').hover(function() {
		var $that = $(this);

		activeTag($that);
	});

	$('.brand-ico li').hover(function() {
		$('.brand-ico li').css({
			'height': '68px',
			'background-image': 'url(../images/brand-logo.jpg)',
			'border-top-width': '1px',
			'border-color': '#d6d6d6'
		});
		$(this).css({
			'height': '66px',
			'background-image': 'url(../images/brand-logo-hover.jpg)',
			'border-top-width': '3px',
			'border-color': '#f29600',
			'border-bottom-color': '#fff'
		});
		$(this).siblings().css({
			'border-bottom-color': '#f29600'
		});
	}, function() {});

	$('.select-text').on('click', function() {
		var $that_list = $(this).siblings('.select-list');

		if ( $that_list.css('display') == 'none' ) {
			$that_list.show();
		} else {
			$that_list.hide();
		}
		
	});

	$('.select-tag').blur(function() {
		$(this).find('.select-list').hide();
	});

	$('.time-select li').on('click', function() {
		var $that = $(this);
		var _jahr = $that.text();

		$('#brandTimeText').text(_jahr);
		$that.parent().hide();
	});

	// 地区滑过事件.
	$('.address').hover(function() {
		$('#addressBoxes, .joint').show();
		$('#local').css({'color': '#666'});
		$(this).css({
			'background-color': '#fff'
		});
	}, function() {
		$('#local').css({'color': '#fff'});
		$(this).css({
			'background': 'none'
		});
		$('#addressBoxes, .joint').hide();
		$('.address-letters li').removeClass('active');
		$('.normal-cities').show();
	});

	// 切换地区关闭按钮点击事件.
	$('#addressCloseBtn').on('click', function() {
		$('#addressBoxes').hide();
		$('.address-letters li').removeClass('active');
		$('.normal-cities').show();
	});

	// 切换地区导航字母点击事件.
	$('.address-letters li').on('click', function() {
		var $that = $(this);
		var _letter = $that.data('letter');

		if ( _letter == 'all' ) {
			$that.addClass('active');
			$that.siblings().removeClass('active');
			$('.normal-cities').show();
		} else {
			$that.addClass('active');
			$that.siblings().removeClass('active');
			$('.normal-cities').hide();
			$('[data-letter=province-' + _letter + ']').show();
		}
	});

	$('.area-select-lists li').on('click', function() {
		var _area = $(this).text();

		$('#selectText').text(_area);
		$('.area-select').hide();
	});

	$('#chooseStyleBtn').on('click', function() {
		$('#alphaMaskLayer, #chooseStyleBox').show();
		$('body').css({'overflow-y': 'hidden'});
	});

	$('.choose-style-close, .choose-detail-list li').on('click', function() {
		$('#alphaMaskLayer, #chooseStyleBox').hide();
		$('body').css({'overflow-y': 'auto'});
		$('.choose-brand').show();
		$('.choose-brand').siblings().hide();
	});

	$('.choose-back-btn').on('click', function() {
		var _box = $(this).data('box');

		$('.' + _box).show();
		$('.' + _box).siblings().hide();
	});

	$('.brand-letters li').on('click', function() {
		var $that = $(this);
		var _letter = $that.data('letter');

		$that.addClass('active');
		$that.siblings().removeClass('active');
		$('.brand-' + _letter).show();
		$('.brand-' + _letter).siblings('.brand-lists-wrapper').hide();
	});

	$('.brand-lists li').on('click', function() {
		$('.choose-style').show();
		$('.choose-style').siblings().hide();
		$('.brand-letters li:first').addClass('active');
		$('.brand-letters li:first').siblings().removeClass('active');
		$('.brand-a').show();
		$('.brand-a').siblings('.brand-lists-wrapper').hide();
	});

	$('.style-list li').on('click', function() {
		$('.choose-year').show();
		$('.choose-year').siblings().hide();
	});

	$('.choose-year-text').on('click', function() {
		$('.choose-detail').show();
		$('.choose-detail').siblings().hide();
	});

	$('.detail-year li').on('click', function() {
		var _year = $(this).data('year');

		$('.detail-' + _year).show();
		$('.detail-' + _year).siblings('.detail-list-wrapper').hide();
	});
});

// advertisement handle function.
function advertisementHandle(vater) {
	$(vater).each(function() {
	    var that = $(this);

	    if ( that.find('div').height() == 0 || that.children('div').length == 0 ) {
	        that.hide();
	    }
	});
}

// active tag switchover function.
function activeTag($that) {
	$that.addClass('active');
	$that.siblings().removeClass('active');
}

// confirm cars brand random function.
function randomConfirmCars(vater) {
	var _randomNumber = Math.floor( Math.random() * 16 + 1 );

	$(vater + _randomNumber).css({
		'height': '66px',
		'background-image': 'url(../images/brand-logo-hover.jpg)',
		'border-top-width': '3px',
		'border-color': '#f29600',
		'border-bottom-color': '#fff'
	});
	$(vater + _randomNumber).siblings().css({
		'border-bottom-color': '#f29600'
	});
}

// text hidden effect function.
var TextEffect = function() {
	this.textEllipsis = function(name, row) {
		var clamp_list = document.getElementsByName(name);

		for ( var i=0; i<clamp_list.length; i++ ) {
			$clamp(clamp_list[i], {clamp: row, useNativeClamp: false});
		}
	}
};

// banner swiper function.
var SwiperEvent = function() {
	this.liSwiperAuto = function(Vater, pagers, visibleCapacity, duration) {
		// swiper eins once
		var dealerListWidth = $( '#' + Vater ).eq(0).outerWidth(true);
		var dealerListNumber = $( '#' + Vater ).length;
		var thisPic = 0;

		$( '#' + Vater ).each(function() {
			$(this).css({
				'position': 'absolute',
				'top': 0,
				'left': ( dealerListWidth * $(this).index() ) + 'px'
			});
		});

		var autoSwiper = setInterval(function() {
			var theFirstList = $( '#' + Vater ).eq(0);
			var theLastListLeft = Number($( '#' + Vater ).eq(dealerListNumber - 1).css('left').split('px')[0]);

			if ( theLastListLeft == dealerListWidth ) {
				theFirstList.css({'left': ( dealerListWidth * ( visibleCapacity - 1 ) ) + 'px'}).remove();
				$( '#' + Vater ).parent().append(theFirstList);
			}

			$( '#' + Vater ).each(function() {
				$(this).animate({left: '-=' + dealerListWidth + 'px'}, duration);
			});

			thisPic++;

			if ( thisPic > 2 ) {
				thisPic = 0;
			}

			var autoSwiperPagers = setInterval(function() {
				$('#' + pagers).html('');
				$('#' + pagers).eq(thisPic).html('<i></i>');
			}, ( duration / 2 ) );
		}, 3000);
	}
}
