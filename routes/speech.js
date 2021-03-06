require('dotenv').config();
var express = require('express');
var router = express.Router();
var request = require('request');
var watson = require('watson-developer-cloud');
var fs = require('fs');


router.get('/:text', function(req, res, next){
  var text = req.params.text;
  var text_to_speech = watson.text_to_speech({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    version: 'v1'
  });
  var params = {
    text: text,
    voice: 'en-US_LisaVoice',
    accept: 'audio/ogg'
  };

  // Pipe the synthesized text to a file.
  var transcript = text_to_speech.synthesize(params)

  transcript.pipe(res)
})

module.exports = router;
