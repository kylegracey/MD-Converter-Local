const settings = require('./config/settings.json');
const getSetting = require('./modules/get-setting');

const keywordCats = getSetting("KeywordCats");

const tempObj = {
  name: "tempObj",
  keywords: "GTQ - Frost, JJ Watt, Recover Bar, Individual Product, Male, Efficacy, Football, One, Practice"
};

// Gets a specific setting by it's name
(function(){

  for (let key in keywordCats) {
    const catName = key;
    const catSettingArr = keywordCats[key];
    const objKeywords = tempObj.keywords.split(", ");
    let catArrOutput = [];

    catSettingArr.forEach(function(keyword){
      // Look for matches between each keyword, and the keyword in the object.
      for (let objKey in objKeywords){
        if (keyword === objKeywords[objKey]) {
          //Found an exact match!
          catArrOutput.push(objKeywords[objKey]);
        }
      };

    });

    console.log("Category: " + catName + " | Keywords: " + catArrOutput);
  }

})();
