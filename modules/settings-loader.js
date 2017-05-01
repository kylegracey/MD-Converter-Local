// Goal is to grab the text-file export of keywords from bridge, then load them in as settings for the MD Converter to work from.
// Output should be formatted as:
// {
//   "KeywordCats" : {
//     "Product" : ["Product 1","Product 2"],
//     "Person" : ["Person 1, Person 2, Person 3"]
//   }
// }

const fs = require('fs');
const pathToKeyStructure = './bridge/gatorade.txt';
const catExclusions = ["Tags", "Teams", "Product Group (Manual Trigger)"];

module.exports = function getCategories(settingObj, callback){
  fs.readFile(pathToKeyStructure, 'utf8', function(err, data){
    //Do stuff
    const dataArr = data.split("\n");
    let categoryObj = {};
    let catHolder = "";

    dataArr.forEach(function(str) {
      if (str && str.substring(0, 1) !== '\t' && str.charAt(0) !== '[') {
        // console.log('Found category: ' + str);
        catHolder = str;
        categoryObj[catHolder] = [];
      }
      else if (str.substring(0,1) == '\t' && str.substring(1,2) !== '\t') {
        categoryObj[catHolder].push(str.substring(1));
      }
    });
    catExclusions.forEach(function(exclusion){
      delete categoryObj[exclusion];
    });
    settingObj.KeywordCats = categoryObj;
    callback(settingObj);
  });
}
