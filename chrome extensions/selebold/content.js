const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  
  if (transcript.includes("bold")) {
    console.log("Voice Command Detected: Bolding...");
    
    // Simulate Ctrl + B
    const eventBold = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'b',
      code: 'KeyB',
      ctrlKey: true // This is the "Ctrl" part
    });

    document.activeElement.dispatchEvent(eventBold);
  }
};

// Start listening
recognition.start();