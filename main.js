// Select HTML elements by their IDs
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const timer = document.getElementById("timer");
const beeper = document.getElementById("beeper");
const ui = document.getElementById("ui");
const timerContainer = document.getElementById("counter");
// Modal
const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("openModalBtn");
const span = document.getElementsByClassName("close")[0];
const timeSetBtn = document.querySelectorAll(".timeSet");
const customTimeBtn = document.querySelector(".customBtn");
const customBtnContainer = document.getElementById("customBtnContainer");

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
  updateTimer();
  // Set up an interval to decrease timeLeft every second
  interval = setInterval(() => {
    timeLeft--; // Decrease timeLeft by 1 second
    updateTimer(); // Update the display
    // Check if the timer is already running

    // Check if the time has run out
    if (timeLeft === 0) {
      timerContainer.classList.add("ringing");
      timerContainer.style.backgroundColor = "rgba(255, 80, 80, 0.8)";
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
  timerContainer.classList.remove("ringing");
  timerContainer.style.backgroundColor = "rgba(10, 10, 255, 0.6)";
  stopSound();
  clearInterval(interval); // Stop the interval if running
  startBtn.disabled = false;
  timeLeft = 1500; // Reset timeLeft to 120 seconds
  console.log("Timer restarted"); // Log message for debugging
  updateTimer(); // Immediately update the display
}

function btnSetTime() {
  console.log("Setting time from button");
  const [minutes, seconds] = this.innerHTML.split(":").map(Number);
  timeLeft = minutes * 60 + seconds;
  updateTimer(); // Update the timer display before setting the timeLeft variable
  modal.style.display = "none";
}

// Modal Functions

// When the user clicks the button, open the modal
modalBtn.onclick = function () {
  modal.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    customBtnContainer.style.display = "none";
    customTimeBtn.disabled = false;
  }
};

customTimeBtn.addEventListener("click", () => {
  if (
    customBtnContainer.style.display === "none" ||
    !customBtnContainer.style.display
  ) {
    customTimeBtn.disabled = true;

    // Create or show span element
    let customTimeTitle = customBtnContainer.querySelector("span");
    if (!customTimeTitle) {
      customTimeTitle = document.createElement("span");
      customTimeTitle.textContent = "Set Custom Time";
    }

    customBtnContainer.style.backgroundColor = "var(--color10)";

    // Create input fields if they don't exist
    let minutesInput = customBtnContainer.querySelector(
      "input[type='number']:first-of-type"
    );
    if (!minutesInput) {
      minutesInput = document.createElement("input");
      minutesInput.type = "number";
      minutesInput.value = "00";
      minutesInput.maxLength = 2;
      minutesInput.style.marginRight = "5px";
    }

    let secondsInput = customBtnContainer.querySelector(
      "input[type='number']:last-of-type"
    );
    if (!secondsInput) {
      secondsInput = document.createElement("input");
      secondsInput.value = "00";
      secondsInput.type = "number";
      secondsInput.maxLength = 2;
    }

    // Create OK button if it doesn't exist
    let okBtn = customBtnContainer.querySelector(".okBtn");
    if (!okBtn) {
      okBtn = document.createElement("button");
      okBtn.classList.add("okBtn");
      okBtn.textContent = "Set";

      // Add event listener to OK button
      okBtn.addEventListener("click", () => {
        const minutes = parseInt(minutesInput.value);
        const seconds = parseInt(secondsInput.value);
        if (customTimeTitle) {
          customTimeTitle.remove();
        }
        if (!isNaN(minutes) && !isNaN(seconds)) {
          timeLeft = minutes * 60 + seconds;
          updateTimer();
        }

        // Remove all items appended to customBtnContainer
        while (customBtnContainer.firstChild) {
          customBtnContainer.removeChild(customBtnContainer.firstChild);
        }
        customBtnContainer.style.display = "none";
        customBtnContainer.style.backgroundColor = "";
        customTimeBtn.disabled = false;
        // Close the modal
        modal.style.display = "none";
      });
    }

    // Append input fields and OK button to customBtnContainer
    customBtnContainer.appendChild(minutesInput);
    customBtnContainer.appendChild(secondsInput);
    customBtnContainer.appendChild(okBtn);
    customBtnContainer.appendChild(customTimeTitle);
    customBtnContainer.style.display = "block";
  } else {
    customBtnContainer.style.display = "none";
    customBtnContainer.style.backgroundColor = "";
    customTimeBtn.disabled = false;
  }
});

// Add event listeners to buttons
startBtn.addEventListener("click", startTimer); // Start button
pauseBtn.addEventListener("click", pauseTimer); // Pause button
resetBtn.addEventListener("click", resetTimer); // Reset button
timeSetBtn.forEach((btn) => {
  btn.addEventListener("click", btnSetTime);
});
