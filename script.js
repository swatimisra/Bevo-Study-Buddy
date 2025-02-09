let timer;
let timeLeft;
let totalTime = 0; // Total time in seconds
let rewards = ["cactus", "house", "cowboy-hat"];
let currentRewardIndex = 0;
let totalStudyTime = 0; // Total time studied in seconds

// DOM Elements
const homePage = document.getElementById("home-page");
const timerPage = document.getElementById("timer-page");
const customizePage = document.getElementById("customize-page");
const homeTab = document.getElementById("home-tab");
const timerTab = document.getElementById("timer-tab");
const customizeTab = document.getElementById("customize-tab");
const startTimerBtn = document.getElementById("start-timer-btn");
const startTimerBtnTimerPage = document.getElementById("start-timer-btn-timer");
const cancelTimerBtn = document.getElementById("cancel-timer-btn");
const hoursInput = document.getElementById("hours-input");
const minutesInput = document.getElementById("minutes-input");
const hoursInputTimerPage = document.getElementById("hours-input-timer");
const minutesInputTimerPage = document.getElementById("minutes-input-timer");
const timeLeftDisplay = document.getElementById("time-left");
const timerProgress = document.querySelector(".progress-ring-circle");
const presentBox = document.getElementById("present");
const prizeBox = document.getElementById("prize");
const longhornAccessories = document.getElementById("longhorn-accessories");
const desertBackground = document.getElementById("desert-background");
const hatSelect = document.getElementById("hat-select");
const shirtSelect = document.getElementById("shirt-select");
const accessorySelect = document.getElementById("accessory-select");
const applyCustomizationBtn = document.getElementById("apply-customization-btn");

const accessories = [
  { name: 'Accessory 1', image: 'https://cdn.glitch.global/b46069e7-37fd-43eb-99a5-309d3a7bfe66/openart-image_Bac4QG1h_1739057638436_raw-removebg-preview%20(1).png?v=1739063306755', unlocked: false },
  { name: 'Accessory 2', image: 'https://cdn.glitch.global/b46069e7-37fd-43eb-99a5-309d3a7bfe66/WhatsApp_Image_2025-02-08_at_19.25.53_a45ca43b-removebg-preview.png?v=1739064421582', unlocked: false },
  { name: 'Accessory 3', image: 'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/51W%2BoVY8L0L._AC_UY1000__prev_ui.png?v=1739075019039', unlocked: false },
  { name: 'Accessory 4', image: 'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/Screenshot%202025-02-08%20at%2010.27.20%E2%80%AFPM_prev_ui.png?v=1739075256007', unlocked: false },
  { name: 'Accessory 5', image: 'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/Screenshot%202025-02-08%20at%2010.26.56%E2%80%AFPM_prev_ui.png?v=1739075232852', unlocked: false },
  { name: 'Accessory 6', image: 'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/sun_prev_ui.png?v=1739075066512', unlocked: false },
  { name: 'Accessory 7', image: 'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/Untitled%20design.png?v=1739075115954', unlocked: false },
  { name: 'Accessory 8', image: 'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/tumble_prev_ui.png?v=1739075074260', unlocked: false },
  { name: 'Accessory 9', image: 'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/snake_prev_ui%20(1).png?v=1739075135801', unlocked: false },
  { name: 'Accessory 10', image: 'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/Screenshot%202025-02-08%20at%2010.33.39%E2%80%AFPM_prev_ui.png?v=1739075633386', unlocked: false },
];

// Array holding the URLs for the homepage images
const homePageImages = [
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo_base.png?v=1739090827410',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo1.png?v=1739082356465',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo2.png?v=1739082361050',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo3.png?v=1739082365696',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo4.png?v=1739082369464',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo5.png?v=1739082373101',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo6.png?v=1739082376368',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo7.png?v=1739082380034',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo8.png?v=1739082383655',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo9.png?v=1739082387022',
  'https://cdn.glitch.global/3eda76a0-ef83-4105-86ce-80fcd186c376/bevo10.png?v=1739082391357',
];

function updateLonghornImage() {
  const longhornImage = document.getElementById('longhorn');
  const currentImageIndex = Math.floor(totalStudyTime / 60) % homePageImages.length;
  longhornImage.src = homePageImages[currentImageIndex];
}

// Create and add the progress bar to the inventory page
const inventoryProgressBar = document.createElement('div');
inventoryProgressBar.className = 'inventory-progress-bar';

// Add a text element to display the study time
const progressBarText = document.createElement('div');
progressBarText.className = 'progress-bar-text';
progressBarText.textContent = '0:00'; // Initial text
inventoryProgressBar.appendChild(progressBarText);

const inventoryPage = document.getElementById('customize-page');
inventoryPage.insertBefore(inventoryProgressBar, inventoryPage.firstChild);
// Function to update the progress bar and text
function updateInventoryProgressBar() {
  const progress = (totalStudyTime / (accessories.length * 60)) * 100; // Calculate progress percentage
  inventoryProgressBar.style.width = `${progress}%`;

  // Update the progress bar text with the total study time
  const minutesStudied = Math.floor(totalStudyTime / 60);
  const secondsStudied = totalStudyTime % 60;
  progressBarText.textContent = `${minutesStudied}:${secondsStudied.toString().padStart(2, '0')}`;
}

// Function to unlock items based on time studied
function unlockItems() {
  const minutesStudied = Math.floor(totalStudyTime / 60);
  accessories.forEach((accessory, index) => {
    if (minutesStudied > index) {
      accessory.unlocked = true;
    }
  });
  renderInventory();
}

// Event Listeners for Tabs
homeTab.addEventListener("click", () => {
  showPage("home-page");
  updateLonghornImage(); // Ensure the image is updated when returning to the homepage
});
timerTab.addEventListener("click", () => showPage("timer-page"));
customizeTab.addEventListener("click", () => showPage("customize-page"));

// Event Listeners for Timer
startTimerBtn.addEventListener("click", startTimerFromHomePage);
startTimerBtnTimerPage.addEventListener("click", startTimerFromTimerPage);

cancelTimerBtn.addEventListener("click", () => {
  clearInterval(timer);
  alert("Timer canceled. No reward this time!");
  showPage("home-page");
});

// Functions
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
    page.classList.add("hidden");
  });

  // Show the selected page
  const selectedPage = document.getElementById(pageId);
  selectedPage.classList.remove("hidden");
  selectedPage.classList.add("active");

  // Update active tab
  document.querySelectorAll(".tab-button").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelector(`[data-page="${pageId}"]`).classList.add("active");
}

function startTimerFromHomePage() {
  const hours = parseInt(hoursInput.value, 10) || 0;
  const minutes = parseInt(minutesInput.value, 10) || 0;
  startTimer(hours, minutes);
}

function startTimerFromTimerPage() {
  const hours = parseInt(hoursInputTimerPage.value, 10) || 0;
  const minutes = parseInt(minutesInputTimerPage.value, 10) || 0;
  startTimer(hours, minutes);
}

function startTimer(hours, minutes) {
  if (hours < 0 || minutes < 0) {
    alert("Please enter valid positive numbers for hours and minutes.");
    return;
  }

  if (hours === 0 && minutes === 0) {
    alert("Please enter a valid time (at least 1 minute).");
    return;
  }

  totalTime = hours * 3600 + minutes * 60;
  timeLeft = totalTime;
  updateTimerDisplay();
  resetPresentAndPrize();

  timer = setInterval(() => {
    timeLeft--;
    totalStudyTime++; // Increment total study time
    updateTimerDisplay();
    updateProgressBar();
    unlockItems(); // Unlock items based on time studied
    updateInventoryProgressBar(); // Update the progress bar and text

    // Update the longhorn image every minute
    if (timeLeft % 60 === 0) {
      updateLonghornImage();
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      revealPrize();
      openPresentBox();
    }

    // Shake the present when 5 seconds are left
    if (timeLeft === 5) {
      shakePresent();
      playCelebrationSound();
    }
  }, 1000);

  showPage("timer-page");
}

function updateTimerDisplay() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  timeLeftDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateProgressBar() {
  const progress = ((totalTime - timeLeft) / totalTime) * 565; // 565 is the circumference
  timerProgress.style.strokeDashoffset = 565 - progress;
}

function resetPresentAndPrize() {
  presentBox.style.animation = "none";
  presentBox.style.transform = "translate(-50%, -50%) scale(1)";
  prizeBox.style.animation = "none";
  prizeBox.style.transform = "translate(-50%, -50%) scale(0)";
  void presentBox.offsetHeight; // Force reflow to restart animations
  void prizeBox.offsetHeight;
}

function shakePresent() {
  presentBox.style.animation = "shake 0.5s ease-in-out infinite";
}

function revealPrize() {
  presentBox.style.animation = "openPresent 1s forwards";
  setTimeout(() => {
    prizeBox.style.animation = "revealPrize 1s forwards";
  }, 1000);
}

function playCelebrationSound() {
  const sound = document.getElementById("celebration-sound");
  sound.currentTime = 0; // Reset sound to the beginning
  sound.play();
}


function renderInventory() {
  const inventoryGrid = document.querySelector('.inventory-grid');
  inventoryGrid.innerHTML = '';
  accessories.forEach((accessory, index) => {
    const accessoryDiv = document.createElement('div');
    accessoryDiv.className = `accessory ${accessory.unlocked ? '' : 'locked'}`;
    accessoryDiv.innerHTML = `
      <img src="${accessory.image}" alt="${accessory.name}">
      ${accessory.unlocked ? '' : `<span>Study ${Math.ceil((index + 1) * 1 - (totalStudyTime / 60))} more minutes to unlock</span>`}
    `;
    inventoryGrid.appendChild(accessoryDiv);
  });
}

// Initial render of the inventory
renderInventory();