var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')

var score = 0
var isGameStarted = false
var colors = ['#000', '#567aff', '#c1a8f7', '#d78d80', '#fdbd40', '#2a5482', '#bf3e8c', '#ecd254', '#a9d39e', '#35dcd9', '#1548ef', '#17dfb8', '#173bb9', ]

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTimer)

function show($el) {
	$el.classList.remove('hide')
}

function hide($el) {
	$el.classList.add('hide')
}




function startGame() {
	score = 0
	setGameTimer()
	$gameTime.setAttribute('disabled')

	isGameStarted = true
	hide($start)
	$game.style.backgroundColor = '#fff'

	var interval = setInterval(() => {
		var time = parseFloat($time.textContent)
		if (time <= 0) {
			clearInterval(interval)
			endGame()
		} else {
			$time.textContent = (time - 0.1).toFixed(1)
		}
	}, 100)

	renderBox()
}

function endGame() {
	isGameStarted = false
	SetGameScore()
	$gameTime.removeAttribute('disabled')
	show($start)
	$game.style.backgroundColor = '#ccc'
	$game.innerHTML = ''
	hide($timeHeader)
	show($resultHeader)

}

function setGameTimer() {
	var time = +$gameTime.value
	$time.textContent = time.toFixed(1)
	show($timeHeader)
	hide($resultHeader)
}

function SetGameScore() {
	$result.textContent = score.toString()
}

function handleBoxClick(e) {
	if (!isGameStarted == true) {
		return
	}
	if (e.target.dataset.box) {
		score++
		renderBox()
	}

}

function renderBox() {
	$game.innerHTML = ''

	var box = document.createElement('div')
	var boxSize = getRand(30, 100)
	var gameSize = $game.getBoundingClientRect()
	var maxTop = gameSize.height - boxSize
	var maxLeft = gameSize.width - boxSize

	box.style.height = box.style.width = boxSize + 'px'
	box.style.position = 'absolute'
	box.style.backgroundColor = colors[getRand(0, colors.length)]
	box.style.top = getRand(0, maxTop) + 'px'
	box.style.left = getRand(0, maxLeft) + 'px'
	box.style.cursor = 'pointer'
	box.setAttribute('data-box', 'true')

	$game.insertAdjacentElement('afterbegin', box)
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}