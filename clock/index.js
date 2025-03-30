// Global variables
let secondsRemaining;
let isPaused = false;
let intervalId;
const TOTAL_SECONDS = 25 * 60; // 25 minutes in seconds
const INITIAL_MINUTES = 25;

$(() => {
  // Cache DOM elements
  const $start = $("#start");
  const $reset = $("#reset");
  const $pause = $("#pause");
  const $close = $("#close");
  const $open = $("#open");
  const $modal = $("#modal");
  const $time = $("#time");
  const $pomodoro = $("#pomodoro");
  const $hand = $("#hand");

  // Initialize timer display
  updateDisplay(INITIAL_MINUTES, 0);

  // Event handlers
  $open.on("click", () => $modal[0].showModal());

  $pause.on("click", pauseTimer);

  $start.on("click", () => {
    isPaused ? resumeTimer() : startTimer();
  });

  $reset.on("click", () => resetTimer(INITIAL_MINUTES));

  $close.on("click", () => {
    $modal[0].close();
    resetTimer(0);
  });

  // Timer functions
  function startTimer() {
    secondsRemaining = INITIAL_MINUTES * 60;
    isPaused = false;
    intervalId = setInterval(updateTimer, 1000);
  }

  function pauseTimer() {
    isPaused = true;
    clearInterval(intervalId);
  }

  function resumeTimer() {
    isPaused = false;
    intervalId = setInterval(updateTimer, 1000);
  }

  function resetTimer(minutes) {
    clearInterval(intervalId);
    isPaused = false;
    updateDisplay(minutes, 0);
    resetVisuals();
  }

  function updateTimer() {
    if (secondsRemaining < 0) {
      resetTimer(0);
      return;
    }

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    const progress = secondsRemaining / TOTAL_SECONDS;
    const degrees = 360 * (1 - progress) + 90;

    updateDisplay(minutes, seconds);
    updateVisuals(progress, degrees);
    secondsRemaining--;
  }

  function updateDisplay(minutes, seconds) {
    $time.html(`${minutes}:${seconds.toString().padStart(2, "0")}`);
  }

  function updateVisuals(progress, degrees) {
    $pomodoro.get(0).style.setProperty("--p", `${(1 - progress) * 100}%`);
    $hand.css("transform", `translate(-100%, -50%) rotate(${degrees}deg)`);
  }

  function resetVisuals() {
    $pomodoro.get(0).style.setProperty("--p", "0%");
    $hand.css("transform", `translate(-100%, -50%) rotate(90deg)`);
  }
});
