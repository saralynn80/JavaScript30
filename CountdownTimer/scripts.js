let countdown;
// Could pop this in an IIFE

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	// Clear any existing timers
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	// Need this so it doesn't skip counting down the first second
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// Stop countdown at 0
		if (secondsLeft <= 0) {
			clearInterval(countdown);
			return;
		}
		// Display seconds left
		//console.log(secondsLeft);
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	// Convert to days hours minutes
	const days = Math.floor(seconds / (3600*24));
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor(seconds / 60);
	// Need remainderSeconds otherwise it only displays the initial amount of seconds
	const remainderSeconds = seconds % 60;
	// Padding on 02 seconds
	const display = `${days}:${hours}:${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
	// Update in the title
	document.title = display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	this.reset();
});