const startButton = document.getElementById('startButton');
const resultMessage = document.getElementById('resultMessage');
const listeningIndicator = document.getElementById('listeningIndicator');
const listeningAudioStart = document.getElementById('listeningAudioStart');
const listeningAudioSuccess = document.getElementById('listeningAudioSuccess');
const speechList = document.getElementById('speechList');
const targetPhrase = "I am so sorry daddy Shash I will never mess with you again I love you";

// Check if browser supports SpeechRecognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Play the audio before the button is pressed
    listeningAudioStart.play();

    startButton.addEventListener('click', () => {
        // Stop the audio when the button is pressed
        listeningAudioStart.pause();
        recognition.start();
    });

    recognition.onstart = () => {
        listeningIndicator.style.display = 'block';
    };

    recognition.onend = () => {
        listeningIndicator.style.display = 'none';
    };

    recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;
        
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = text;
        
        // Append the new list item to the speech list
        speechList.appendChild(listItem);

        // Check if the recognized text matches the target phrase
        if (text.toLowerCase().includes(targetPhrase.toLowerCase())) {
            resultMessage.style.display = 'block';
            listeningAudioSuccess.play();
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error occurred: ' + event.error);
    };
} else {
    alert('Speech recognition is not supported in your browser.');
}