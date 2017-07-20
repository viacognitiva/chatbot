window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();

function process(Data) {
  source = context.createBufferSource(); // Create Sound Source
  context.decodeAudioData(Data, function(buffer){
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime);
  });
};

function loadSound() {
  var request = new XMLHttpRequest();
  request.open("GET", "/api/textToSpeechRead", true);
  request.responseType = "arraybuffer";
  console.log('Chamando ');
  request.onload = function() {
      var Data = request.response;
      process(Data);
  };

  request.send();
};

function enviarTextSound(texto) {
  var request = new XMLHttpRequest();
  request.open("GET", "/api/textToSpeech/"+texto, true);
  request.onload = function() {
      var Data = request.response;
  };
  request.send();
};

//loadSound()