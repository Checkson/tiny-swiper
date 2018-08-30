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
		autoplay: false,
		speed: 3000,
		initialIndex: 0,
		clickable: true,
    touchable: true,
		slides: '.slide-item',
		slidesLen: 5,
		slidesProps: {
			width: 0,
			height: 0
		},
		navigation: {
			prev: '',
			next: ''
		},
		pagination: {
			el: '',
			activeClass: ''
		},
		slideStart: function () {},
		slideEnd: function () {},
		click: function (order, index) {}
	};

	TinySwiper.prototype.init = function () {
		this.initSlides();
		this.initAutoPlay();
		this.initClickable();
		this.touchable();
		this.initNavigation();
		this.initPagination();
	};

	TinySwiper.prototype.initSlides = function () {

		var _this = this;
		var options = this.options;

		this.$el.css('position') === 'static' && this.$el.css('position', 'relative');

		this.$slides = [];
		this.$el.find(options.slides).each(function (idx) {
			var $this = $(this);
			$this.css('position') === 'static' && $(this).css('position', 'absolute');
			$this.data('order', idx);
			_this.$slides.push($this);
		});

		this.$pages = options.pagination.el ? $(options.pagination.el) : undefined;

		this.visualLen = Math.abs(Math.min(options.slidesLen, this.$slides.length));
		this.firstVisit = true;
		this.animationFinishNum = 0;
    this.slidesOptions = [];

    this.product3DSlidesProps();
		this.resetPosition();
		this.setUp();

	};

	TinySwiper.prototype.initAutoPlay = function () {

		var _this = this;
		var options = this.options;

		if (options.autoplay) {
			clearInterval(this.timer);
			this.timer = setInterval(function () {
				_this.doNext();
			}, options.speed);
			this.$el.on('mouseover', function () {
				clearInterval(_this.timer);
			}).on('mouseout', function () {
				_this.timer = setInterval(function () {
					_this.doNext();
				}, options.speed);
			});
		}
	};

	TinySwiper.prototype.initClickable = function () {

		var _this = this;
		var options = this.options;

		if (options.clickable) {
			for (var k = 0, len = this.$slides.length; k < len; k++) {
				this.$slides[k].on('click', function () {
					var index = $(this).index();
					_this.doChange(index);
					_this.options.click.call(this, parseInt($(this).data('order')), index);
				});
			}	
		}
	};

	TinySwiper.prototype.touchable = function () {

	  var _this = this;
    var options = this.options;
    var startX, flag = false;

    if (options.touchable) {
      this.$el.on('touchstart mousedown', function (e) {
        e.preventDefault();
        startX = e.clientX || e.originalEvent.changedTouches[0].clientX;
        flag = true;
      }).on('touchmove mousemove', function (e) {
        e.preventDefault();
        if (!flag) {
          return false;
        }
      }).on('touchend mouseup', function (e) {
        e.preventDefault();
        if (!flag) {
          return false;
        }
        var clientX = e.clientX || e.originalEvent.changedTouches[0].clientX;
        var disX = parseInt(clientX- startX);
        if (disX > 0) {
          _this.doPrev();
        } else if (disX < 0) {
          _this.doNext();
        }
        flag = false;
      })
    }

  };

	TinySwiper.prototype.initNavigation = function () {

		var _this = this;
		var options = this.options,
				prev = options.navigation.prev,
				next = options.navigation.next;

		prev && $(prev).on('click', function () {
			_this.doPrev();
		});
			
		next && $(next).on('click', function () {
			_this.doNext();
		});

	};

	TinySwiper.prototype.initPagination = function () {

		var _this = this;

		if (this.$pages) {
			this.$pages.each(function (idx) {
				$(this).on('click', function () {
					var index = -1;
					for (var i = 0, len = _this.$slides.length; i < len; i++) {
						if (idx === parseInt(_this.$slides[i].data('order'))) {
							index = i;
							break;
						}
					}
					_this.doChange(index);
				});
			});
		}
	
	};

	TinySwiper.prototype.product3DSlidesProps = function () {

    var options = this.options;
    var scale = parseInt(this.visualLen) * 2;

    this.centerIndex = Math.floor(this.visualLen / 2);

    var cw = this.$el.width(),
        ch = this.$el.height();
    var sw = options.slidesProps.width,
        sh = options.slidesProps.height;
    var unitW = sw / (scale * 1.0),
        unitH = sh / (scale * 1.0);
    var disW = Math.floor((cw - sw) / (2 * this.centerIndex)),
        disH = Math.floor((ch - sh) / (2 * this.centerIndex));

    for(var i = 0; i < this.visualLen; i++) {

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
  };

	TinySwiper.prototype.resetPosition = function () {

		var options = this.options;

		var	total = this.$slides.length,
				initialIndex = (parseInt(options.initialIndex) || 0) % total;

		if (initialIndex < 0) {
			initialIndex = initialIndex + total;
		}

		var dis = Math.abs(initialIndex - this.centerIndex),
				flag = initialIndex > this.centerIndex;

		for (var i = 0; i < dis; i++) {
			if (flag) {
				this.$slides.push(this.$slides.shift());
			} else {
				this.$slides.unshift(this.$slides.pop());
			}
		}

	};

	TinySwiper.prototype.doPrev = function () {
		this.doChange(this.centerIndex - 1);
	};

	TinySwiper.prototype.doNext = function () {
		this.doChange(this.centerIndex + 1);
	};

	TinySwiper.prototype.doChange = function (index) {
		if (index > this.centerIndex) {
			for (var i = 0; i < index - this.centerIndex; i++) {
				this.$slides.push(this.$slides.shift());
			}
			this.setUp();
		} else if (index >= 0 && index < this.centerIndex) {
			for (var i = 0; i < this.centerIndex - index; i++) {
				this.$slides.unshift(this.$slides.pop());
			}
			this.setUp();
		}
	};

	TinySwiper.prototype.setUp = function () {

		var _this = this;
		var options = this.options;

		for (var j = 0, len = this.$slides.length; j < len; j++){
			this.$el.append(this.$slides[j]);
		}

		if (!this.firstVisit) {
			_this.options.slideStart.call(_this.$el.get(0), _this.$slides[_this.centerIndex].get(0));
		}

		this.animationFinishNum = 0;

		for (var i = 0, len = this.$slides.length; i < len; i++) {

			if (i < this.visualLen) {
				this.$slides[i].css('display', 'block');
				this.doMove(this.$slides[i], this.slidesOptions[i], function () {
					this.animationFinishNum++;
					if (this.animationFinishNum === this.visualLen) {
						var activeClass = options.pagination.activeClass;
						if (activeClass) {
							var tempIndex = parseInt(_this.$slides[_this.centerIndex].data('order'));
							_this.$pages.eq(tempIndex).addClass(activeClass).siblings().removeClass(activeClass);
						}
						if (!this.firstVisit) {
							_this.options.slideEnd.call(_this.$el.get(0), _this.$slides[_this.centerIndex].get(0));
						} else {
							this.firstVisit = false;
						}
					} 
				});
			} else {
					this.$slides[i]
							.css('display', 'none')
							.css('width', 0)
							.css('height', 0)
							.css('top', this.slidesOptions[this.centerIndex].top)
							.css('left', this.slidesOptions[this.centerIndex].left)
			}
		}
	};

	TinySwiper.prototype.doMove = function ($el, attrs, callback) {
		var _this = this;
		clearInterval($el.timer);
		$el.timer = setInterval (function () {
			var isStop = true;
			for (var item in attrs) {
				var cur = parseFloat($el.css(item)) || 0;
				var speed = (attrs[item] - cur) / 5;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

				if (cur !== attrs[item]) {
					isStop = false;
					$el.css(item, cur + speed);
				}

			}
			if (isStop) {
				clearInterval($el.timer);
				callback && callback.apply(_this, arguments);
			}
		}, 30);
	};

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
