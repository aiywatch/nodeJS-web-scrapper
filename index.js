var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

function getContent(url){
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){

      // return cheerio.load(body);
      var $ = cheerio.load(body);
      var table = $('table tr');
      var data = '';

      $('table tr').each(function(index, element) { 
        var permissions = $(this).children().first().text();
        var size = $(this).children(':nth-child(2)').text();
        var file = $(this).children(':nth-child(3)').text();
        var etx = file.split('.').pop();
        // console.log(etx);

        data += permissions + ',' + file + ',' + etx + '\n';


      });

      fs.writeFile("./image.csv", data, function(err) {
        if(err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      }); 
           
    }
  });
}

getContent('http://substack.net/images/');
// var $ = getContent('http://substack.net/images/');

// console.log($('table tr').text());

// fs.writeFile("./image.txt", $('table').text(), function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 
// request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'));

// var f = fs.readFileSync('./image.txt').toString();
// var arr = f.split('\n');
// var arr_data = [];
// var regex = /(\(.{10}\))(.*)((\..{3})|(\/))$/;

// arr.forEach(function(line, i){
//   var reg = regex.exec(arr[i]);
//   if(reg && reg[3].length > 1){
//     arr_data.push([reg[1], reg[2], reg[3]]);
//   }
//   else if(reg)
//     arr_data.push([reg[1], reg[2]+reg[3]]);
// });

// console.log(regex.exec(arr[1]));

// console.log(arr_data);