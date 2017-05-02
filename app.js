// Built to work with exiftool settings:
// exiftool -csv -FileName -CreateDate -Description -Keywords -r -ext jpg DIRECTORY > testdataexport4.csv

const fs = require('fs');
const csvjson = require('csvjson');

// Files
let settings = require('./config/settings.json');
const pathToInput = './csv/input.csv';

// Modules
const getSetting = require('./modules/get-setting');
const getCategories = require('./modules/settings-loader');
const groupSearch = require('./modules/group-search');
const wordSearch = require('./modules/word-search');
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

const parseMetadata = function(){

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
          "Tags" : "",
          "Path to Assets" : obj.SourceFile,
          Archived : "0",
          "New Filename" : obj.FileName,
          fileextension: "",
          group : getSetting("Group"),
          clientteam : getSetting("Client Team"),
          assettype : "",
          assetsubtype : "",
          year : obj.CreateDate.substring(0,4),
          campaign : "",
          productgroup : groupSearch(obj.Keywords),
          product : "",
          productsize : "",
          productsubtype : "",
          productgender : "",
          numberofpeople : "",
          person : "",
          teammarks : "",
          gender : "",
          shottype : "",
          sport : "",
          assetstatus : "",
          market : "",
          platformrights : "",
          jobid : ""
        };

        // Search through keywords for matches and pull them out into their own separate metaproperties
        wordSearch(obj, newObj, settings[0].KeywordCats);

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
}
console.log("Starting...");
getCategories(settings[0], parseMetadata);
