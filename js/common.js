"use strict";

$(function () {
  //==================================================================
  var headerSelector = '.main-header';
  var headerElement = null;
  var resizeTimeout = null;

  function updateHeaderHeight() {
    if (!headerElement) {
      headerElement = document.querySelector(headerSelector);
      if (!headerElement) return;
    }

    var hh = headerElement.offsetHeight;
    document.documentElement.style.setProperty('--hh', "".concat(hh, "px"));
    document.documentElement.style.setProperty('--ih', "".concat(hh));
  }

  function debouncedUpdate() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateHeaderHeight, 100);
  }

  updateHeaderHeight();
  window.addEventListener('resize', debouncedUpdate);
  window.addEventListener('load', updateHeaderHeight);
  window.addEventListener('beforeunload', function () {
    clearTimeout(resizeTimeout);
  }); //==================================================================
  // const fileInput = document.querySelector('.call-sect__form-file input[type="file"]');
  // const fileNameDisplay = document.querySelector('.call-sect__form-file label div span');
  // const fileNameParent = document.querySelector('.call-sect__form-file');
  // fileInput.addEventListener('change', function(event) {
  // 	const file = event.target.files[0];
  // 	if (file) {
  // 		fileNameDisplay.textContent = file.name;
  // 		$(fileNameParent).addClass('active');
  // 	} else {
  // 		fileNameDisplay.textContent = '';
  // 		$(fileNameParent).removeClass('active');
  // 	}
  // });
  //==================================================================

  var curScroll = $(window).scrollTop();

  if (curScroll >= 60) {
    $(".main-header").addClass("sticky");
    $(".info-block").addClass("active");
  } else {
    $(".main-header").removeClass("sticky");
    $(".info-block").removeClass("active");
  }

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 60) {
      $(".main-header").addClass("sticky");
      $(".info-block").addClass("active");
    } else {
      $(".main-header").removeClass("sticky");
      $(".info-block").removeClass("active");
    }

    if (curScroll > scroll) {
      $(".main-header, .info-block").addClass("slide-down");
    } else {
      $(".main-header, .info-block").removeClass("slide-down");
    }

    if (scroll == 0) {
      $(".main-header").removeClass("slide-down");
    }

    curScroll = scroll;
  }); //==================================================================

  gsap.registerPlugin(ScrollTrigger); //==================================================================
  // window.addEventListener('scroll', e => {
  // 	document.documentElement.style.setProperty('--scrollTop', `${this.scrollY}px`);
  // });
  //==================================================================

  if (document.querySelector('.tecona-sect')) {
    gsap.to('.tecona-sect__bg', {
      height: '102%',
      // opacity: 1,
      duration: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.tecona-sect',
        start: 'center 55%',
        end: function end() {
          return "+=".concat(document.querySelector(".tecona-sect").offsetHeight / 4.5);
        },
        scrub: .2,
        markers: false
      }
    });
    gsap.to('.tecona-sect__title--1', {
      y: '-120%',
      duration: 2,
      // opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.tecona-sect',
        start: 'center center',
        end: function end() {
          return "+=".concat(document.querySelector(".tecona-sect").offsetHeight / 4.5);
        },
        scrub: true
      }
    });
    gsap.to('.tecona-sect__title--2', {
      y: '120%',
      duration: 2,
      // opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.tecona-sect',
        start: 'center center',
        end: function end() {
          return "+=".concat(document.querySelector(".tecona-sect").offsetHeight / 4.5);
        },
        scrub: true
      }
    });
  }

  if (document.querySelector('.steps-sect__progress')) {
    gsap.to(".steps-sect__progress span", {
      height: function height() {
        return document.querySelector(".steps-sect__progress").offsetHeight;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".steps-sect__items",
        start: "top 85%",
        end: function end() {
          return "+=".concat(document.querySelector(".steps-sect__progress").offsetHeight);
        },
        scrub: 0.1,
        pin: false,
        markers: false,
        invalidateOnRefresh: true,
        fastScrollNormalization: true
      }
    });
  } // if (document.querySelector('.help-sect__content')) {
  // 	// Анимация для блока с контентом (быстрее)
  // 	gsap.to(".help-sect__content", {
  // 		y: 180, // смещение вниз на 150px
  // 		duration: 2,
  // 		ease: "power2.out",
  // 		scrollTrigger: {
  // 			trigger: ".help-sect__trigger",
  // 			start: "bottom 100%",
  // 			end: () => `+=${document.querySelector(".help-sect.help-sect--img").offsetHeight * 2}`,
  // 			scrub: 0.5,
  // 			markers: false
  // 		}
  // 	});
  // 	// Анимация для изображения (медленнее)
  // 	gsap.to(".help-sect__img", {
  // 		y: 60,
  // 		duration: 2,
  // 		ease: "power2.out",
  // 		scrollTrigger: {
  // 			trigger: ".help-sect__trigger",
  // 			start: "top 80%",
  // 			end: () => `+=${document.querySelector(".help-sect.help-sect--img").offsetHeight * 2}`,
  // 			// end: () => `+=30`,
  // 			scrub: 0.1,
  // 			markers: false
  // 		}
  // 	});
  // }
  // ====================================================================================


  function initCtaParallax() {
    var cta = document.getElementById('blogCta');
    var content = document.getElementById('blogCtaContent');
    var maskWrapper = document.getElementById('blogCtaImage');
    var innerImg = document.getElementById('blogCtaInnerImg');
    if (!cta || !content || !maskWrapper || !innerImg) return;
    /* Более видимая анимация контента относительно ключа */

    var rateContent = 0.32;
    /* Анимация изображения внутри маски ключа */

    var rateImage = 0.22;

    function update() {
      var rect = cta.getBoundingClientRect();
      var viewportHeight = window.innerHeight;
      var sectionCenter = rect.top + rect.height / 2;
      var viewportCenter = viewportHeight / 3;
      var delta = viewportCenter - sectionCenter;
      var contentY = -delta * rateContent;
      var imageY = delta * rateImage;
      content.style.transform = 'translate3d(0, ' + contentY + 'px, 0)';
      innerImg.style.transform = 'translate3d(0, ' + imageY + 'px, 0)';
    }

    function onScroll() {
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', update);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCtaParallax);
  } else {
    initCtaParallax();
  } // ====================================================================================


  if (document.querySelector('.what-sect__gal')) {
    gsap.to(".what-sect__gal", {
      y: function y() {
        return document.querySelector(".what-sect").offsetHeight - document.querySelector(".what-sect__gal").offsetHeight;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".what-sect",
        start: "top 100%",
        end: function end() {
          return "+=".concat(document.querySelector(".what-sect__gal").offsetHeight);
        },
        scrub: 0.5,
        pin: false,
        markers: false,
        invalidateOnRefresh: true,
        fastScrollNormalization: true
      }
    });
  }

  if (document.querySelector('.scroll-block-1')) {
    gsap.to(".scroll-block-1", {
      // y: () => window.innerHeight - document.querySelector(".scroll-block-1").offsetHeight,
      y: function y() {
        return document.querySelector(".qual-sect").offsetHeight - document.querySelector(".scroll-block-1").offsetHeight / 2.5;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-block-1",
        start: "center 100%",
        end: function end() {
          return "+=".concat(document.querySelector(".scroll-block-1").offsetHeight * 4);
        },
        scrub: true,
        pin: false,
        markers: false,
        invalidateOnRefresh: true,
        fastScrollNormalization: true
      }
    });
    gsap.to(".scroll-block-2", {
      y: function y() {
        return window.innerHeight - document.querySelector(".scroll-block-1").offsetHeight * 1.7;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-block-2",
        start: "center 100%",
        end: function end() {
          return "+=".concat(document.querySelector(".scroll-block-1").offsetHeight * 2.5);
        },
        scrub: true,
        pin: false,
        markers: false,
        invalidateOnRefresh: true,
        fastScrollNormalization: true
      }
    });
  }

  if (document.querySelector('.scale-anim')) {
    gsap.fromTo(".scale-anim", {
      scale: 0.3,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 3,
      ease: "none",
      scrollTrigger: {
        trigger: ".rep-sect",
        pin: false,
        start: "top 95%",
        end: function end() {
          return "+=".concat(document.querySelector(".rep-sect").offsetHeight / 2);
        },
        scrub: 0.2,
        markers: false,
        pinSpacing: false
      }
    });
  } //==================================================================


  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });
  /* if (lazyLoadInstance) {
  	lazyLoadInstance.update();
  } */
  //==================================================================

  /* const swiper = new Swiper('.swiper', {
  	// Optional parameters
  	direction: 'vertical',
  	loop: true,
  		// If we need pagination
  	pagination: {
  		el: '.swiper-pagination',
  	},
  		// Navigation arrows
  	navigation: {
  		nextEl: '.swiper-button-next',
  		prevEl: '.swiper-button-prev',
  	},
  		// And if we need scrollbar
  	scrollbar: {
  		el: '.swiper-scrollbar',
  	},
  	breakpoints: {
  		// when window width is >= 320px
  		320: {
  			slidesPerView: 2,
  			spaceBetween: 20
  		},
  		// when window width is >= 480px
  		480: {
  			slidesPerView: 3,
  			spaceBetween: 30
  		},
  		// when window width is >= 640px
  		640: {
  			slidesPerView: 4,
  			spaceBetween: 40
  		}
  	}
  }); */
  //==================================================================

  $('.card-sect__radios-slider').each(function () {
    var slider = this.querySelector('.swiper');
    var next = this.querySelector('.card-sect__radios-slider-next');
    var scroll = this.querySelector('.card-sect__radios-slider-scroll');
    var sw = new Swiper(slider, {
      loop: false,
      freeMode: true,
      speed: 600,
      navigation: {
        nextEl: next // prevEl: '.revs-sect__slider-prev',

      },
      scrollbar: {
        el: scroll,
        draggable: true
      },
      breakpoints: {
        220: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          slidesOffsetAfter: 0
        },
        480: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          slidesOffsetAfter: 0
        },
        576: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          slidesOffsetAfter: 0
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 13 // slidesOffsetAfter: 0

        },
        992: {
          slidesPerView: 'auto',
          spaceBetween: 15 // slidesOffsetAfter: 35

        },
        1200: {
          slidesPerView: 'auto',
          spaceBetween: 15 // slidesOffsetAfter: 45

        },
        1400: {
          slidesPerView: 'auto',
          spaceBetween: 15 // slidesOffsetAfter: 45

        }
      }
    });
  }); //==================================================================

  var swMain = new Swiper('.main-sect__slider .swiper', {
    loop: false,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.main-sect__slider-next',
      prevEl: '.main-sect__slider-prev'
    },
    pagination: {
      el: '.main-sect__slider-pag',
      clickable: true
    },
    breakpoints: {
      220: {
        direction: 'horizontal'
      },
      992: {
        direction: 'vertical'
      },
      1200: {
        direction: 'vertical'
      },
      1400: {
        direction: 'vertical'
      }
    }
  }); //==================================================================

  var swRevs = new Swiper('.revs-sect__slider .swiper', {
    loop: false,
    speed: 600,
    navigation: {
      nextEl: '.revs-sect__slider-next',
      prevEl: '.revs-sect__slider-prev'
    },
    scrollbar: {
      el: '.revs-sect__slider-scroll'
    },
    breakpoints: {
      220: {
        slidesPerView: 'auto',
        spaceBetween: 10
      },
      480: {
        slidesPerView: 'auto',
        spaceBetween: 10
      },
      576: {
        slidesPerView: 'auto',
        spaceBetween: 10
      },
      768: {
        slidesPerView: 'auto',
        spaceBetween: 13
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 24
      }
    }
  }); //==================================================================

  var projSw = new Swiper('.proj-sect__slider .swiper', {
    loop: false,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.proj-sect__slider-pag'
    }
  }); //==================================================================

  $('input[name="phone"]').inputmask({
    "mask": "+7(999) 999-99-99" //"placeholder": "",
    //"clearMaskOnLostFocus": false

  }); //==================================================================

  var stagesSection = document.querySelector('.stages-sect');

  if (stagesSection) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3 //30%

    });
    observer.observe(stagesSection);
  } //==================================================================

  /* var wCond = $('#cond-sect').waypoint(function(direction) {
  		$(this.element).find('.anim__down').addClass('active');
  
  	this.destroy();
  }, {
  	offset: '85%'
  }) */
  //==================================================================

  /* $(window).scroll(function () {
  	if ($(window).scrollTop() >= $(window).height()) {
  		$('.scroll-up').addClass('active');
  	} else {
  		$('.scroll-up').removeClass('active');
  	}
  });
  $('.scroll-up').click(function () {
  	$('html, body').stop().animate({
  		scrollTop: 0
  	}, 'slow', 'swing');
  }); */


  $(".scroll").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr("href");
    var offset = $(id).offset();
    $("html, body").stop().animate({
      scrollTop: "".concat(offset.top, "px")
    }, "slow", "swing");
  });
  $('.anim__down').each(function () {
    var waypoint = $(this).waypoint(function (direction) {
      $(this.element).addClass('active');
      this.destroy();
    }, {
      offset: '90%'
    });
  });
  $('.steps-sect__item').each(function () {
    var waypoint = $(this).waypoint(function (direction) {
      $(this.element).toggleClass('active'); // this.destroy();
    }, {
      offset: '80%'
    });
  }); //==================================================================
  //$('selector').css('height', '').equalHeights();
  //==================================================================

  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  }); //==================================================================
  // let minR = Number($('#min-1').attr('min'));
  // let minRValue = Number($('#min-1').attr('value'));
  // let maxR = Number($('#max-1').attr('max'));
  // let maxRValue = Number($('#max-1').attr('value'));
  // $('.dir-sect__price-val.min span').text(minRValue.toLocaleString('ru-RU'))
  // $('.dir-sect__price-val.max span').text(maxRValue.toLocaleString('ru-RU'))
  // var priceRange = $('#slider-1').slider({
  // 	range: true,
  // 	min: minR,
  // 	max: maxR,
  // 	values: [minRValue, maxRValue],
  // 	slide: function (e, ui) {
  // 		switch (ui.handleIndex) {
  // 			case 0:
  // 				{
  // 					$('#min-1').val(ui.values[0]);
  // 					$('.dir-sect__price-val.min span').text(ui.values[0].toLocaleString('ru-RU'))
  // 					break;
  // 				};
  // 			case 1:
  // 				{
  // 					$('#max-1').val(ui.values[1]);
  // 					$('.dir-sect__price-val.max span').text(ui.values[1].toLocaleString('ru-RU'))
  // 					break;
  // 				};
  // 		}
  // 	}
  // });
  // .dir-sect__price-vals
  // 	.dir-sect__price-val.min от <span>3 000</span> руб.
  // 	.dir-sect__price-val.max до <span>20 000</span> руб.
  // 	input#min-1(type="hidden" name="min" min="0" value="5000" readonly)
  // 	input#max-1(type="hidden" name="max" max="20000" value="10000" readonly)
  // .dir-sect__slider-range#slider-1
  //==================================================================

  $('.sw-title').click(function () {
    var $this = $(this);
    var $currentContent = $this.parents('.sw').find('.sw-content'); // Если текущий элемент уже открыт, закрываем его

    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $currentContent.stop().slideUp(250);
      return;
    } // Закрываем все открытые элементы


    $('.sw-title.active').removeClass('active').parents('.sw').find('.sw-content').stop().slideUp(250); // Открываем текущий элемент

    $this.addClass('active');
    $currentContent.stop().slideDown(250);
  }); //==================================================================

  $('.main-footer__nav-title').click(function () {
    $(this).parent('.main-footer__nav').toggleClass('active');
  }); //==================================================================

  $('.call-sect__form-select-value').click(function (e) {
    e.stopPropagation();
    $(this).parent('.call-sect__form-select').toggleClass('active');
  });
  $('.call-sect__form-select ul li').click(function () {
    var value = $(this).data('option');
    var parent = $(this).parents('.call-sect__form-select');
    parent.find('input').val(value);
    parent.find('.call-sect__form-select-value').html(value);
    parent.removeClass('active');
  });
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.call-sect__form-select').length) {
      $('.call-sect__form-select.active').removeClass('active');
    }
  }); //==================================================================

  if ($(window).width() <= 992) {
    desktopProdsSliders();
  } else {
    desktopProdsSliders();
  }

  function desktopProdsSliders() {
    $('.prods-sect__slider').each(function () {
      var swiper = this.querySelector('.swiper');
      var prev = this.querySelector('.prods-sect__slider-prev');
      var next = this.querySelector('.prods-sect__slider-next');
      var scroll = this.querySelector('.prods-sect__slider-scroll');
      var sub = this.querySelectorAll('.prods-sect__prod-img');
      var sw = new Swiper(swiper, {
        loop: false,
        speed: 700,
        navigation: {
          nextEl: next,
          prevEl: prev
        },
        scrollbar: {
          el: scroll
        },
        breakpoints: {
          220: {
            slidesPerView: 'auto',
            spaceBetween: 10
          },
          480: {
            slidesPerView: 'auto',
            spaceBetween: 10
          },
          576: {
            slidesPerView: 'auto',
            spaceBetween: 10
          },
          768: {
            slidesPerView: 'auto',
            spaceBetween: 13
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 15
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 15
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 24
          }
        },
        on: {
          afterInit: function afterInit() {
            sub.forEach(function (item) {
              var subslider = item.querySelector('.swiper');
              var pag = item.querySelector('.prods-sect__prod-img-pag');
              var sub_sw = new Swiper(subslider, {
                loop: false,
                slidesPerView: 1,
                spaceBetween: 10,
                speed: 600,
                effect: 'fade',
                fadeEffect: {
                  crossFade: true
                },
                pagination: {
                  el: pag,
                  clickable: true
                }
              });
            });
          }
        }
      });
    });
  }

  $('.sw-ctrls').on('mouseenter', 'span', function () {
    var num = $(this).data('slide');
    $(this).closest('.swiper').addClass("active-".concat(num));
  });
  $('.sw-ctrls').on('mouseleave', 'span', function () {
    var num = $(this).data('slide');
    $(this).closest('.swiper').removeClass("active-".concat(num));
  }); //==================================================================

  $('.dir-sect__items .prods-sect__prod').each(function () {
    var slider = this.querySelector('.swiper');
    var pag = this.querySelector('.prods-sect__prod-img-pag');
    var sub_sw = new Swiper(slider, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: pag,
        clickable: true
      }
    });
  }); //==================================================================

  var swTCard = new Swiper(".card-sect__tslider .swiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: false,
    watchSlidesProgress: true,
    speed: 600
  });
  var swCard = new Swiper(".card-sect__slider .swiper", {
    spaceBetween: 10,
    speed: 600,
    pagination: {
      el: '.card-sect__slider-pag',
      clickable: true
    },
    thumbs: {
      swiper: swTCard,
      autoScrollOffset: 1
    }
  }); //==================================================================

  $('.offers-sect__tab').click(function (e) {
    e.preventDefault();
    $(this).parent().find('.offers-sect__tab').removeClass('active');
    $(this).addClass('active');
  }); //==================================================================

  $('.main-sect__city-btn').click(function (e) {
    e.stopPropagation();
    $(this).parents('.main-sect__city').toggleClass('active');
  });
  $('.main-sect__city-dropdown li').click(function () {
    var option = $(this).data('option');
    $(this).parent('.main-sect__city-dropdown').find('li').removeClass('active');
    $(this).addClass('active');
    $(this).parents('.main-sect__city').find('.main-sect__city-current').text(option);
    $(this).parents('.main-sect__city').removeClass('active');
  });
  $(document).click(function (e) {
    if (!$(e.target).closest('.main-sect__city').length && $('.main-sect__city.active').length) {
      $('.main-sect__city.active').removeClass('active');
    }
  }); //==================================================================

  $('.main-header__mbtn, .menu-block__close').click(function () {
    $('.menu-block').toggleClass('active');
  }); //==================================================================

  $('.dir-sect__filter-title').click(function (e) {
    e.stopPropagation();
    var $filter = $(this).parent();
    $(this).parent().toggleClass('active');

    if ($(window).width() > 992) {
      $('.dir-sect__filter.active').not($filter).removeClass('active');
    }
  });
  $(document).click(function (e) {
    if (!$(e.target).closest('.dir-sect__filter').length) {
      if ($(window).width() > 992) {
        $('.dir-sect__filter.active').removeClass('active');
      }
    }
  });
  var mqLaptop = window.matchMedia('(max-width: 992px)');

  function mqLaptopCallback(e) {
    if (e.matches) {//<992
    } else {
      //>992
      $('.dir-sect__filter').removeClass('active');
    }
  }

  mqLaptop.addEventListener('change', mqLaptopCallback); //==================================================================

  $('.dir-sect__sort-select').click(function (e) {
    e.stopPropagation();
    $(this).parent('.dir-sect__sort').toggleClass('active');
  });
  $(document).click(function (e) {
    if (!$(e.target).closest('.dir-sect__sort').length) {
      if ($(window).width() > 992) {
        $('.dir-sect__sort.active').removeClass('active');
      }
    }
  });
  $('.dir-sect__sort-radio').on('change', 'input', function (e) {
    var val = this.value;
    $(this).closest('.dir-sect__sort').find('.dir-sect__sort-select span').text(val);
  }); //==================================================================
  // $('.main-sect__examp-btn').click(function(e) {
  // 	e.stopPropagation();
  // 	const $parent = $(this).parent('.main-sect__examp');
  // 	$parent.toggleClass('active');
  // 	$('.main-sect__examp.active').not($parent).removeClass('active');
  // });
  // $(document).click(function(e) {
  // 	if (!$(e.target).closest('.main-sect__examp').length) {
  // 		$('.main-sect__examp.active').removeClass('active');
  // 	}
  // });
  //==================================================================

  $('.cart-sect__radio--deliv input').on('change', function (e) {
    var val = this.value;

    if (val == 'delivery') {
      $('.order-sect__hidden').addClass('active');
      return;
    }

    $('.order-sect__hidden').removeClass('active');
  }); //==================================================================

  $('.dir-sect__sort-btn, .dir-sect__sort-bg, .dir-sect__sort-close').click(function () {
    $('.dir-sect__sort-bg, .dir-sect__sort').toggleClass('active');
  }); //==================================================================

  $('.dir-sect__filter-btn, .dir-sect__filters-bg').click(function () {
    $('.dir-sect__filters, .dir-sect__filters-bg').toggleClass('active');
  }); //==================================================================

  $('.prevs-sect__tabs').on('click', '.prevs-sect__tab', function (e) {
    e.preventDefault();
    $(this).parent().find('.prevs-sect__tab').removeClass('active');
    $(this).addClass('active');
  }); //==================================================================

  $('.card-sect__tabs').on('click', '.card-sect__tab', function (e) {
    e.preventDefault();
    var id = this.hash;
    $(this).parent('.card-sect__tabs').find('.card-sect__tab').removeClass('active');
    $(this).addClass('active');
    $('.card-sect__tabs-content').removeClass('active');
    $(id).addClass('active');
  }); //==================================================================

  $('.card-sect__type-check').on('change', 'input', function (e) {
    var type = this.value;
    var parent = $(this).parent();

    if (type != 'custom') {
      var style = parent.find('em').attr('style');
      $('.card-sect__mater span').text(type);
      $('.card-sect__mater em').attr('style', style);
      return;
    }

    $('.card-sect__mater em').attr('style', '');
    $('.card-sect__mater span').text('Пользовательский');
  }); //==================================================================

  $('.projs-sect__tabs').on('click', '.projs-sect__tab', function (e) {
    e.preventDefault();
    $(this).parent().find('.projs-sect__tab').removeClass('active');
    $(this).addClass('active');
  }); //==================================================================

  $('.pa-sect__tabs').on('click', '.pa-sect__tab', function (e) {
    e.preventDefault();
    var id = this.hash;
    $(this).parent().find('.pa-sect__tab').removeClass('active');
    $('.pa-sect__content').removeClass('active');
    $(this).addClass('active');
    $(id).addClass('active');
  }); //==================================================================

  $('.order-btn.order, .pa-sect__data-offer').click(function (e) {
    e.preventDefault();
    var id = this.hash;
    $('.order-dialog__bg').addClass('active');
    $(id).addClass('active');
  });
  $('.order-dialog__bg, .order-dialog__close').click(function (e) {
    e.preventDefault();
    $('.order-dialog__bg, .order-dialog').removeClass('active');
  }); //==================================================================
  // $('.pa-sect__data-offer').click(function(e) {
  // 	e.preventDefault();
  // 	let id = this.hash;
  // 	$('.order-dialog__bg').addClass('active');
  // 	$(id).addClass('active');
  // });
  //==================================================================

  $('.stand-dialog__open, .main-header__phone').click(function (e) {
    e.preventDefault();
    var id = this.hash;
    $('.stand-dialog__bg').addClass('active');
    $(id).addClass('active');
  });
  $('.stand-dialog__bg, .stand-dialog__close, .stand-dialog__btn-close').click(function (e) {
    e.preventDefault();
    $('.stand-dialog, .stand-dialog__bg').removeClass('active');
  });
  $('.stand-dialog__btn-close').click(function (e) {
    $('.stand-dialog, .stand-dialog__bg').removeClass('active');
  }); //==================================================================

  $('.call-sect__form-phone input').on('input', function (e) {
    if (this.value.length) {
      $(this).parent('.call-sect__form-phone').addClass('active-btn');
      return;
    }

    $(this).parent('.call-sect__form-phone').removeClass('active-btn');
  }); //==================================================================

  $('.stand-dialog__btn--code').click(function (e) {
    e.preventDefault();
    $('.stand-dialog__footer').addClass('hidden');
    $('.stand-dialog__code').addClass('active');
  }); //==================================================================

  $('.stand-dialog__code-inputs input').on('input', function (e) {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 1) {
      this.value = this.value.substr(0, 1);
    }

    var inputs = $('.stand-dialog__code-inputs input');
    var currentIndex = inputs.index(this);

    if (this.value.length === 1 && currentIndex < inputs.length - 1) {
      inputs.eq(currentIndex + 1).focus();
    }
  });
  $('.stand-dialog__code-inputs input').on('keydown', function (e) {
    if (e.key === 'Backspace' && this.value === '') {
      var inputs = $('.stand-dialog__code-inputs input');
      var currentIndex = inputs.index(this);

      if (currentIndex > 0) {
        inputs.eq(currentIndex - 1).focus();
      }
    }
  }); //==================================================================
  // const mqLaptop = window.matchMedia('(max-width: 992px)');
  // function mqLaptopCallback(e) {
  // 	if (e.matches) {
  // 		//<992
  // 	} else {
  // 		//>992
  // 	}
  // }
  // mqLaptop.addEventListener('change', mqLaptopCallback);
  //==================================================================
});