let focusTime = 25 * 60;
let breakTime = 5 * 60;

let time = focusTime;
let isFocus = true;
let interval = null;

let sessions = localStorage.getItem("sessions")
  ? parseInt(localStorage.getItem("sessions"))
  : 0;

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  document.getElementById("timer").innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    time--;
    updateDisplay();

    if (time <= 0) {
      clearInterval(interval);
      interval = null;

      if (isFocus) {
        sessions++;
        localStorage.setItem("sessions", sessions);
        growPlant();
        switchToBreak();
      } else {
        switchToFocus();
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  time = isFocus ? focusTime : breakTime;
  updateDisplay();
}

function switchToBreak() {
  isFocus = false;
  time = breakTime;
  document.getElementById("mode").innerText = "Break Time ☕";
  document.body.className = "break";
  updateDisplay();
}

function switchToFocus() {
  isFocus = true;
  time = focusTime;
  document.getElementById("mode").innerText = "Focus Mode 🌸";
  document.body.className = "focus";
  updateDisplay();
}

function growPlant() {
  const plant = document.getElementById("plant");

  if (sessions >= 1) plant.innerText = "🌿";
  if (sessions >= 3) plant.innerText = "🌸";
}

function applySettings() {
  stopTimer();  // important

  let focusValue = parseInt(document.getElementById("focusInput").value);
  let breakValue = parseInt(document.getElementById("breakInput").value);

  if (!isNaN(focusValue) && focusValue > 0) {
    focusTime = focusValue * 60;
  }

  if (!isNaN(breakValue) && breakValue > 0) {
    breakTime = breakValue * 60;
  }

  time = isFocus ? focusTime : breakTime;
  updateDisplay();
}

growPlant();
updateDisplay();
