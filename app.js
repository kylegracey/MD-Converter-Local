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
const formatDate = require('./modules/format-date');

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

// function wordSearch(key, obj, newObj) {
//   let keywordArr = obj.Keywords.split(', ');
//   let categoryHolder = [];
//   let categoryTerms = getSetting(key);
//
//   categoryTerms.forEach(function(keyword){
//     var hasKeyword = obj.Keywords.search(keyword);
//     if (hasKeyword !== -1){
//       categoryHolder.push(keyword);
//       //Now remove from keywordArr
//       const keyIndex = keywordArr.indexOf(keyword);
//       keywordArr.splice(keyIndex, 1);
//     };
//   });
//
//   newObj[key] = categoryHolder.join(',');
//
// }

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
        "Asset Name" : trimExtension(obj),
        "Asset Description" : obj.Description,
        BrandSubbrand : getSetting("BrandSubBrand"),
        Created : formatDate(obj),
        Copyright : "",
        Tags : "",
        "Path to Assets" : obj.SourceFile,
        Archived : "0",
        "New Filename" : obj.FileName,
        Group : getSetting("Group"),
        "Client Team" : getSetting("Client Team"),
        "Product Group" : groupSearch(obj.Keywords),
        Product : "",
        Person : "",
        Gender : "",
        "Number of People" : "",
        Year : obj.CreateDate.substring(0,4),
        "Platform Rights" : "",
        Campaign : "",
        Sport : "",
        Market : "",
        "Team Marks" : "",
        "Asset Status" : ""
      };

      // Search through keywords for matches and pull them out into their own separate metaproperties
      // wordSearch("Product", obj, newObj);

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
