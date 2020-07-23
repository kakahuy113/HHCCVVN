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
                    // console.log(res);
                },
                error: (res) => {
                    // console.log(res);
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
                        // console.log(res);
                    },
                    error: (res) => {
                        // console.log(res);
                    },
                });
            });
    }
};

//playvideo
const playVideoIntroduct = () => {
    const id = $(".youtube-api").attr('id');
    let url = $('#' + id).attr('src');
    console.log(id);
    $(".introduct__video--img").click(function(e) {
        e.preventDefault();
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
    ajaxNews();
    // Get Event Content
    ajaxEvents();
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
    //TAB
    const Libary__Tab = new Tab('.lib__page .tab-container');
});

document.addEventListener('DOMContentLoaded', () => {});

// CHECK FORM VALID
// if ($("form").valid() === true) {}
// console.log('Kết quả kiểm tra điều kiện là:' + ' ' + $(".block-send-mail form").valid());