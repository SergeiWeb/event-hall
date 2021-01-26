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
			breakpoint: 540,
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

$(document).ready(function () {
	$('.select').niceSelect()
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
	let mapElement = document.getElementById('baruBeerMap')

	let map = new google.maps.Map(mapElement, mapOptions)

	let marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		icon: '../svg/bar/barbeer-page-pointer.svg',
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

document
	.querySelectorAll('.header .navbar__item .dropdown__item')
	.forEach(item => item.addEventListener('click', removeClasses))
