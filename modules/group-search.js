const getSetting = require('./get-setting.js');

// Settings
const groupSetting = getSetting("Product Groups");

// Search through Keywords for terms that should be under a 'Group' and return the group(s) the asset should be tagged with.
module.exports = function groupSearch(objKeywords){
  let groupHolder = [];

  //Loop through each key in the settings
  for (let key in groupSetting) {
    if (groupSetting.hasOwnProperty(key)) {
      const groupName = key;
      const groupArr = groupSetting[key];
      let hasKeyword = 0;

      //Loop through each value of the key's array
      groupArr.forEach(function(keyword){
        //Compare the value to see if it exists in elm.Keywords
        if(objKeywords.search(keyword) !== -1) {
          hasKeyword = 1;
        }
      });

      if(hasKeyword === 1) {
        groupHolder.push(groupName);
      }

    } else {
      console.error('====WARNING====');
      console.error('Group Search Failed');
    }
  }

  return groupHolder.join(',');

}
