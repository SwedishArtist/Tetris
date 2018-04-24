let currentTimeSong1     = undefined;
let clickSound           = new Audio('sound/click.mp3');
let song1                = new Audio('sound/music/zentrixDFS.mp3');
let volumeSlider         = document.getElementById('volumeSlider');
let sentCurrentTimeSong1 = sessionStorage.getItem('song1Time');
song1.currentTime        = sentCurrentTimeSong1;
let sentVolume           = sessionStorage.getItem('songVolume');

if (sentVolume != null) {
	song1.volume = sentVolume;
	volumeSlider.setAttribute('value', sentVolume * 100);
}

setVolume();
song1.play();

song1.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

volumeSlider.addEventListener('mousemove', setVolume);

function setVolume() {
	song1.volume = volumeSlider.value / 100;
	sessionStorage.setItem('songVolume', song1.volume)
}

song1.addEventListener('timeupdate',function() {
    currentTimeSong1 = song1.currentTime;
}, false);

function sendAudio() {
  clickSound.play();
  clickSound.currentTime = 0;
  sessionStorage.setItem('song1Time', currentTimeSong1);
}

function dropFunc() {
	document.getElementById('myDropdown').classList.toggle('show');
}

function click() {
	clickSound.play();
    clickSound.currentTime = 0;
}

window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
		let dropdowns = document.getElementsByClassName('dropdown-content');
		let i;
		for (i = 0; i < dropdowns.length; i++) {
			let openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	} else {
		clickSound.play();
    	clickSound.currentTime = 0;
	}
};