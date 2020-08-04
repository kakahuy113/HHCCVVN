import { getSVGs } from './util/utilities';
// Ajax Get Lib Image
 const ajaxGetLibImage = () => {
	if ($('.item-image--tab')) {
		$('.item-image--tab').click(() => {
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
// Ajax Get Lib Document
const ajaxGetLibDocument = () => {
	if ($('.item-document--tab')) {
		$('.item-document--tab').click(() => {
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
		item.querySelector(".download-document--btn a").setAttribute("href", `https://drive.google.com/u/0/uc?id=${url}&=download`)
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
//Popup Document Lib 
const customPopupDocument = () => {
	if (document.querySelector(".lib__page")) {
		var listDocument = document.querySelectorAll(".document-content-tab .document--popup-link")
		listDocument.forEach(item => {
			item.addEventListener("click", () => {
				const url = item.getAttribute("data-url");
				$("#popup--document iframe").attr("src", `https://drive.google.com/file/d/${url}/preview`);
				$("#popup--document a").attr("href", `https://drive.google.com/u/0/uc?id=${url}&=download`);
				$("#popup--document .title").html(`${item.querySelector("h3").innerHTML}`)
				$("#popup--document .header--content").html(`${item.querySelector("p").innerHTML}`)
			})
		})
	}
}
document.addEventListener('DOMContentLoaded', () => {
	//AJAX get Libary Image
	ajaxGetLibImage();
	//AJAX get Libary Video
	ajaxGetLibVideo();
	//AJAX gget Libary document
	ajaxGetLibDocument();
})