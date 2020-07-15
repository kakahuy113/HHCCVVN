import {
	getSVGs,
	Loading
} from './util/utilities';
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
	})
}

document.addEventListener('DOMContentLoaded', () => {
	Cookie();
	getSVGs();
	Loading();
	// MAIN BANNER WEBSITE
	init_MainBanner();
});

document.addEventListener('DOMContentLoaded', () => {});



// CHECK FORM VALID
// if ($("form").valid() === true) {}
// console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".block-send-mail form").valid());