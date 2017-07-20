var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var play = require('play');

var text_to_speech = new TextToSpeechV1({
  username: '4613a7c0-8e3c-48eb-900f-e54773a940d7',
  password: 'T4JycjDnnPuS'
});



/*text_to_speech.voice(params, function(error, voice) {
           if (error)
             console.log('Error:', error);
           else
             console.log(JSON.stringify(voice, null, 2));
         });*/

var textToSpeechWatson = {
     converter : function(req, res) {
         // Pipe the synthesized text to a file.
         console.log('Escrevendo audio..'+req.params.texto);
         var params = {
           text: req.params.texto,
           voice: 'pt-BR_IsabelaVoice',
           accept: 'audio/wav'
         };

         text_to_speech.synthesize(params).on('error', function(error) {
           console.log('Error:', error);
         }).pipe(fs.createWriteStream('./wavs/output.wav'));

         res.status(200).json("Sucesso");

     },
     read : function(req, res) {
        console.log('Lendo audio..');
        res.set({'Content-Type': 'audio/mpeg'});
        var readStream = fs.createReadStream('./wavs/output.wav');
        readStream.pipe(res);

     }
}

/*
var textToSpeechWatson = {
     converter : function(req, res) {
         const transcript = text_to_speech.synthesize(params);
           transcript.on('response', (response) => {
             if (req.query.download) {
               if (req.query.accept && req.query.accept === 'audio/wav') {
                 response.headers['content-disposition'] = 'attachment; filename=transcript.wav';
               } else {
                 response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
               }
             }

              response.headers['content-disposition'] = 'attachment; filename=transcript.wav';
           });
           transcript.on('error', function(error) {
                   console.log('Error:', error);
            });
           transcript.pipe(res);


            console.log('Passou 2..');

     }
}*/

module.exports = textToSpeechWatson;

/*module.exports = {
   textToSpeechWatson,
   textToSpeechWatsonRead
}*/
