let startTimestamp;
let currentTimestamp;
let elapsedTime;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const stopwatchDisplay = document.getElementById('stopwatch-display');
const lapTimesContainer = document.getElementById('lap-times');

document.getElementById('start-button').addEventListener('click', startStopwatch);
document.getElementById('lap-button').addEventListener('click', recordLap);
document.getElementById('stop-button').addEventListener('click', stopStopwatch);
document.getElementById('reset-button').addEventListener('click', resetStopwatch);

function startStopwatch() {
    if (!isRunning) {
        startTimestamp = new Date().getTime();
        timerInterval = setInterval(updateStopwatchDisplay, 10);
        isRunning = true;
    }
}

function updateStopwatchDisplay() {
    currentTimestamp = new Date().getTime();
    elapsedTime = currentTimestamp - startTimestamp;
    stopwatchDisplay.innerHTML = formatTime(elapsedTime);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapTimeElement = document.createElement('div');
        lapTimeElement.className = 'lap-time-entry';
        lapTimeElement.innerHTML = `Lap ${lapCounter}: ${stopwatchDisplay.innerHTML}`;
        lapTimeElement.style.backgroundColor="white"
        lapTimeElement.style.padding="1rem"
        lapTimesContainer.appendChild(lapTimeElement);
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    stopwatchDisplay.innerHTML = "00:00:00.00";
    lapTimesContainer.innerHTML = "";
    isRunning = false;
    lapCounter = 0;
}
