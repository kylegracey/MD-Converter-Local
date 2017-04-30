const fs = require('fs');
const csvjson = require('csvjson');

// Files
const allSettings = require('./config/settings.json');
const settings = allSettings;
const pathToInput = './csv/input.csv';

// Modules
const getSetting = require('./modules/get-setting');
const groupSearch = require('./modules/group-search');
const trimExtension = require('./modules/trim-extension');

// Setting up some info checks
let csvStartLength = 0;
let csvEndLength = 0;

function writeCsvFile(data) {
  // Convert jsonOutput back to CSV
  const jsonToCsvOptions = {
      headers   : "key",
      delimiter   : ";"
  }
  const csvOutput = csvjson.toCSV(data, jsonToCsvOptions);
  csvEndLength = csvOutput.split("\n").length;
  // console.log(csvOutput);

  // Write CSV to output file
  fs.writeFile('./csv/output.csv', csvOutput, function (err) {
    if (err) return console.log(err);
    console.log('Writing to csv/output.csv');
  });

}

function wordSearch(objKeywords) {

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
    let jsonOutput = [];

    // Loop through each object in the jsonData
    jsonData.forEach(function(obj) {
      // Put keywords into a working array
      // let KeywordArr = obj.Keywords.split(', ');

      let newObj = {
        "Asset Name" : "",
        "Asset Description" : "",
        BrandSubbrand : "",
        Created : "",
        Copyright : "",
        Tags : "",
        "Path to Assets" : "",
        Archived : "",
        "New Filename" : "",
        Group : "",
        "Client Team" : "",
        "Product Group" : "",
        Product : "",
        Person : "",
        Gender : "",
        "Number of People" : "",
        Year : "",
        "Platform Rights" : "",
        Campaign : "",
        Sport : "",
        Market : "",
        "Team Marks" : "",
        "Asset Status" : ""
      };

      // Search through keywords for matches and pull them out into their own separate metaproperties
      newObj["Asset Name"] = trimExtension(obj)
      newObj["Product Group"] = groupSearch(obj.Keywords);
      newObj["Asset Description"] = obj.Description;
      newObj.BrandSubbrand = getSetting("BrandSubBrand");

      // Write new properties to object
      jsonOutput.push(newObj);

    });

    writeCsvFile(jsonOutput);

  }

  if (csvStartLength - 1 === csvEndLength) {
    const fileNum = csvEndLength - 1;
    console.log("Success. Metadata reformatted on " + fileNum + " files.")
  } else {
    console.error("====WARNING====")
    console.error("CSV Started with " + csvStartLength + " lines.")
    console.error("JSON Started with " + jsonStartLength + " objects.")
  }

}
