/**
 * Create by Checkson on 2018/8/27
 * version 1.0.0
 */
;(function ($) {

	function TinySwiper (el, options) {
		this.options = options;
		this.$el = $(el);
		this.timer = null;
	 	this.init();
	}

	TinySwiper.DEFAULTS = {
		initialSlide: 0,
		speed: 300,
		autoplay: false,
		delay: 3000,
		loop: false,
		slides: '.slide-item',
		slidesLen: 5,
		slidesProps: {
			width: 0,
			height: 0
		},
		navigation: {
			prev: '.slide-prev',
			next: '.slide-next'
		},
		change: function () {},
		slideEnd: function () {}
	};

	TinySwiper.prototype.init = function () {
		this.initSlides();
	};

	TinySwiper.prototype.initSlides = function () {

		var options = this.options;
		var scale = parseInt(options.slidesLen) * 2;

		this.slidesOptions = [];
		this.centerIndex = Math.floor(options.slidesLen / 2);
		this.$slides = [];

		var cw = this.$el.width(),
		 		ch = this.$el.height();
 		var sw = options.slidesProps.width,
 				sh = options.slidesProps.height;
		var unitW = sw / (scale * 1.0),
				unitH = sh / (scale * 1.0);
		var disW = Math.floor((cw - sw) / (2 * this.centerIndex)),
				disH = Math.floor((ch - sh) / (2 * this.centerIndex));

		for(var i = 0; i < options.slidesLen; i++) {

			var dis = Math.abs(this.centerIndex - i);

			var width = Math.floor((unitW * (scale - dis))),
					height = Math.floor((unitH * (scale - dis))),
					top = Math.floor(dis * unitH / 2 + disH * 2),
					left = i <= this.centerIndex ?
									Math.floor(i * disW) : 
									Math.floor(cw - (this.centerIndex - dis) * disW - width),
					zIndex = this.centerIndex - dis + 1;

			this.slidesOptions.push({
				width: width,
				height: height,
				top: top,
				left: left,
				zIndex: zIndex
			});
		}

		var _this = this;

		$(options.slides).each(function (i) {
			_this.$slides.push($(this))
		});

		this.setup();

	};

	TinySwiper.prototype.setup = function () {

		var options = this.options;
		var _this = this;

		for (var i = 0, len = this.$slides.length; i < len; i++) {

			if (i < options.slidesLen) {

			} else {
					this.$slides[i]
							.css('display', 'none')
							.css('width', 0)
							.css('height', 0)
							.css('top', 0)
							.css('left', 0)
			}

			if (i === this.centerIndex) {
				this.$slides[i].off('mouseover').off('mouseout');
			} else {
				this.$slides[i].css({
					opacity: 0.2,
					filter: 'alpha(opacity=' + 20 + ')'
				});
				this.$slides[i].on('mouseover', function () {
					// pass
				}).on('mouseout', function () {
					// pass
				});
			}

		}

	}

	$.fn.tinySwiper = function (settings) {

		this.each(function () {

			var $this = $(this),
					data = $this.data('tiny.swiper'),
					options = $.extend({}, TinySwiper.DEFAULTS, typeof settings === 'object' && settings);

			if (!data) {
				$this.data('tiny.swiper', (data = new TinySwiper(this, options)));
			}

		});

		return this;
	};

	$.fn.tinySwiper.Construtor = TinySwiper;
	$.fn.tinySwiper.defaults = TinySwiper.DEFAULTS;


})(jQuery);

