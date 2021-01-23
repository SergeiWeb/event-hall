const scopeBtn = document.querySelector('.scope__btn')
const scopePoints = document.querySelector('.scope__points')
const scopeClose = document.querySelector('.scope__close')

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