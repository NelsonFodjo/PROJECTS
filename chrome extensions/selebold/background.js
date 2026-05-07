// This listens for a message from the speech recognition 
// and tells the content script to execute the bold command.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "executeBold") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: boldSelectedText
    });
  }
});

function boldSelectedText() {
  document.execCommand('bold');
}