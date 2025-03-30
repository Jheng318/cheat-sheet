let isPause = false,
  secondsRemaing,
  interval,
  initialMin = 1,
  initalSec = initialMin * 60;
$(() => {
  const dialog = $("dialog"),
    close = $("#close"),
    start = $("#start"),
    pause = $("#pause"),
    reset = $("#reset"),
    pomodoro = $("#pomodoro").get(0),
    hand = $("#hand"),
    time = $("#time");
  updateText(initialMin, 0);
  $("#open").on("click", () => {
    dialog[0].showModal();
  });
  start.on("click", () => {
    isPause ? resumeTimer() : startTimer();
  });
  pause.on("click", pauseTimer);
  reset.on("click", () => resetTimer(initialMin));
  close.on("click", () => {
    dialog[0].close();
    resetTimer(0);
  });
  function startTimer() {
    secondsRemaing = initialMin * 60;
    isPause = false;
    interval = setInterval(updateTimer, 1000);
  }
  function pauseTimer() {
    isPause = true;
    clearInterval(interval);
  }
  function resumeTimer() {
    isPause = false;
    interval = setInterval(updateTimer, 1000); // Changed from updateText to updateTimer
  }
  function resetTimer(min) {
    isPause = false;
    clearInterval(interval);
    updateText(min, 0);
    resetVisuals();
  }

  function updateTimer() {
    if (secondsRemaing < 0) {
      resetTimer(0);
      return;
    }
    let min = Math.floor(secondsRemaing / 60);
    let seconds = secondsRemaing % 60;
    let progress = secondsRemaing / initalSec;
    const degrees = 360 * (1 - progress) + 90;
    updateVisual(progress, degrees);
    updateText(min, seconds);
    secondsRemaing--;
  }
  function updateVisual(progress, degrees) {
    pomodoro.style.setProperty("--p", `${(1 - progress) * 100}%`);
    hand.css("transform", `translate(-100%, -50%) rotate(${degrees}deg)`);
  }
  function updateText(min, sec) {
    time.html(`${min}:${sec.toString().padStart(2, "0")}`);
  }
  function resetVisuals() {
    pomodoro.style.setProperty("--p", "0%");
    hand.css("transform", `translate(-100%, -50%) rotate(90deg)`);
  }
});
