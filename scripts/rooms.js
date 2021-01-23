const choiceBtn = document.querySelectorAll('.choice__btn')
const actionsDescription = document.querySelectorAll('.actions__description')
const privilegeElem = document.querySelectorAll('.privilege__elem')

const burgerBtn = document.querySelector('#burgerBtn')
const navbar = document.querySelector('#navbar')

const expressFirstBtn = document.querySelector('#expressFirstBtn')
const expressLastBtn = document.querySelector('#expressLastBtn')
const choiceBtnExpress = document.querySelector('#choiceBtnExpress')

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
	let mapElement = document.getElementById('cappellaMap')

	let map = new google.maps.Map(mapElement, mapOptions)

	let marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		icon: '../svg/cappella/cappella-page-pointer.svg',
	})
}

google.maps.event.addDomListener(window, 'load', init)

choiceBtn.forEach(function (item) {
	item.addEventListener('click', function () {
		let currentBtn = item
		let tabId = currentBtn.getAttribute('data-tab')
		let currentTab = document.querySelectorAll(tabId)

		if (!currentBtn.classList.contains('active')) {
			choiceBtn.forEach(item => item.classList.remove('active'))

			expressFirstBtn.classList.remove('active')
			expressLastBtn.classList.remove('active')

			actionsDescription.forEach(item => item.classList.remove('active'))

			privilegeElem.forEach(item => item.classList.remove('active'))

			currentBtn.classList.add('active')

			currentTab.forEach(item => {
				item.classList.add('active')
			})
		}
	})
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

expressFirstBtn.addEventListener('click', function () {
	this.classList.toggle('active')
	document.querySelector('.express-tab-1').classList.toggle('active')
	document.querySelector('.express-tab-2').classList.remove('active')
	expressLastBtn.classList.remove('active')
})

expressLastBtn.addEventListener('click', function () {
	this.classList.toggle('active')
	document.querySelector('.express-tab-2').classList.toggle('active')
	document.querySelector('.express-tab-1').classList.remove('active')
	expressFirstBtn.classList.remove('active')
})