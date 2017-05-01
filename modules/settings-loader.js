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

fs.readFile(pathToKeyStructure, 'utf8', function(err, data){
  //Do stuff
  const dataArr = data.split("\n");

  console.log(dataArr);
});
