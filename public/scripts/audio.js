window.AudioContext = window.AudioContext || window.webkitAudioContext;
//var context = new AudioContext();



function process(Data) {
 // window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
 // alert(context);
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
     if (request.readyState == 4 && request.status == 200){
        process(Data);
      }

  };

  request.send();
};

function enviarTextSound(texto,callback) {
var a = false;
  $.ajax({
      type: 'POST',
      url: '/api/textToSpeech/',
      myCallback: callback,
      data:  JSON.stringify ({message: texto}),
      success: function(data) {
         if(data=="Sucesso"){
            this.myCallback(true);
         }
       },
      contentType: "application/json",
      dataType: 'json'
  });


};


//loadSound()