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
	initMainBanner();
	// INIT CLASS SUB MENU
	initClassSubMenu();
});

document.addEventListener('DOMContentLoaded', () => {});



// CHECK FORM VALID
// if ($("form").valid() === true) {}
// console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".block-send-mail form").valid());