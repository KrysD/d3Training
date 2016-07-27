'use strict'

var d3 = global.d3 = require('d3');
var fs = require('fs'); //natif node system file read and write in file
var parse = require('csv-parse'); //read line by line csv file

var parser = parse({delimiter: ';', columns: true}); //

var input = fs.createReadStream('./data/iris.csv'); //open stream to file 

var geoData = [];

input.pipe(parser)
.on('data', function(data){
	geoData.push(data);
})
.on('end', function(){
	console.log('end');
})
.on('error', function(){
	console.log('error');
})