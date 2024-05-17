// Select HTML elements by their IDs
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const timer = document.getElementById("timer");
const beeper = document.getElementById("beeper");
const ui = document.getElementById("ui");

// Variables to store the interval ID and the initial time left (120 seconds)
let interval;
let beepLoop;
let timeLeft = 1;

// Function to play the sound
function playSound() {
  beepLoop = setInterval(() => {
    beeper.play();
  }, 20);
  startBtn.disabled = true;
}
// Function to stop the sound
function stopSound() {
  resetBtn.classList.remove("ringing");
  resetBtn.style.backgroundColor = "";
  clearInterval(beepLoop);
}
// Function to update the timer display
function updateTimer() {
  // Calculate minutes and seconds
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  // Format the time as "MM : SS"
  let formattedTime = `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")}`;

  // Update the timer element in the HTML
  timer.innerHTML = formattedTime;
}

// Function to start the timer
function startTimer() {
  startBtn.disabled = true;
  // Set up an interval to decrease timeLeft every second
  interval = setInterval(() => {
    timeLeft--; // Decrease timeLeft by 1 second
    updateTimer(); // Update the display
    // Check if the timer is already running

    // Check if the time has run out
    if (timeLeft === 0) {
      resetBtn.classList.add("ringing");
      resetBtn.style.backgroundColor = "rgba(255, 80, 80, 0.8)";
      playSound();
      clearInterval(interval); // Stop the timer
      timeLeft = 1500; // Reset timeLeft to 1500 seconds (25 minutes)
    }
  }, 1000); // Interval set to 1000 milliseconds (1 second)

  console.log("Timer started"); // Log message for debugging
}

// Function to pause the timer
function pauseTimer() {
  startBtn.disabled = false;
  clearInterval(interval); // Stop the interval
  console.log("Timer paused"); // Log message for debugging
}

// Function to reset the timer
function resetTimer() {
  stopSound();
  clearInterval(interval); // Stop the interval if running
  startBtn.disabled = false;
  timeLeft = 1500; // Reset timeLeft to 120 seconds
  console.log("Timer restarted"); // Log message for debugging
  updateTimer(); // Immediately update the display
}

// Add event listeners to buttons
startBtn.addEventListener("click", startTimer); // Start button
pauseBtn.addEventListener("click", pauseTimer); // Pause button
resetBtn.addEventListener("click", resetTimer); // Reset button
