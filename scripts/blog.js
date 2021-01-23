const burgerBtn = document.querySelector('#burgerBtn')
const navbar = document.querySelector('#navbar')

$('.blog__slider').slick({
	swipe: false,
	infinite: true,
	draggable: false,
	slidesToShow: 1,
	fade: true,
	speed: 1000,
	prevArrow: '.blog__prev',
	nextArrow: '.blog__next',
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
