const fs = require('fs');

// Files
const getCategories = require ('./modules/settings-loader');
const settings = require('./config/settings.json');

const logIt = function(){
  console.log(settings[0].KeywordCats);
}

getCategories(settings[0], logIt);

// console.log(testObj);
