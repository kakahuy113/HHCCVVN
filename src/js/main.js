import {
	getSVGs,
	Loading
} from './util/utilities';
import Cookie from './lib/Cookie';

// INIT CLASS SUB MENU
const initClassSubMenu = () => {
	const items__MainMenu = document.querySelectorAll('.navbottom__wrapper>.navBar>.navBar__item');

	items__MainMenu.forEach((item) => {
		const isHaveSub = item.querySelectorAll('.navBar');
		// CHECK MAIN MENU IS HAVE SUB ???
		if (isHaveSub.length > 0) {
			// ADD CLASS IS HAVE SUB
			item.classList.add('isHaveSubMenu');
			// ADD CLASS LIST MENU LV1
			isHaveSub.forEach((item) => {
				item.classList.add('navBar--lv1')
			})
			// ADD CLASS ITEM MENU LV1
			const items__MenuLv1 = item.querySelectorAll('.navBar__item');
			items__MenuLv1.forEach((item) => {
				item.classList.add('navBar__item--lv1')
			})
		}
	})
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
		spaceBetween: 10,
		navigation: {
			nextEl: '.lib__images--right .swiper-button-next',
			prevEl: '.lib__images--right .swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});
}

const ajaxFormContact = () => {
	$(".contact form .form-button").on('click', function (e) {
		e.preventDefault();
		const _thisBtn = $(this);
		const url = _thisBtn.attr('data-url');
		const formData = new FormData();
		$('.contact form .form-group input').each(function () {
			const name = $(this).attr('name');
			const value = $(this).val();
			formData.append(name, value);
		});

		if ($(".contact form").valid() === true) {
			console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".contact form").valid());
			$.ajax({
				url: url,
				type: 'post',
				data: formData,
				processData: false,
				contentType: false,
				beforeSend: function () {
					_thisBtn.attr('disabled', 'disabled');
				},
				success: function (res) {
					alert(`${res.Message}`);
					window.location.reload();
					_thisBtn.removeAttr('disabled');
				},
			});
		} else {
			console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".contact form").valid());
		}
	});
}

const ajaxNews = () => {
	document.querySelector(".news--item").addEventListener("click" , (e) => {
		$.ajax({
			url: 'get',
			type: 'get',
			data: 'something',
			processData: false,
			contentType: false,
			success:  (res) => {
				console.log(res);
			},
			error: (res) => {
				console.log(res);
			}
		});
	})
}
const ajaxEvents = () => {
	document.querySelector(".events--item").addEventListener("click" , (e) => {
		$.ajax({
			url: 'get',
			type: 'get',
			data: 'something',
			processData: false,
			contentType: false,
			success:  (res) => {
				console.log(res);
			},
			error: (res) => {
				console.log(res);
			}
		});
	})
}


document.addEventListener('DOMContentLoaded', () => {
	Cookie();
	getSVGs();
	Loading();
	// MAIN BANNER WEBSITE
	initMainBanner();
	// INIT CLASS SUB MENU
	initClassSubMenu();
	// Home swiper Video
	sliderHomeVideo();
	// HOme swiper Image
	silderHomeImage();
	// Submit Contact Form
	ajaxFormContact();
	//Get News Content
	ajaxNews()
	// Get Event Content
	ajaxEvents()
});

document.addEventListener('DOMContentLoaded', () => {});

// CHECK FORM VALID
// if ($("form").valid() === true) {}
// console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".block-send-mail form").valid());