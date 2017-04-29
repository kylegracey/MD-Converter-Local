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
    let jsonOutput = [];

    // Loop through each object in the jsonData
    jsonData.forEach(function(obj) {
      // Put keywords into a working array
      let KeywordArr = elm.Keywords.split(', ');

      // Search through keywords for matches and pull them out into their own separate metaproperties

      // Organize and output metaproperties in the correct order

      // Push object into output array

    });

    // Convert jsonOutput back to CSV

    // Write CSV to output file

  }
}
