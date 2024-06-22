let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let display = document.getElementById('display');
let laps = document.getElementById('laps');

let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopBtn.innerHTML = "Stop";
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
    } else {
        startStopBtn.innerHTML = "Start";
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerHTML = "Start";
    difference = 0;
    display.innerHTML = "00:00:00:00";
    laps.innerHTML = "";
    lapCounter = 0;
});

lapBtn.addEventListener('click', () => {
    if (running) {
        lapCounter++;
        let lapTime = display.innerHTML;
        let lapElement = document.createElement('div');
        lapElement.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
});

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}
