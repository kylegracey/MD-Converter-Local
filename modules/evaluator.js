// Goal is to take the json output and verify it against all current terms before converting back to csv.
// 1. Report back with a list of tags (including number of instances, and file paths).
// 2. Report back with any new tags on existing categories due to bridge import
// 3. Output report to json file to evaluate later

const fs = require('fs');
const csvjson = require('csvjson');

const pathToVerify = './config/taxonomy.csv';

// Load and parse verification CSV
const loadVerify = function(path, callback) {
  console.log("loadVerify Ran");

  callback()
}

function printReport(jsonInput) {
  // Verify Input
  console.log("printReport Ran");
}

loadVerify(pathToVerify, printReport);
