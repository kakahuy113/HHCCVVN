import {
    getSVGs,
    Loading
} from './util/utilities';
import Cookie from './lib/Cookie';
import Tab from './lib/Tab';
// INIT CLASS SUB MENU
const initClassSubMenu = () => {
    const items__MainMenu = document.querySelectorAll(
        '.navbottom__wrapper>.navBar>.navBar__item'
    );

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
};

const initElementButtonBackSubMenu = () => {
    const menusLv1 = document.querySelectorAll('.navBar--lv1');
    menusLv1.forEach((item) => {
        const htmlLang = document.querySelector('html').getAttribute('lang');
        const btn__vi = item.getAttribute('data-btn-back-content-vi');
        const btn__en = item.getAttribute('data-btn-back-content-en');
        const btn__df = `<div class="navBar__item navBar__item--lv1"><div class="navBar__back">Trở về</div></div>`;
    })
}

const showSubMenuMobile = () => {
    const btn = document.querySelector('.navBarHamburger__wrapper');
    const mainMenu = document.querySelector('.navbottom__wrapper>.navBar');
    const items__IsHaveSubMenu = document.querySelectorAll('.isHaveSubMenu');

    // SHOW MAIN MENU !!!
    if (btn) {
        btn.addEventListener('click', (e) => {
            btn.classList.toggle('active');
            mainMenu.classList.toggle('show');
            // CLOSE ALL SUB MENU
            items__IsHaveSubMenu.forEach((item) => {
                item.querySelector('.navBar--lv1').classList.remove('show');
            })
        })
    } else {
        console.log(`Không tồn tại element :=> .navBarHamburger__wrapper`)
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
            })
        } else {
            console.log(`Không tồn tại element :=> .navBar__back`);
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
};

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

const ajaxNews = () => {
    if (document.querySelector('.news--item')) {
        document.querySelector('.news--item').addEventListener('click', (e) => {
            $.ajax({
                url: 'get',
                type: 'get',
                data: 'something',
                processData: false,
                contentType: false,
                success: (res) => {
                    console.log(res);
                },
                error: (res) => {
                    console.log(res);
                },
            });
        });
    }
};

const ajaxEvents = () => {
    if (document.querySelector('.events--item')) {
        document
            .querySelector('.events--item')
            .addEventListener('click', (e) => {
                $.ajax({
                    url: 'get',
                    type: 'get',
                    data: 'something',
                    processData: false,
                    contentType: false,
                    success: (res) => {
                        console.log(res);
                    },
                    error: (res) => {
                        console.log(res);
                    },
                });
            });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Cookie();
    getSVGs();
    Loading();
    // MAIN BANNER WEBSITE
    initMainBanner();
    // INIT CLASS SUB MENU
    initClassSubMenu();
    // INIT ELEMENT BUTTON BACK SUB MENU
    initElementButtonBackSubMenu();
    // SHOW SUB MENU MOBILE
    showSubMenuMobile();
    sliderHomeVideo();
    // HOme swiper Image
    silderHomeImage();
    // Submit Contact Form
    ajaxFormContact();
    //Get News Content
    ajaxNews();
    // Get Event Content
    ajaxEvents();

    //TAB
    const Libary__Tab = new Tab('.lib__page .tab-container');
});

document.addEventListener('DOMContentLoaded', () => {});

// CHECK FORM VALID
// if ($("form").valid() === true) {}
// console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".block-send-mail form").valid());