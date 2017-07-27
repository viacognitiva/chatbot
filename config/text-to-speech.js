var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var text_to_speech = new TextToSpeechV1({
  username: '4613a7c0-8e3c-48eb-900f-e54773a940d7',
  password: 'T4JycjDnnPuS'
});


var textToSpeechWatson = {
     converter : (req, res, next) => {
         // console.log("synthesize"+req.body.message);
           //console.dir(req);

            var params = {
                     text:req.body.message,
                     voice: 'pt-BR_IsabelaVoice',
                     //voice: 'en-US_AllisonVoice',
                     accept: 'audio/wav'
             };

          const transcript = text_to_speech.synthesize(params);
           transcript.on('response', (response) => {
             if (req.query.download) {
               if (req.query.accept && req.query.accept === 'audio/wav') {
                 response.headers['content-disposition'] = 'attachment; filename=transcript.wav';
               } else {
                 response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
               }
             }
           });
           transcript.on('error', next);
           transcript.pipe(res);

     }
}

module.exports = textToSpeechWatson;

