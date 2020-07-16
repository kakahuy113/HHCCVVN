import { getSVGs, Loading } from './util/utilities';
import Cookie from './lib/Cookie';

// MAIN BANNER WEBSITE
const init_MainBanner = () => {
	let mainBanner = new Swiper('.MainSlider__Banners .swiper-container', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		centeredSlides: true,
		speed: 1000,
		loop: true,
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

const init_Video = () => {
	var swiper = new Swiper('.swiper--left__wrapper .swiper-container', {
		// Enable lazy loading
		lazy: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper--left__wrapper .swiper-button-next',
			prevEl: '.swiper--left__wrapper .swiper-button-prev',
		},
	});
};
const init_Image = () => {
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
document.addEventListener('DOMContentLoaded', () => {
	Cookie();
	getSVGs();
	Loading();
	// MAIN BANNER WEBSITE
	init_MainBanner();
	// Home swiper Video
	init_Video();
	// HOme swiper Image
	init_Image();
});

document.addEventListener('DOMContentLoaded', () => {});

// CHECK FORM VALID
// if ($("form").valid() === true) {}
// console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".block-send-mail form").valid());
