let recognition;
const btn = document.getElementById('toggleBtn');
const statusText = document.getElementById('status');
let isListening = false;

btn.addEventListener('click', () => {
  if (!isListening) {
    startListening();
  } else {
    stopListening();
  }
});

function startListening() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => {
    isListening = true;
    btn.textContent = "Stop Listening";
    btn.className = "on";
    statusText.textContent = "Listening for 'Bold'...";
  };

  recognition.onresult = (event) => {
    const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
    if (text.includes("bold")) {
      // Send command to the active Google Docs tab
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: () => {
            document.dispatchEvent(new KeyboardEvent('keydown', {
              bubbles: true, cancelable: true, key: 'b', code: 'KeyB', ctrlKey: true
            }));
          }
        });
      });
    }
  };

  recognition.onerror = (err) => console.error("Mic Error:", err);
  recognition.onend = () => stopListening();

  recognition.start();
}

function stopListening() {
  if (recognition) recognition.stop();
  isListening = false;
  btn.textContent = "Start Listening";
  btn.className = "off";
  statusText.textContent = "Mic is Off";
}