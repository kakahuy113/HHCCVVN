import {
	getSVGs,
	Loading
} from './util/utilities';
import Cookie from './lib/Cookie';
import Tab from './lib/Tab';
import CommonController from './lib/CommonController';
import AccountController from './lib/AccountController';


// INIT CLASS SUB MENU
const initClassSubMenu = () => {
	// PARAMS
	const header = document.querySelector('header');
	const items__MainMenu = document.querySelectorAll('.navbottom__wrapper>.navBar>.navBar__item');
	// ADD LOADING HEADER
	header.setAttribute('loading', '');
	// INIT FUNCTION
	const init = () => {
		return new Promise((resolve, reject) => {
			items__MainMenu.forEach((item) => {
				const isHaveSub = item.querySelectorAll('.navBar');
				// CHECK MAIN MENU IS HAVE SUB ???
				if (isHaveSub.length > 0) {
					// ADD CLASS IS HAVE SUB
					item.classList.add('isHaveSubMenu');
					// ADD CLASS LIST MENU LV1
					isHaveSub.forEach((item) => {
						item.classList.add('navBar--lv1');
					});
					// ADD CLASS ITEM MENU LV1
					const items__MenuLv1 = item.querySelectorAll('.navBar__item');
					items__MenuLv1.forEach((item) => {
						item.classList.add('navBar__item--lv1');
					});
				}
			});
			resolve();
		})
	}

	init().then(() => {
		setTimeout(() => {
			header.removeAttribute('loading');
			header.setAttribute('loaded', '');
		}, 300);
	})
};

// INIT BUTTON BACK
const initElementButtonBackSubMenu = () => {
	const menusLv1 = document.querySelectorAll('.navBar--lv1');
	menusLv1.forEach((item) => {
		const mainMenu = document.querySelector('.navbottom__wrapper>.navBar');
		const btn__content = mainMenu.getAttribute('data-btn-back-content');
		const btn__wrapper = document.createElement('div');
		// GẮN NÚT MẶC ĐỊNH
		btn__wrapper.classList.add(
			'navBar__item',
			'navBar__item--lv1',
			'mobile'
		);
		item.prepend(btn__wrapper);
		// INER HTML
		btn__wrapper.innerHTML = `<div class="navBar__back">${btn__content}</div>`;
	});
};

// INIT Smooth Scrollbar
const initSmoothScrollbar = () => {
	var Scrollbar = window.Scrollbar;
	// Scrollbar.init(document.querySelector('#body-smoothScroll'));
}

// ACTIONS LOGIN PAGE
const actionsLoginPage = () => {
	// Small functions here !!!
	const check = () => {
		let isLogin = document
			.querySelector('#check_login>input')
			.getAttribute('data-isLogin');
		if (isLogin == 'False') {
			isLogin = false;
		} else {
			isLogin = true;
		}
		return isLogin;
	};
	// Params gobals here !!
	const isLogin = check();
	const headerButtonLogin__wrapper = document.querySelector(
		'.headerButtonLogin__wrapper'
	);
	const headerLogged__wrapper = document.querySelector(
		'.headerLogged__wrapper'
	);
	const headerLogOut = document.querySelector('.headerLogOut');
	const research__login__option = document.querySelector(
		'.research__login--option'
	);
	// Action here !!!
	if (isLogin) {
		// ACTION FOR ISLOGIN = TRUE
		headerButtonLogin__wrapper.classList.add('isLogin');
		headerLogged__wrapper.classList.add('isLogin');
		if (research__login__option) {
			research__login__option.classList.add('isLogin');
		}
		$('.news__events--detail .lAS__listItem.like').on('click', function (e) {
			e.preventDefault();
			const url = $(this).attr('data-url');
			const isLike = $(this).attr('isLike');
			const id = $(this).attr('id');
			const likeNum = parseInt($(this).find("span").html())
			$.ajax({
				type: 'post',
				url: url,
				data: {
					isLike: isLike,
					id: id
				},
				contentType: false,
				processData: false,
				beforeSend: () => {

				},
				complete: () => {
					stateOfLikeButton();
				},
				success: (res) => {
					if(res.Result == true) {
						$(this).attr('isLike', true);
						$(this).find("span").html(`${likeNum + 1}`);
					}
					if(res.Result == false) {
						$(this).attr('isLike', false);
						$(this).find("span").html(`${likeNum - 1}`);
					}
				},
				error: (res) => {
				}
			})
		});
	} else {
		// ACTION FOR ISLOGIN = FALSE
		headerButtonLogin__wrapper.classList.remove('isLogin');
		headerLogged__wrapper.classList.remove('isLogin');
		$('.news__events--detail .lAS__listItem.like').on('click', function (e) {
			e.preventDefault();
			$.fancybox.open({src : '#form__login'});
		})
		if (research__login__option) {
			research__login__option.classList.remove('isLogin');
		}
	}
	// LOGOUT
	headerLogOut.addEventListener('click', (e) => {
		const messege = headerLogOut.getAttribute('messege-logout');
		document
			.querySelector('#check_login>input')
			.setAttribute('data-isLogin', 'False');
		actionsLoginPage();
		alert(messege);
	});
};

// SHOW SUB MENU MOBILE
const showSubMenuMobile = () => {
	const btn = document.querySelector('.navBarHamburger__wrapper');
	const mainMenu = document.querySelector('.navbottom__wrapper>.navBar');
	const items__IsHaveSubMenu = document.querySelectorAll('.isHaveSubMenu');
	const overlay = document.querySelector('#overlay');
	// SHOW MAIN MENU !!!
	if (btn) {
		btn.addEventListener('click', (e) => {
			document.querySelector('body').classList.toggle('disabled');
			btn.classList.toggle('active');
			mainMenu.classList.toggle('show');
			overlay.classList.toggle('show');
			// CLOSE ALL SUB MENU
			items__IsHaveSubMenu.forEach((item) => {
				item.querySelector('.navBar--lv1').classList.remove('show');
			});
		});
	} else {
		console.log(`Không tồn tại element :=> .navBarHamburger__wrapper`);
	}

	// SHOW SUB MENU
	items__IsHaveSubMenu.forEach((item) => {
		const menuLv1 = item.querySelector('.navBar--lv1');
		const btnBack = menuLv1.querySelector('.navBar__back');
		// SHOW MENU LV 1
		item.addEventListener('click', (e) => {
			menuLv1.classList.add('show');
		});
		// BACK TO MAIN MENU
		if (btnBack) {
			btnBack.addEventListener('click', (e) => {
				e.stopPropagation();
				menuLv1.classList.remove('show');
			});
		} else {
			console.log(`Không tồn tại element :=> .navBar__back`);
		}
	});

	if (overlay) {
		overlay.addEventListener('click', (e) => {
			mainMenu.classList.remove('show');
			overlay.classList.remove('show');
			btn.classList.remove('active');
			items__IsHaveSubMenu.forEach((item) => {
				item.querySelector('.navBar--lv1').classList.remove('show');
			});
		});
	}
};

// SHOW INPUT SEARCH
const showInputSearch = () => {
	const btn = document.querySelector('.navSearch__btn');
	const navSearch__input = document.querySelector('.navSearch__input')
	if (btn) {
		btn.addEventListener('click', (e) => {
			btn.classList.toggle('active');
			navSearch__input.classList.toggle('show');
		})
	}
}

// ACTIVE LANGGUAGE
const activeLanguage = () => {
	const htmlLang = document.querySelector('html').getAttribute('lang');
	const items__language = document.querySelectorAll(
		'.header__languages .languages__item'
	);
	items__language.forEach((item) => {
		if (item.getAttribute('data-language') == htmlLang) {
			item.classList.add('active');
		}
	});
};

// SHOW BACK TO TOP
const showBackToTop = () => {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('#back_to_top').addClass('show');
        } else {
            $('#back_to_top').removeClass('show');
        }
    });

    $('#back_to_top').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0,
        });
    });
};

// COPY DATA BY ATTR
const copyDataByAttr = () => {
	const items__paste = document.querySelectorAll('[data-paste]');
	const items__copy = document.querySelectorAll('[data-copy]');

	items__paste.forEach((itemPaste) => {
		items__copy.forEach((itemCopy) => {
			var data = itemCopy.getAttribute('data-copy');
			if (data != null && data == itemPaste.getAttribute('data-paste')) {
				itemPaste.textContent = itemCopy.textContent;
			}
		});
	});
};

// CHANGE CONTENT TABLE MOBILE
const changeContentMobile = () => {
	const contentsMobile = document.querySelectorAll('[data_content--mobile]');
	const contentsPc = document.querySelectorAll('[data_content--pc]');
	const isChange = window.innerWidth < 1025;
	if (isChange == true) {
		contentsMobile.forEach((item) => {
			const valueContent = item.getAttribute('data_content--mobile');
			item.innerHTML = valueContent;
		})
	} else {
		contentsPc.forEach((item) => {
			const valueContent = item.getAttribute('data_content--pc');
			item.innerHTML = valueContent;
		})
	}
}

// MAIN BANNER WEBSITE
const initMainBanner = () => {
	const namePage = document.querySelector('#js-page-verify');
	const mainBanner = document.querySelector('.MainSlider__Banners');
	if (namePage.className == "index-page") {
		mainBanner.classList.add('isIndex');
		return new Swiper('.MainSlider__Banners .swiper-container', {
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			speed: 1000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.MainSlider__Banners .swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
		});
	};
};

// AJAX FORM FOOTER
const ajaxFormFooter = () => {
    $('.footer__forms .footer__submit').on('click', function(e) {
        e.preventDefault();
        const _thisBtn = $(this);
        const url = _thisBtn.attr('data-url');
        const formData = new FormData();
        $('.footer__forms input').each(function() {
            const name = $(this).attr('name');
            const value = $(this).val();
            formData.append(name, value);
        });

        if ($('.footer__forms form').valid() === true) {
            console.log(
                'Kết quả kiểm tra điều kiện là:' +
                ' ' +
                $('.footer__forms form').valid()
            );
            $.ajax({
                url: url,
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    _thisBtn.attr('disabled', 'disabled');
                },
                success: function(res) {
                    alert(`${res.Message}`);
                    window.location.reload();
                    _thisBtn.removeAttr('disabled');
                },
            });
        } else {
            console.log(
                'Kết quả kiểm tra điều kiện là:' +
                ' ' +
                $('.footer__forms form').valid()
            );
        }
    });
};

// OPEN TARGET LINK FOOTER
const openTargetLinkFooter = () => {
	const select__linkTarget = document.querySelector(
		'.footer__forms .footer__select-control select'
	);
	select__linkTarget.addEventListener('change', (e) => {
		const select__valute = select__linkTarget.value;
		window.open(`${select__valute}`, '_blank');
	});
};

// swiper home page video
const sliderHomeVideo = () => {
	var swiper = new Swiper('.swiper--left__wrapper .swiper-container', {
		// Enable lazy loading
		lazy: true,
		navigation: {
			nextEl: '.swiper--left__wrapper .swiper-button-next',
			prevEl: '.swiper--left__wrapper .swiper-button-prev',
		},
	});
};

// swiper home page image
const silderHomeImage = () => {
	
	var galleryThumbs = new Swiper('.lib__images--right .gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 3,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});

	var galleryTop = new Swiper('.lib__images--right .gallery-top', {
		spaceBetween: 10,
		navigation: {
			nextEl: '.lib__images--right .swiper-button-next',
			prevEl: '.lib__images--right .swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});
};

//Swiper Hot News HOME
const sliderHotnewsHome = () => {
	var swiper = new Swiper(".hot-news-banner .swiper-container", {
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		simulateTouch: false
	})
}

//Swiper banner design home 1
const sliderVideoBanner1 = () => {
	var swiper = new Swiper(".home__Lib__video .home__lib__video__banner--design-1 .swiper-container", {
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		simulateTouch: false
	})
}

//Swiper banner design home 2
const sliderVideoBanner2 = () => {
	var swiper = new Swiper(".home__Lib__video .home__lib__video__banner--design-2 .swiper-container", {
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		simulateTouch: false
	})
}
//Silder Home Page Member Section
const SliderHomeMemberSection = () => {
	var slider = new Swiper(".home__member .swiper-container", {
		loop: true,
		slidesPerView: 6,
		spaceBetween: 30,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		breakpoints: {
			100: {
				slidesPerView: 2,
				spaceBetween: 10
			},
			700: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			1000: {
				slidesPerView: 5,
				spaceBetween: 10
			},
			1450: {
				slidesPerView: 6,
				spaceBetween: 30
			}
		},
		simulateTouch: false,
	})
}

const ajaxFormContact = () => {
    $('.contact form .form-button').on('click', function(e) {
        e.preventDefault();
        const _thisBtn = $(this);
        const url = _thisBtn.attr('data-url');
        const formData = new FormData();
        $('.contact form .form-group input').each(function() {
            const name = $(this).attr('name');
            const value = $(this).val();
            formData.append(name, value);
        });

        if ($('.contact form').valid() === true) {
            console.log(
                'Kết quả kiểm tra điều kiện là:' +
                ' ' +
                $('.contact form').valid()
            );
            $.ajax({
                url: url,
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    _thisBtn.attr('disabled', 'disabled');
                },
                success: function(res) {
                    alert(`${res.Message}`);
                    window.location.reload();
                    _thisBtn.removeAttr('disabled');
                },
            });
        } else {
            console.log(
                'Kết quả kiểm tra điều kiện là:' +
                ' ' +
                $('.contact form').valid()
            );
        }
    });
};

const ajaxFormResearch = () => {
    $('.btn.btn-subResearch button').on('click', function(e) {
        e.preventDefault();
        const _thisBtn = $(this);
        const url = _thisBtn.attr('data-url');
        const formData = new FormData();
        const nameText = $(
            '.research__login--form form .form-group textarea'
        ).attr('name');
        const valText = $(
            '.research__login--form form .form-group textarea'
        ).val();
        $('.research__login--form form .form-group input').each(function() {
            const name = $(this).attr('name');
            const value = $(this).val();
            formData.append(name, value);
        });
        formData.append(nameText, valText);
        if ($('.research__login--form form').valid() === true) {
            $.ajax({
                url: url,
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    _thisBtn.attr('disabled', 'disabled');
                },
                success: function(res) {
                    alert(`${res.Message}`);
                    window.location.reload();
                    _thisBtn.removeAttr('disabled');
                },
            });
        }
    });
};
// Add Class to active news page
const NewsAddClass = () => {
	if (document.querySelector('.news--item')) {
		var temp = document.querySelectorAll('.news--item');
		temp[0].classList.add("active");
		temp.forEach((item) => {
			item.addEventListener('click', () => {
				temp.forEach(item => {
					item.classList.remove("active");
				})
				item.classList.add("active");
			})
		})
	}
};

//playvideo
const playVideoIntroduct = () => {
        $(".introduct__video--img").click(function(e) {
            e.preventDefault();
            const id = $(".youtube-api").attr('id');
            let url = $('#' + id).attr('src');
            $(this).addClass('active');
            $('#' + id).attr('src', url + "&autoplay=1");
        });
    }
    //responses bg introduce
const setHeightBgIntroduce = () => {
        let heightBgIntroduct = $('.introduct__topContent').outerHeight();
        $("section.Introduct .introduct__bg img").css('height', heightBgIntroduct);
    }
    // Ajax Get Lib Image
const ajaxGetLibImage = () => {
	if ($('.item-image--tab')) {
		$('.item-image--tab').click(() => {
			console.log("get ajax image tab");
			const url = $('.item-image--tab').attr('data-url');
			$.ajax({
				type: 'get',
				url: url,
				processData: false,
				contentType: false,
				beforeSend: () => {
					loadToWaitRequest(true);
				},
				complete: () => {
					loadToWaitRequest(false);
					randomCodePopupImage();
					initializeLibImage__Slider_Popup();
					ajaxGetMoreLibImage();
				},
				success: (res) => {
					const item = res;
					const currentItem = $(".tab-content");
					currentItem.html(item);
				},
				error: (res) => {
					console.log(res);
				},
			});
		})
	}
};
// Ajax Get Lib Video
const ajaxGetLibVideo = () => {
	if ($('.item-video--tab')) {
		$('.item-video--tab').click(() => {
			console.log("get ajax video tab");
			const url = $('.item-video--tab').attr('data-url');
			$.ajax({
				type: 'get',
				url: url,
				processData: false,
				contentType: false,
				beforeSend: () => {
					loadToWaitRequest(true);
				},
				complete: () => {
					loadToWaitRequest(false);
					ajaxGetMoreLibVideo();
				},
				success: (res) => {
					const item =res;
					const currentItem = $(".tab-content");
					currentItem.html(item);
				},
				error: (res) => {
					console.log(res);
				},
			});
		})
	}
};
// Ajax Get Lib Document
const ajaxGetLibDocument = () => {
	if ($('.item-document--tab')) {
		$('.item-document--tab').click(() => {
			console.log("get ajax document tab");
			const url = $('.item-document--tab').attr('data-url');
			$.ajax({
				type: 'get',
				url: url,
				processData: false,
				contentType: false,
				beforeSend: () => {
					loadToWaitRequest(true);
				},
				complete: () => {
					loadToWaitRequest(false);
					getSVGs();
					customPopupDocument();
					EditAtrr();
					ajaxGetMoreLibDocument();
				},
				success: (res) => {
					const item = res;
					const currentItem = $(".tab-content");
					currentItem.html(item);
				},
				error: (res) => {
					console.log(res);
				}
			});
		})
	}
};
// Ajax Get all Lib Image
const ajaxGetMoreLibImage = () => {
	$('.see-more-images').click(() => {
		const url = $('.see-more-images').attr('data-url');
		console.log(url);
		$.ajax({
			type: 'get',
			url: url,
			beforeSend: () => {
				loadToWaitRequest(true);
			},
			complete: () => {
				loadToWaitRequest(false);
				randomCodePopupImage();
				initializeLibImage__Slider_Popup();
			},
			success: (res) => {
				const item =res;
				const currentItem = $(".tab-content");
				currentItem.html(item);
			},
			error: (res) => {
				console.log(res);
			},
		});
	});
};
// Ajax Get all Lib Video
const ajaxGetMoreLibVideo = () => {
	$('.see-more-video').click(() => {
		const url = $('.see-more-video').attr('data-url');
		$.ajax({
			type: 'get',
			url: url,
			processData: false,
			contentType: false,
			beforeSend: () => {
				loadToWaitRequest(true);
			},
			complete: () => {
				loadToWaitRequest(false);
			},
			success: (res) => {
				const item = res;
				const currentItem = $(".tab-content");
				currentItem.html(item);
			},
			error: (res) => {
				console.log(res);
			},
		});
	});
};
// Ajax Get all Lib Document
const ajaxGetMoreLibDocument = () => {
	$('.see-more-document').click(() => {
		const url = $(".see-more-document").attr("data-url");
		$.ajax({
			type: 'get',
			url: url,
			processData: false,
			contentType: false,
			beforeSend: () => {
				loadToWaitRequest(true);
			},
			complete: () => {
				loadToWaitRequest(false);
				getSVGs();
				customPopupDocument();
				EditAtrr();
			},
			success: (res) => {
				const item = res;
				const currentItem = $(".tab-content");
				currentItem.html(item);
			},
			error: (res) => {
				console.log(res);
			},
		});
	});
};
// Add Class To lib Document
const AddClassToLibDocument = () => {
	if (document.querySelector('.document--inner--content')) {
		document
			.querySelectorAll('.item__wrapper--inner')
			.forEach((item, index) => {
				if (index % 2 != 0) {
					item.style.float = 'right';
				}
			});
	}
};
// RamdomCode LibImage
const randomCodePopupImage = () => {
	let count = $('.modalimage');
	var i,
		code = [];
	for (i = 0; i < count.length; i++) {
		code[i] = '_' + Math.random().toString(36).substr(2, 9);
		$('.modalimage').eq(i).attr('id', code[i]);
		$('.item-gallery--popup')
			.eq(i)
			.attr('data-src', '#' + code[i]);
	}
};
//Edit Atrr download when server return lib document
const EditAtrr = () => {
	document.querySelectorAll(".item__wrapper--inner").forEach(item => {
		const url = item.querySelector(".document--popup-link").getAttribute("data-url")
		item.querySelector(".download-document--btn a").setAttribute("href" , `https://drive.google.com/u/0/uc?id=${url}&export=download`)
	})
}


// Lib Image popup
const Libary_Image_Popup = (id) => {
	const thumb = new Swiper(`${id} .slider--popup_thumb .swiper-container`, {
		spaceBetween: 10,
		slidesPerView: 3,
		observer: true,
		observeParents: true,
	});

	const slider = new Swiper(`${id} .slider--popup_main .swiper-container`, {
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: `${id} .slider--popup_main .swiper-button-next`,
			prevEl: `${id} .slider--popup_main .swiper-button-prev`,
		},
		thumbs: {
			swiper: thumb
		},
	});
	return slider;
};

// Lib Image SLIDER POPUP
const initializeLibImage__Slider_Popup = () => {
	const btn = document.querySelectorAll(
		'.item-gallery--popup[data-fancybox]'
	);
	btn.forEach((item) => {
		item.addEventListener('click', () => {
			var id = item.getAttribute("data-src");
			Libary_Image_Popup(id);
		});
	});
};

//down row content
const downRowContent = () => {
	const list = document.querySelectorAll(".committee__member--item p");
	let listT = [];
	list.forEach((item, index) => {
		listT.push(item.outerText);
	});
	for (var i = 0; i < listT.length; i++) {
		listT[i] = listT[i].replace(",", "<br>");
		$(".committee__member--item p").eq(i).html(listT[i]);
	}
}

//active menu
const activeLinkMenu = () => {
    var link = "";
    var url = window.location.pathname.split('/');
    if (url.length !== 4) {
        if (url[(url.length - 1)] == "") {
            link = url[(url.length - 2)];
        } else {
            link = url[(url.length - 1)];
        }
        $('.navBar__item  a').each(function() {
            var getHref = $(this).attr('href');
            var href = getHref.split('/').pop();
            if (href === link) {
                $(this).parent().addClass('active');
                $(this).parent().parent().parent().addClass('active');
            }
        });
    } else {
        $(".navBar__item").removeClass("active");
    }
}

//google recaptcha
const recaptchaGoogle = () => {
        $('#research__form').click(function(e) {
            e.preventDefault();
            grecaptcha.ready(function() {
                grecaptcha.execute('6LdderUZAAAAABSFUFr5dsSa_yWZgVhFsHnFy03d', {
                    action: 'submit'
                }).then(function(token) {
                    $("#research__recaptcha").val(token);
                    // Add your logic to submit to your backend server here.
                });
            });
        });
        $('#contact__form').click(function(e) {
            e.preventDefault();
            grecaptcha.ready(function() {
                grecaptcha.execute('6LdderUZAAAAABSFUFr5dsSa_yWZgVhFsHnFy03d', {
                    action: 'submit'
                }).then(function(token) {
                    $("#contact__recaptcha").val(token);
                    // Add your logic to submit to your backend server here.
                });
            });
        });

    }
    // Loading For Request
const loadToWaitRequest = (boolean) => {
        if (boolean === true) {
            $(".lib__page .loading--spinner").css("display", "flex")
            $(".lib__page .tab-content").css("display", "none")
        }
        if (boolean === false) {
            $(".lib__page .tab-content").css("display", "block")
            $(".lib__page .loading--spinner").css("display", "none")
        }
    }
    // See All Member
const seeMoreMember = () => {
        if (document.querySelector(".member__page")) {
            var listMember = document.querySelectorAll(".member--item")
            if (listMember.length > 12) {
                var temp = "<div class='see-more'><img class='lazyload blur-up' data-src='./assets/images/member/read-more.png' alt='something'><p>Xem tất cả</p></div>"
                $(".member__wrapper--inner").append(temp)
            }
            listMember.forEach((item, index) => {
                if (index > 11) {
                    item.style.display = "none"
                }
            })
            $(".member__page .see-more").click(() => {
                document.querySelectorAll(".member--item").forEach((item, index) => {
                    item.style.display = "block"
				})
				$(".member__page .see-more").remove();
            })
        }
    }
    //Popup Document Lib 
const customPopupDocument = () => {
	if (document.querySelector(".lib__page")) {
		var listDocument = document.querySelectorAll(".document-content-tab .document--popup-link")
		listDocument.forEach(item => {
			item.addEventListener("click", () => {
				const url = item.getAttribute("data-url");
				$("#popup--document iframe").attr("src", `https://drive.google.com/file/d/${url}/preview`);
				$("#popup--document a").attr("href", `https://drive.google.com/u/0/uc?id=${url}&export=download`);
				$("#popup--document .title").html(`${item.querySelector("h3").innerHTML}`)
				$("#popup--document .header--content").html(`${item.querySelector("p").innerHTML}`)
				
			})
		})
	}
}
//state of like button
const stateOfLikeButton = () => {
	var likeBtn = $(".lAS__listItem.like")
	var stateOfBtn = $(".lAS__listItem.like").attr("isLike");
	if (stateOfBtn == false) {
		$(likeBtn).find("h4").html("Thích <span>0</span>")
	}
	if (stateOfBtn == true) {
		$(likeBtn).find("h4").html("Bỏ Thích <span>0</span>")
	}
}
//get breadcrumb title
const getBreadcrumbTitle = () => {
	let title = $("#breadcrumb-wrapper ul li").last().text();
	$("#breadcrumb-wrapper ul li").last().addClass('active');
	$(".pagesBanner__title h1").text(title);
}
document.addEventListener('DOMContentLoaded', () => {
	Cookie();
	getSVGs();
	Loading();
	// COMMON CONTROLLER
	CommonController();
	// ACCOUNT CONTROLLER
	AccountController();
	// MAIN BANNER WEBSITE
	initMainBanner();
	// INIT Smooth Scrollbar
	initSmoothScrollbar();
	// AJAX FORM FOOTER
	ajaxFormFooter();
	// OPEN TARGET LINK FOOTER
	openTargetLinkFooter();
	// INIT CLASS SUB MENU
	initClassSubMenu();
	// INIT ELEMENT BUTTON BACK SUB MENU
	initElementButtonBackSubMenu();
	// SHOW SUB MENU MOBILE
	showSubMenuMobile();
	// SHOW INPUT SEARCH
	showInputSearch();
	// CHECK LOGIN
	actionsLoginPage();
	// SHOW BACK TO TOP
	showBackToTop();
	// COPY DATA BY ATTR
	copyDataByAttr();
	// ACTIVE LANGGUAGE
	activeLanguage();
	// HOme swiper Video
	sliderHomeVideo();
	// HOme swiper Image
	silderHomeImage();
	// Submit Contact Form
	ajaxFormContact();
	//Get News Content
	NewsAddClass();
	//AJAX get Libary Image
	ajaxGetLibImage();
	//AJAX get Libary Video
	ajaxGetLibVideo();
	//AJAX gget Libary document
	ajaxGetLibDocument();
	//play video
	playVideoIntroduct();
	//setHeightBgIntroduce
	setHeightBgIntroduce();
	//GET
	ajaxFormResearch();
	// AddClass
	AddClassToLibDocument();
	//downRowContent
	downRowContent();
	//activeLinkMenu
	activeLinkMenu();
	//Swiper Home banner
	sliderHotnewsHome();
	//Swiper home lib section
	sliderVideoBanner1();
	//Swiper home lib section 2
	sliderVideoBanner2();
	//Swiper home member section
	SliderHomeMemberSection();
	//recaptchaGoogle
	recaptchaGoogle();
	//See All Member
	seeMoreMember();
	//state of Like Btn
	stateOfLikeButton();
	//getBreadcrumbTitle
	getBreadcrumbTitle();
	//TAB

	const Libary__Tab = new Tab('.lib__page .tab-container');
});

window.addEventListener('resize', () => {
	// CHANGE CONTENT TABLE MOBILE
	changeContentMobile();
});

// CHECK FORM VALID
// if ($("form").valid() === true) {}
// console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".block-send-mail form").valid());
// console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".block-send-mail form").valid());