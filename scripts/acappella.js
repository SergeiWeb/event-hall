const scopeBtn = document.querySelector('.scope__btn')
const scopePoints = document.querySelector('.scope__points')
const scopeClose = document.querySelector('.scope__close')
const burgerBtn = document.querySelector('#burgerBtn')
const navbar = document.querySelector('#navbar')

$('.gallery__slider').slick({
	infinite: true,
	slidesToShow: 2,
	initialSlide: 1,
	prevArrow: '.gallery__prev',
	nextArrow: '.gallery__next',
	responsive: [
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
			},
		},
	],
})

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
	let mapElement = document.getElementById('cappellaMap')

	let map = new google.maps.Map(mapElement, mapOptions)

	let marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		icon: '../svg/cappella/cappella-page-pointer.svg',
	})
}

google.maps.event.addDomListener(window, 'load', init)

scopeBtn.addEventListener('click', event => {
	event.preventDefault()

	if (!scopePoints.classList.contains('active')) {
		scopePoints.classList.add('active')
	}
})

scopeClose.addEventListener('click', event => {
	event.preventDefault()
	if (scopePoints.classList.contains('active')) {
		scopePoints.classList.remove('active')
	}
})

$(window).scroll(function () {
	const scope = document.querySelector('.scope')

	window.pageYOffset >= $('#header').height() - 150
		? scope.classList.add('scroll')
		: scope.classList.remove('scroll')
})

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

document
	.querySelectorAll('.header .navbar__item .dropdown__item')
	.forEach(item => item.addEventListener('click', removeClasses))
