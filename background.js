// Redirect the user to the Wild West Timer website
chrome.action.onClicked.addListener((tab) => {
  const url = "https://melodic-elated-antelope.glitch.me/"; // Replace with your Glitch project URL
  chrome.tabs.create({ url });
});