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

  // List of Keywords to Re-map
  const altKeywords = {
    "Blender Bottle" : ["Shaker Bottle"]
  };

  for (let key in KeywordCats) {
    const catName = key.toLowerCase().replace(/\s/g, '');
    const catSettingArr = KeywordCats[key];
    let catArrOutput = [];

    catSettingArr.forEach(function(keyword){
      // Look for matches between each keyword, and the keyword in the object.
      for (let objKey in objKeywords){
        if (keyword === objKeywords[objKey]) {
          //Found an exact match!
          // console.log('Found exact match for ' + catName + ' with ' + objKeywords[objKey]);
          catArrOutput.push(objKeywords[objKey]);
          objKeywords.splice(objKey, 1);
          break;
        } else {
          // Check alt keywords
          // console.log("Didn't find match for " + catName + ' with ' + objKeywords[objKey])
          for (let alts in altKeywords) {
            const altKey = alts;
            for (let altKeyword in altKeywords[alts]) {
              const list = altKeywords[alts]
              if (objKeywords[objKey] === list[altKeyword]) {
                // catArrOutput.push(objKeywords[objKey]);
                // objKeywords.splice(objKey, 1);
              }
            }
            // console.log('Now looking for alt keywords for ' + alts);
            // console.log('Trying to match ' + altKeywords[alts] + " and " + keyword);

          }
        }
      };

    });
    objOutput[catName] = catArrOutput.join(',');
  }
  objOutput["Tags"] = objKeywords.join(',');
};
