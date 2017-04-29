const fs = require('fs');
const csvjson = require('csvjson');

const pathToInput = './csv/input.csv';

fs.readFile(pathToInput, 'utf8', parseCB);

function parseCB(err, data) {
  if (err) {
    console.error(err);
  } else {
    //console.log('Data is CSV and length is: ' + data.length);
    const csvjsonOptions = {
      quote : '"'
    };
    let jsonData = csvjson.toObject(data, csvjsonOptions);

    jsonData.forEach(function(obj) {
      console.log(obj.SourceFile);
    });

  }
}
