const timeElement = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapsElement = document.getElementById("laps");

let intervalId;
let startTime;
let elapsedTime = 0;

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const secondsStr = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;
    const minutesStr = minutes % 60 < 10 ? "0" + (minutes % 60) : minutes % 60;
    const hoursStr = hours < 10 ? "0" + hours : hours;

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
        const now = Date.now();
        elapsedTime = now - startTime;
        timeElement.textContent = formatTime(elapsedTime);
    }, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pause() {
    clearInterval(intervalId);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function reset() {
    clearInterval(intervalId);
    elapsedTime = 0;
    timeElement.textContent = "00:00:00";
    lapsElement.innerHTML = "";
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function lap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapsElement.appendChild(lapItem);
}

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);