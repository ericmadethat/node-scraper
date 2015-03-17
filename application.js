
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var localfile = './images.csv'
var url = 'http://substack.net/images/';

var printfile = [];

request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
  	var $ = cheerio.load(html);
    $('tr').each(function (i, element) {

    	var fileperm = $(this).find('td:first-child').text();
    	var imagetype = $(this).find('a[href]').text();
    	var imageurl = "http://substack.net" + $(this).find('a').attr('href');

    	var line = fileperm + " " + imagetype + " " + imageurl + "\n";
    	printfile.push(line);
    });
    
    fs.writeFile(localfile, printfile, function(err) {
    		console.log("File successfully created.");
    })
  }
});

