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

      // Push object into output array

    });

    // Convert jsonOutput back to CSV

    // Write CSV to output file

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
