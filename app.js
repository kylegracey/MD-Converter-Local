const fs = require('fs');
const csvjson = require('csvjson');

// Files
const allSettings = require('./config/settings.json');
const settings = allSettings;
const pathToInput = './csv/input.csv';

// Modules
const getSettings = require('./modules/get-setting');
const groupSearch = require('./modules/group-search');

// Setting up some info checks
let csvStartLength = 0;
let csvEndLength = 0;
let jsonStartLength = 0;
let jsonEndLength = 0;

function writeCsvFile(data) {
  // Convert jsonOutput back to CSV
  const jsonToCsvOptions = {
      headers   : "key",
      delimiter   : ";"
  }
  const csvOutput = csvjson.toCSV(data, jsonToCsvOptions);

  // console.log(csvOutput);

  // Write CSV to output file
  fs.writeFile('./csv/output.csv', csvOutput, function (err) {
    if (err) return console.log(err);
    console.log('Success. Writing to output.csv');
  });

}

fs.readFile(pathToInput, 'utf8', parseCB);

function parseCB(err, data) {
  if (err) {
    console.error(err);
  } else {
    //console.log('Data is CSV and length is: ' + data.length);
    csvStartLength = data.split("\n").length;

    const csvjsonOptions = {
      quote : '"'
    };
    let jsonData = csvjson.toObject(data, csvjsonOptions);
    jsonStartLength = jsonData.length;
    let jsonOutput = [];

    // Loop through each object in the jsonData
    jsonData.forEach(function(obj) {
      // Put keywords into a working array
      let KeywordArr = obj.Keywords.split(', ');

      // Search through keywords for matches and pull them out into their own separate metaproperties
      const productGroups = groupSearch(obj.Keywords);

      // Organize and output metaproperties in the correct order
      obj["Product Group"] = productGroups;

      // Write new properties to object
      jsonOutput.push(obj);

    });

    writeCsvFile(jsonOutput);

  }

  console.log("Parse Complete.")

  if (csvStartLength - 2 === jsonStartLength) {
    console.log("CSV to JSON successful. " + jsonStartLength + " files read.")
  } else {
    console.error("====WARNING====")
    console.error("CSV Started with " + csvStartLength + " lines.")
    console.error("JSON Started with " + jsonStartLength + " objects.")
  }

}
