document.getElementById("open-website").addEventListener("click", () => {
  const url = "https://melodic-elated-antelope.glitch.me/"; // Replace with your Glitch project URL
  chrome.tabs.create({ url });
});