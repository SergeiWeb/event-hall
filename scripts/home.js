const homeItems = document.querySelectorAll('.home__item')
const burgerBtn = document.querySelector('#burgerBtn')
const navbar = document.querySelector('#navbar')

let tooltipArr = []

for (const item of homeItems) {
	tooltipArr.push(item.getAttribute('data-tooltip'))
}

const myFullpage = new fullpage('#fullpage', {
	continuousVertical: false,
	navigation: true,
	sectionSelector: '.home__item',
	navigationPosition: 'left',
	showActiveTooltip: true,
	css3: true,
	navigationTooltips: tooltipArr,
	afterLoad() {
		document.querySelector('.who').classList.contains('active')
			? document.querySelector('#aboutLink').classList.add('active')
			: document.querySelector('#aboutLink').classList.remove('active')

		document.querySelector('.contacts').classList.contains('active')
			? document.querySelector('#contactsLink').classList.add('active')
			: document.querySelector('#contactsLink').classList.remove('active')
	},
})

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
	prevArrow: '.who__slider-prev',
	nextArrow: '.who__slider-next',
	infinite: true,
})

$('.slider-content')
	.slick({
		vertical: true,
		verticalSwiping: true,
		infinite: false,
		draggable: false,
		swipe: false,
		slidesToShow: 1,
		prevArrow: '.our__prev',
		nextArrow: '.our__next',
		cssEase: 'linear',
	})
	.on('afterChange', function (event, slick, currentSlide, nextSlide) {
		for (const item of slick.$slides) {
			if (item.classList.contains('slick-current')) {
				document.querySelector(
					'.home__block'
				).style.backgroundImage = `url('${item.getAttribute('data-bg')}')`
				console.log(item.getAttribute('data-bg'))
			}
		}
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
