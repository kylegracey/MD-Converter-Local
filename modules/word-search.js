// const KeywordCats = getSetting("KeywordCats");

// const objInput = {
//   name: "tempObj",
//   keywords: "GTQ - Frost, JJ Watt, Recover Bar, Individual Product, Male, Efficacy, Football, One, Practice"
// };
//
// let objOutput = {
//   name: "Output Object"
// };

// Gets a specific setting by it's name
module.exports = function wordSearch(objInput, objOutput, KeywordCats){

  let newObjTags = [];
  let objKeywords = objInput.Keywords.split(", ");

  for (let key in KeywordCats) {
    const catName = key.toLowerCase().replace(/\s/g, '');
    const catSettingArr = KeywordCats[key];
    let catArrOutput = [];

    catSettingArr.forEach(function(keyword){
      // Look for matches between each keyword, and the keyword in the object.
      for (let objKey in objKeywords){
        if (keyword === objKeywords[objKey]) {
          //Found an exact match!
          catArrOutput.push(objKeywords[objKey]);
          objKeywords.splice(objKey, 1);
        }
      };

    });
    objOutput[catName] = catArrOutput.join(',');
  }
  objOutput["Tags"] = objKeywords.join(',');
};
