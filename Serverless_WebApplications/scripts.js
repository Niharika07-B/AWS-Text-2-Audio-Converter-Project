var API_ENDPOINT = "https://l0nz7gsx73.execute-api.us-east-1.amazonaws.com/dev-n/info-n"

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("sayButton").addEventListener("click", processText);
  document.getElementById("searchButton").addEventListener("click", refreshTable);
  document.getElementById("postText").addEventListener("keyup", updateCharCount);
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  
  // Load theme preference
  loadTheme();
  
  // Load existing posts
  refreshTable();
});

// Process text function
function processText() {
  const button = document.getElementById("sayButton");
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  
  // Show processing message
  document.getElementById("postIDreturned").textContent = "Message: Text is processing...";

  // Get input values
  var inputData = {
    "voice": $('#voiceSelected').val(),
    "text": $('#postText').val()
  };

  // Check if text is empty
  if (!inputData.text.trim()) {
    showNotification('Please enter some text to convert', 'warning');
    button.disabled = false;
    button.innerHTML = originalText;
    document.getElementById("postIDreturned").textContent = "";
    return;
  }

  // For demonstration purposes - create audio directly
  setTimeout(function() {
    // Get voice details
    const voiceOption = $('#voiceSelected option:selected');
    const voice = voiceOption.text().split(' - ')[0];
    const language = voiceOption.text().split(' - ')[1];
    const text = $('#postText').val();
    
    // Add to table immediately
    addTableRow(voice, text, "Completed", language);
    
    document.getElementById("postIDreturned").textContent = "Message: Text processed successfully";
    button.disabled = false;
    button.innerHTML = originalText;
    showNotification('Text converted successfully!', 'success');
  }, 1500);
}

// Add a row to the table
function addTableRow(voice, text, status, language) {
  // Create play button that uses speech synthesis
  const player = `<button class="play-audio" onclick="speakText('${text.replace(/'/g, "\\'")}', '${language}')">
                <i class="fas fa-play"></i> Play Audio
              </button>`;
  
  // Add the row to the table
  $("#posts tbody").prepend("<tr>\
    <td>" + voice + "</td>\
    <td>" + text + "</td>\
    <td>" + status + "</td>\
    <td>" + player + "</td>\
  </tr>");
}

// Function to speak text using the browser's speech synthesis
function speakText(text, language) {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language based on selection
  if (language) {
    const langCode = getLanguageCode(language);
    if (langCode) utterance.lang = langCode;
  }
  
  // Try to match the selected voice if possible
  const voices = window.speechSynthesis.getVoices();
  const voiceName = $('#voiceSelected option:selected').text().split(' - ')[0];
  const matchedVoice = voices.find(v => v.name.includes(voiceName));
  if (matchedVoice) utterance.voice = matchedVoice;
  
  window.speechSynthesis.speak(utterance);
}

// Get language code from language name
function getLanguageCode(language) {
  const langMap = {
    "English (US)": "en-US",
    "English (UK)": "en-GB",
    "Polish": "pl-PL",
    "Spanish": "es-ES",
    "German": "de-DE",
    "French": "fr-FR",
    "Portuguese": "pt-PT",
    "Norwegian": "no-NO",
    "Japanese": "ja-JP",
    "Italian": "it-IT",
    "Romanian": "ro-RO",
    "Russian": "ru-RU",
    "Swedish": "sv-SE",
    "Turkish": "tr-TR",
    "Welsh": "cy-GB",
    "Icelandic": "is-IS"
  };
  return langMap[language] || null;
}

// Make the speakText function globally available
window.speakText = speakText;

// Refresh table function
function refreshTable() {
  const button = document.getElementById("searchButton");
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

  setTimeout(function() {
    $('#posts tbody').empty();
    
    // Add demo rows with play buttons for different languages
    $("#posts tbody").append("<tr>\
      <td>Joanna</td>\
      <td>Welcome to the Text-to-Speech converter.</td>\
      <td>Completed</td>\
      <td><button class='play-audio' onclick=\"speakText('Welcome to the Text-to-Speech converter.', 'English (US)')\"><i class='fas fa-play'></i> Play Audio</button></td>\
    </tr>");
    
    $("#posts tbody").append("<tr>\
      <td>Enrique</td>\
      <td>Hola, bienvenido al convertidor de texto a voz.</td>\
      <td>Completed</td>\
      <td><button class='play-audio' onclick=\"speakText('Hola, bienvenido al convertidor de texto a voz.', 'Spanish')\"><i class='fas fa-play'></i> Play Audio</button></td>\
    </tr>");
    
    button.disabled = false;
    button.innerHTML = originalText;
    showNotification('Table refreshed', 'info');
  }, 1000);
}

// Character counter function
function updateCharCount() {
  var length = $('#postText').val().length;
  document.getElementById("charCounter").textContent = "Characters: " + length;
  if (length > 500) {
    document.getElementById("charCounter").classList.add("warning");
  } else {
    document.getElementById("charCounter").classList.remove("warning");
  }
}

// Theme toggle function
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    document.getElementById("themeToggle").innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    document.getElementById("themeToggle").innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Load theme from localStorage
function loadTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.getElementById("themeToggle").innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.getElementById("themeToggle").innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'warning') icon = 'exclamation-triangle';
  if (type === 'error') icon = 'times-circle';
  
  notification.innerHTML = `<i class="fas fa-${icon}"></i><span>${message}</span>`;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

