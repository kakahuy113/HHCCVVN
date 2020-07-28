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
		$('.likeqwe').on('click', function(e) {
			e.preventDefault();
			const url = $(this).attr('data-url');
		});
	} else {
		// ACTION FOR ISLOGIN = FALSE
		headerButtonLogin__wrapper.classList.remove('isLogin');
		headerLogged__wrapper.classList.remove('isLogin');
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
				itemPaste.text = itemCopy.text;
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
	let mainBanner = new Swiper('.MainSlider__Banners .swiper-container', {
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
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});

	var galleryTop = new Swiper('.lib__images--right .gallery-top', {
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
	var swiper = new Swiper(".home--hotnews .swiper-container", {
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
	});
};

const NewsAddClass = () => {
	if (document.querySelector('.news--item a')) {
		var temp = document.querySelectorAll('.news--item');
		temp.forEach((item) => {
			item.addEventListener('click' , () => {
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
//playvideo
const playVideoHome = () => {
	$(".swiper-slide .img").click(function(e) {
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

const ajaxGetLibImage = () => {
	if ($('.item-image--tab')) {
		const url = $('.item-image--tab').attr('data-url');
		$.ajax({
			type: 'get',
			url: url,
			processData: false,
			contentType: false,
			success: (res) => {
				// console.log(res);
			},
			error: (res) => {
				// console.log(res);
			},
		});
	}
};

const ajaxGetLibVideo = () => {
	if ($('.item-video--tab')) {
		const url = $('.item-video--tab').attr('data-url');
		$.ajax({
			type: 'get',
			url: url,
			processData: false,
			contentType: false,
			success: (res) => {
				// console.log(res);
			},
			error: (res) => {
				// console.log(res);
			},
		});
	}
};

const ajaxGetLibDocument = () => {
	if ($('.item-document--tab')) {
		const url = $('.item-document--tab').attr('data-url');
		$.ajax({
			type: 'get',
			url: url,
			processData: false,
			contentType: false,
			success: (res) => {
				// console.log(res);
			},
			error: (res) => {
				// console.log(res);
			},
		});
	}
};

const ajaxGetMoreLibImage = () => {
	$('.see-more-images').click(() => {
		const url = $('.see-more-images').attr('data-url');
		$.ajax({
			type: 'get',
			url: '../api/test.json',
			success: (res) => {
				// console.log(res);
			},
			error: (res) => {
				// console.log(res);
			},
		});
	});
};

const ajaxGetMoreLibVideo = () => {
	$('.see-more-video').click(() => {
		const url = $('.see-more-video').attr('data-url');
		$.ajax({
			type: 'get',
			url: url,
			processData: false,
			contentType: false,
			success: (res) => {
				// console.log(res);
			},
			error: (res) => {
				// console.log(res);
			},
		});
	});
};

const ajaxGetMoreLibDocument = () => {
	$('.see-more-document').click(() => {
		const url = $('.see-more-document').attr('data-url');
		$.ajax({
			type: 'get',
			url: url,
			processData: false,
			contentType: false,
			success: (res) => {
				// console.log(res);
			},
			error: (res) => {
				// console.log(res);
			},
		});
	});
};

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
//Ramdom code Popup Document
const randomCodePopupDocument = () => {
	let count = $('.popup--document');
	var i,
		code = [];
	for (i = 0; i < count.length; i++) {
		code[i] = '_' + Math.random().toString(36).substr(2, 9);
		$('.popup--document').eq(i).attr('id', code[i]);
		$('.document--popup-link')
			.eq(i)
			.attr('data-src', '#' + code[i]);
	}
};
// Lib Image popup
const Libary_Image_Popup = (id) => {
	const thumb = new Swiper(`${id} .slider--popup_thumb .swiper-container`, {
		spaceBetween: 10,
		slidesPerView: 3,
		observer: true,
		observeParents: true,
		loopedSlides: 5,
	});

	const slider = new Swiper(`${id} .slider--popup_main .swiper-container`, {
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		spaceBetween: 10,
		loop: true,
		loopedSlides: 5,
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

const loadding = () => {
	$(".member__wrapper--inner .loading--spinner").css("display", "flex")
	$(".member--list").css("display", "none")
	setTimeout(() => {
		$(".member--list").css("display", "flex")
		$(".member__wrapper--inner .loading--spinner").css("display", "none")
	}, 1000);
	document.querySelectorAll(".lib--list .lib--item").forEach((item) => {
		item.addEventListener('click', () => {
			$(".lib__page .tab-content").css("display" , "none")
			$(".lib__page .loading--spinner").css("display" , "flex")
			setTimeout(() => {
				$(".lib__page .tab-content").css("display" , "block")
				$(".lib__page .loading--spinner").css("display" , "none")
			}, 1000);
		});
	});
}

const SeeMoreMember = () => {
	document.querySelectorAll(".member--item").forEach((item , index) => {
		if(index > 11) {
			item.style.display = "none"
		}
	})
	$(".member__page .see-more").click( () => {
		document.querySelectorAll(".member--item").forEach((item , index) => {
			item.style.display = "block"
		})
	})
}

const OpenFileViewer = () => {
	if(document.querySelector(".lib__page__document")) {
		document.querySelectorAll(".wrapper--content--iframe iframe").forEach((item) => {
			var temp =item.getAttribute("src")
			item.setAttribute("src", "https://docs.google.com/viewer?url=" + temp)
		})
	}
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
	//File Viewer
	OpenFileViewer();
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
	// Ajax get more images
	ajaxGetMoreLibImage();
	// Ajax get more video
	ajaxGetMoreLibVideo();
	// Ajax get more document
	ajaxGetMoreLibDocument();
	//
	playVideoIntroduct();
	//setHeightBgIntroduce
	setHeightBgIntroduce();
	//  GET
	ajaxFormResearch();
	// AddClass
	AddClassToLibDocument();
	//  PopupSlider Image TAb
	initializeLibImage__Slider_Popup();
	//RandomCodePopUpImage
	randomCodePopupImage();
	//Random Code Popup Document
	randomCodePopupDocument();
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
	//PlayVideoHome
	playVideoHome();
	loadding();
	SeeMoreMember();
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