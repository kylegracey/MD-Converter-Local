var fs = require('fs');

var pathToInput = './csv/input.csv';

fs.readFile(pathToInput, 'utf8', parseCB);

function parseCB(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Got Data. Length: ');
    console.log(data.length);
  }
}
