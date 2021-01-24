const burgerBtn = document.querySelector('#burgerBtn')
const navbar = document.querySelector('#navbar')

const swiper = new Swiper('.swiper-container', {
	slidesPerView: 3,
	spaceBetween: 30,
	centeredSlides: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		920: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		600: {
			slidesPerView: 2,
			spaceBetween: 15,
		},
		300: {
			slidesPerView: 1,
		}
	},
})

swiper.slideTo(1)

$('.news__slider').slick({
	infinite: true,
	slidesToShow: 2,
	prevArrow: '.news__prev',
	nextArrow: '.news__next',
	responsive: [
		{
			breakpoint: 680,
			settings: {
				slidesToShow: 1,
			},
		},
	],
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
	let mapElement = document.getElementById('kebabMap')

	let map = new google.maps.Map(mapElement, mapOptions)

	let marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		icon: '../svg/kebab/contacts-point.svg',
	})
}

google.maps.event.addDomListener(window, 'load', init)

burgerBtn.addEventListener('click', function () {
	this.classList.toggle('active')
	navbar.classList.toggle('open-menu')
	document.body.classList.toggle('no-scroll')
})

function removeClasses() {
	burgerBtn.classList.remove('active')
	navbar.classList.remove('open-menu')
	document.body.classList.remove('no-scroll')
}

document.querySelectorAll('.header .navbar__item').forEach(item => {
	if (!item.classList.contains('drop-list'))
		item.addEventListener('click', removeClasses)
})

document.querySelector('#navMask').addEventListener('click', removeClasses)
