const settings = require('./config/settings.json');
const getSetting = require('./modules/get-setting');

const keywordCats = getSetting("KeywordCats");

// Gets a specific setting by it's name
(function(){

  console.log(keywordCats);

})();
