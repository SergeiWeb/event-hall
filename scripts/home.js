const homeItems = document.querySelectorAll('.home__item')
const burgerBtn = document.querySelector('#burgerBtn')
const navbar = document.querySelector('#navbar')

const homeNext = document.querySelector('.home__next')

let is_allow_scroll = true
let isScroll = true

const sliderContent = $('.slider-content')
	.slick({
		vertical: true,
		verticalSwiping: true,
		infinite: false,
		draggable: false,
		swipe: true,
		dots: true,
		appendDots: $('.fp-bullets-slider'),
		customPaging: function (slider, i) {
			const dataTooltip = $(slider.$slides[i]).data('tooltip')
			return `
				<span class="fp-bullets-dot"></span>
				<span class="fp-bullets-tooltip">${dataTooltip}</span>
			`
		},
		slidesToShow: 1,
		prevArrow: '.our__prev',
		nextArrow: '.our__next',
		cssEase: 'ease',
		speed: 500,
	})
	.on('wheel', function (event) {
		if (is_allow_scroll) {
			is_allow_scroll = false

			setTimeout(() => (is_allow_scroll = true), 500)

			if (event.originalEvent.deltaY > 0) {
				if (
					!(
						$(this).slick('slickCurrentSlide') ==
						$(this).find('.section-slide').length - 1
					)
				) {
					event.preventDefault()
					$(this).slick('slickNext')
				} else {
					fullpage_api.setAllowScrolling(true, 'down')
					isScroll = true
					return
				}

				if ($(this).slick('slickCurrentSlide') == 0) {
					changeActiveClass('bullets-slide-0')
				}

				if ($(this).slick('slickCurrentSlide') == 1) {
					changeActiveClass('bullets-slide-1')
				}

				if (
					$(this).slick('slickCurrentSlide') ==
					$(this).find('.section-slide').length - 1
				) {
					changeActiveClass('bullets-slide-2')
				}
			} else {
				if ($(this).slick('slickCurrentSlide') == 0) {
					fullpage_api.setAllowScrolling(true, 'up')
					// fullpage_api.setAllowScrolling(false, 'down')

					changeActiveClass('bullets-slide-0')
					return
				}

				if ($(this).slick('slickCurrentSlide') == 1) {
					fullpage_api.setAllowScrolling(false)

					changeActiveClass('bullets-slide-1')
				}

				if (
					$(this).slick('slickCurrentSlide') ==
					$(this).find('.section-slide').length - 1
				) {
					changeActiveClass('bullets-slide-2')
				}

				event.preventDefault()
				$(this).slick('slickPrev')
			}
		}
	})
	.on('afterChange', function (event, slick, currentSlide, nextSlide) {
		for (const item of slick.$slides) {
			if (item.classList.contains('slick-current')) {
				document.querySelector('.home__block').style.backgroundImage =
					`url('${item.getAttribute('data-bg')}')` || '#313643'
			}
		}

		if (slick.$slides[0].classList.contains('slick-active') && !isScroll) {
			fullpage_api.setAllowScrolling(true, 'up')
			isScroll = true

			changeActiveClass('bullets-slide-0')
		}

		if (slick.$slides[1].classList.contains('slick-active')) {
			fullpage_api.setAllowScrolling(false)
			isScroll = false

			changeActiveClass('bullets-slide-1')
		}

		if (
			slick.$slides[slick.$slides.length - 1].classList.contains('slick-active')
		) {
			fullpage_api.setAllowScrolling(true, 'down')
			isScroll = true

			changeActiveClass('bullets-slide-2')
		}
	})
	.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		for (const item of slick.$slides) {
			if (item.classList.contains('slick-current')) {
				document.querySelector('.home__block').style.backgroundImage =
					`url('${item.getAttribute('data-bg')}')` || '#313643'
			}
		}

		if (slick.$slides[0].classList.contains('slick-active')) {
			fullpage_api.setAllowScrolling(true, 'up')
			isScroll = true

			changeActiveClass('bullets-slide-0')
		}

		if (slick.$slides[1].classList.contains('slick-active')) {
			fullpage_api.setAllowScrolling(false)
			isScroll = false
			changeActiveClass('bullets-slide-1')
		}

		if (
			slick.$slides[slick.$slides.length - 1].classList.contains('slick-active')
		) {
			fullpage_api.setAllowScrolling(true, 'down')
			isScroll = true
			changeActiveClass('bullets-slide-2')
		}
	})

$('.fp-bullets-slider .slick-dots li').addClass('fp-bullets-item')

for (let i = 0; i < $('.fp-bullets-slider .slick-dots li').length; i++) {
	$('.fp-bullets-slider .slick-dots li')[i].classList.add(`bullets-slide-${i}`)
}

const fpBulletsItem = document.querySelectorAll('.fp-bullets-item')

for (let i = 0; i < fpBulletsItem.length; i++) {
	const elem = fpBulletsItem[i]

	elem.addEventListener('click', event => {
		for (let k = 0; k < fpBulletsItem.length; k++) {
			fpBulletsItem[k].classList.remove('active')
		}

		if (elem.classList.contains('bullets-home')) {
			elem.classList.add('active')
			fullpage_api.moveTo(1, 0)
			$('.slider-content').slick('slickGoTo', sliderContent[0].slick.$slides[0])
		}

		if (elem.classList.contains('bullets-slide-0')) {
			elem.classList.add('active')
			fullpage_api.moveTo(2, 0)
			$('.slider-content').slick('slickGoTo', sliderContent[0].slick.$slides[0])
		}

		if (elem.classList.contains('bullets-slide-1')) {
			elem.classList.add('active')
			fullpage_api.moveTo(2, 0)
			$('.slider-content').slick('slickGoTo', sliderContent[0].slick.$slides[1])
		}

		if (elem.classList.contains('bullets-slide-2')) {
			elem.classList.add('active')
			fullpage_api.moveTo(2, 0)
			$('.slider-content').slick(
				'slickGoTo',
				sliderContent[0].slick.$slides.length - 1
			)
		}

		if (elem.classList.contains('bullets-contacts')) {
			elem.classList.add('active')
			fullpage_api.moveTo(3, 0)
			$('.slider-content').slick(
				'slickGoTo',
				sliderContent[0].slick.$slides.length - 1
			)
		}
	})
}

function changeActiveClass(clasName = '') {
	for (let i = 0; i < fpBulletsItem.length; i++) {
		fpBulletsItem[i].classList.remove('active')

		if (fpBulletsItem[i].classList.contains(clasName)) {
			fpBulletsItem[i].classList.add('active')
		}
	}
}

const fpSlider = new fullpage('#fullpage', {
	continuousVertical: false,
	navigation: false,
	sectionSelector: '.home__item',
	css3: true,
	afterLoad(anchorLink, index) {
		document.querySelector('.who').classList.contains('active')
			? document.querySelector('#aboutLink').classList.add('active')
			: document.querySelector('#aboutLink').classList.remove('active')

		document.querySelector('.contacts').classList.contains('active')
			? document.querySelector('#contactsLink').classList.add('active')
			: document.querySelector('#contactsLink').classList.remove('active')

		if (index.isFirst) {
			changeActiveClass('bullets-home')
			fullpage_api.setAllowScrolling(true)
		}

		if ((index.isFirst && isScroll) || (index.index == 0 && isScroll)) {
			fullpage_api.setAllowScrolling(true)
			setInterval(() => (isScroll = true), 1500)

			changeActiveClass('bullets-home')
		}

		if (index.index == 1 || !isScroll) {
			fullpage_api.setAllowScrolling(true, 'up')
			fullpage_api.setAllowScrolling(false, 'down')
			isScroll = false

			if (
				sliderContent[0].slick.$slides[0].classList.contains('slick-active')
			) {
				changeActiveClass('bullets-slide-0')
			} else if (
				sliderContent[0].slick.$slides[1].classList.contains('slick-active')
			) {
				changeActiveClass('bullets-slide-1')
			} else if (
				sliderContent[0].slick.$slides[
					sliderContent[0].slick.$slides.length - 1
				].classList.contains('slick-active')
			) {
				changeActiveClass('bullets-slide-2')
			}
		} else {
			fullpage_api.setAllowScrolling(true)
			isScroll = true
		}

		if ((index.isLast && isScroll) || (index.index == 2 && isScroll)) {
			isScroll = true
			fullpage_api.setAllowScrolling(true, 'up')
			homeNext.style.transform = 'scale(0)'
			setInterval(() => (isScroll = true), 1500)

			changeActiveClass('bullets-contacts')
		} else {
			fullpage_api.setAllowScrolling(false, 'up')
			homeNext.style.transform = 'none'
		}
	},
	onLeave(index, nextIndex, direction) {
		if (nextIndex.isFirst) {
			changeActiveClass('bullets-home')
			fullpage_api.setAllowScrolling(true)
		}

		if (nextIndex.isFirst || (nextIndex.index == 0 && isScroll)) {
			fullpage_api.setAllowScrolling(true)
			isScroll = true
		}

		if (nextIndex.index == 1) {
			fullpage_api.setAllowScrolling(true, 'up')
			fullpage_api.setAllowScrolling(false, 'down')
			isScroll = false
		} else {
			fullpage_api.setAllowScrolling(true)
			isScroll = true
		}

		if (nextIndex.isLast || (nextIndex.index == 2 && isScroll)) {
			isScroll = true
			fullpage_api.setAllowScrolling(true, 'up')
			homeNext.style.transform = 'scale(0)'
		} else {
			fullpage_api.setAllowScrolling(false, 'up')
			homeNext.style.transform = 'none'
		}
	},
})

// console.log(fullpage_api.getActiveSection())
// console.log(fullpage_api.getActiveSlide())

$(document).on('click', '.home__next', function () {
	fullpage_api.moveSectionDown()
})

$(document).on('click', '#aboutLink', function (event) {
	event.preventDefault()

	if (navbar.classList.contains('open-menu')) {
		navbar.classList.remove('open-menu')
		burgerBtn.classList.remove('active')
	}

	fullpage_api.moveTo(1, 0)
})

$(document).on('click', '#contactsLink', function (event) {
	event.preventDefault()

	if (navbar.classList.contains('open-menu')) {
		navbar.classList.remove('open-menu')
		burgerBtn.classList.remove('active')
	}

	fullpage_api.moveTo(3, 0)
})

$('#scrollTopBtn').click(function () {
	fullpage_api.moveTo(1, 0)
})

$('.slider-wrapper').slick({
	infinite: false,
	initialSlide: 1,
	swipe: true,
	prevArrow: '.who__slider-prev',
	nextArrow: '.who__slider-next',
	infinite: true,
})

function init() {
	const coordinates = { lat: 31.974034869073954, lng: 34.801772305921595 }
	let mapOptions = {
		zoom: 18,

		center: coordinates,

		styles: [
			{
				stylers: [
					{
						hue: '#ff1a00',
					},
					{
						invert_lightness: true,
					},
					{
						saturation: -100,
					},
					{
						lightness: 33,
					},
					{
						gamma: 0.5,
					},
				],
			},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [
					{
						color: '#2D333C',
					},
				],
			},
		],
	}
	let mapElement = document.getElementById('map')

	let map = new google.maps.Map(mapElement, mapOptions)

	let marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		icon: '../svg/contacts-pointer.svg',
	})
}

google.maps.event.addDomListener(window, 'load', init)

burgerBtn.addEventListener('click', function () {
	this.classList.toggle('active')
	navbar.classList.toggle('open-menu')
})

document.querySelector('#navMask').addEventListener('click', () => {
	burgerBtn.classList.remove('active')
	navbar.classList.remove('open-menu')
})
