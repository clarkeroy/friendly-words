const express = require('express');
const app = express();
const fs = require('fs');
const sampleSize = require('lodash.samplesize');

// Host our static site, thereby providing our html, css, and js.
app.use(express.static('public'));

// Load the words into memory:
const getWords = (fileName) => {
  const fileContents = fs.readFileSync(__dirname + `/words/${fileName}`, {encoding:'ascii'})
  return fileContents.split("\n");
}
const OBJECTS = getWords('objects.txt');
const PREDICATES = getWords('predicates.txt');

const sample = (words) => {
  return sampleSize(words, 10);
}

const pairs = (firstWords, secondWords) => {
  if(firstWords.length !== secondWords.length) {
    console.error("Word pair collection lengths must match.");
    return null;
  }
  
  const pairedWords = firstWords.map(
    (firstWord, index) => (`${firstWord}-${secondWords[index]}`)
  );
  
  return pairedWords;
}

app.get('/word-pairs/', (req, res)=>{
  res.send(pairs(sample(PREDICATES), sample(OBJECTS)));
});
app.get('/objects/', (req,res)=>{
  res.send(sample(OBJECTS));
});

app.get('/predicates/', (req,res)=>{
  res.send(sample(PREDICATES));
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
