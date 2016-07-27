'use strict'

var fs = require('fs'); //natif node system file read and write in file
var d3 = global.d3 = require('d3');
var parse = require('csv-parse'); //read line by line csv file

var json = [
 {
 "SepalLength":    5.1,
"SepalWidth":    3.5,
"PetalLength":    1.4,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.9,
"SepalWidth":      3,
"PetalLength":    1.4,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.7,
"SepalWidth":    3.2,
"PetalLength":    1.3,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.6,
"SepalWidth":    3.1,
"PetalLength":    1.5,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":      5,
"SepalWidth":    3.6,
"PetalLength":    1.4,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.4,
"SepalWidth":    3.9,
"PetalLength":    1.7,
"PetalWidth":    0.4,
"Species": "setosa" 
},
{
 "SepalLength":    4.6,
"SepalWidth":    3.4,
"PetalLength":    1.4,
"PetalWidth":    0.3,
"Species": "setosa" 
},
{
 "SepalLength":      5,
"SepalWidth":    3.4,
"PetalLength":    1.5,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.4,
"SepalWidth":    2.9,
"PetalLength":    1.4,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.9,
"SepalWidth":    3.1,
"PetalLength":    1.5,
"PetalWidth":    0.1,
"Species": "setosa" 
},
{
 "SepalLength":    5.4,
"SepalWidth":    3.7,
"PetalLength":    1.5,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.8,
"SepalWidth":    3.4,
"PetalLength":    1.6,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.8,
"SepalWidth":      3,
"PetalLength":    1.4,
"PetalWidth":    0.1,
"Species": "setosa" 
},
{
 "SepalLength":    4.3,
"SepalWidth":      3,
"PetalLength":    1.1,
"PetalWidth":    0.1,
"Species": "setosa" 
},
{
 "SepalLength":    5.8,
"SepalWidth":      4,
"PetalLength":    1.2,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.7,
"SepalWidth":    4.4,
"PetalLength":    1.5,
"PetalWidth":    0.4,
"Species": "setosa" 
},
{
 "SepalLength":    5.4,
"SepalWidth":    3.9,
"PetalLength":    1.3,
"PetalWidth":    0.4,
"Species": "setosa" 
},
{
 "SepalLength":    5.1,
"SepalWidth":    3.5,
"PetalLength":    1.4,
"PetalWidth":    0.3,
"Species": "setosa" 
},
{
 "SepalLength":    5.7,
"SepalWidth":    3.8,
"PetalLength":    1.7,
"PetalWidth":    0.3,
"Species": "setosa" 
},
{
 "SepalLength":    5.1,
"SepalWidth":    3.8,
"PetalLength":    1.5,
"PetalWidth":    0.3,
"Species": "setosa" 
},
{
 "SepalLength":    5.4,
"SepalWidth":    3.4,
"PetalLength":    1.7,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.1,
"SepalWidth":    3.7,
"PetalLength":    1.5,
"PetalWidth":    0.4,
"Species": "setosa" 
},
{
 "SepalLength":    4.6,
"SepalWidth":    3.6,
"PetalLength":      1,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.1,
"SepalWidth":    3.3,
"PetalLength":    1.7,
"PetalWidth":    0.5,
"Species": "setosa" 
},
{
 "SepalLength":    4.8,
"SepalWidth":    3.4,
"PetalLength":    1.9,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":      5,
"SepalWidth":      3,
"PetalLength":    1.6,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":      5,
"SepalWidth":    3.4,
"PetalLength":    1.6,
"PetalWidth":    0.4,
"Species": "setosa" 
},
{
 "SepalLength":    5.2,
"SepalWidth":    3.5,
"PetalLength":    1.5,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.2,
"SepalWidth":    3.4,
"PetalLength":    1.4,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.7,
"SepalWidth":    3.2,
"PetalLength":    1.6,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.8,
"SepalWidth":    3.1,
"PetalLength":    1.6,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.4,
"SepalWidth":    3.4,
"PetalLength":    1.5,
"PetalWidth":    0.4,
"Species": "setosa" 
},
{
 "SepalLength":    5.2,
"SepalWidth":    4.1,
"PetalLength":    1.5,
"PetalWidth":    0.1,
"Species": "setosa" 
},
{
 "SepalLength":    5.5,
"SepalWidth":    4.2,
"PetalLength":    1.4,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.9,
"SepalWidth":    3.1,
"PetalLength":    1.5,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":      5,
"SepalWidth":    3.2,
"PetalLength":    1.2,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.5,
"SepalWidth":    3.5,
"PetalLength":    1.3,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.9,
"SepalWidth":    3.6,
"PetalLength":    1.4,
"PetalWidth":    0.1,
"Species": "setosa" 
},
{
 "SepalLength":    4.4,
"SepalWidth":      3,
"PetalLength":    1.3,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.1,
"SepalWidth":    3.4,
"PetalLength":    1.5,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":      5,
"SepalWidth":    3.5,
"PetalLength":    1.3,
"PetalWidth":    0.3,
"Species": "setosa" 
},
{
 "SepalLength":    4.5,
"SepalWidth":    2.3,
"PetalLength":    1.3,
"PetalWidth":    0.3,
"Species": "setosa" 
},
{
 "SepalLength":    4.4,
"SepalWidth":    3.2,
"PetalLength":    1.3,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":      5,
"SepalWidth":    3.5,
"PetalLength":    1.6,
"PetalWidth":    0.6,
"Species": "setosa" 
},
{
 "SepalLength":    5.1,
"SepalWidth":    3.8,
"PetalLength":    1.9,
"PetalWidth":    0.4,
"Species": "setosa" 
},
{
 "SepalLength":    4.8,
"SepalWidth":      3,
"PetalLength":    1.4,
"PetalWidth":    0.3,
"Species": "setosa" 
},
{
 "SepalLength":    5.1,
"SepalWidth":    3.8,
"PetalLength":    1.6,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    4.6,
"SepalWidth":    3.2,
"PetalLength":    1.4,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":    5.3,
"SepalWidth":    3.7,
"PetalLength":    1.5,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":      5,
"SepalWidth":    3.3,
"PetalLength":    1.4,
"PetalWidth":    0.2,
"Species": "setosa" 
},
{
 "SepalLength":      7,
"SepalWidth":    3.2,
"PetalLength":    4.7,
"PetalWidth":    1.4,
"Species": "versicolor" 
},
{
 "SepalLength":    6.4,
"SepalWidth":    3.2,
"PetalLength":    4.5,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":    6.9,
"SepalWidth":    3.1,
"PetalLength":    4.9,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":    5.5,
"SepalWidth":    2.3,
"PetalLength":      4,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    6.5,
"SepalWidth":    2.8,
"PetalLength":    4.6,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":    5.7,
"SepalWidth":    2.8,
"PetalLength":    4.5,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    3.3,
"PetalLength":    4.7,
"PetalWidth":    1.6,
"Species": "versicolor" 
},
{
 "SepalLength":    4.9,
"SepalWidth":    2.4,
"PetalLength":    3.3,
"PetalWidth":      1,
"Species": "versicolor" 
},
{
 "SepalLength":    6.6,
"SepalWidth":    2.9,
"PetalLength":    4.6,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    5.2,
"SepalWidth":    2.7,
"PetalLength":    3.9,
"PetalWidth":    1.4,
"Species": "versicolor" 
},
{
 "SepalLength":      5,
"SepalWidth":      2,
"PetalLength":    3.5,
"PetalWidth":      1,
"Species": "versicolor" 
},
{
 "SepalLength":    5.9,
"SepalWidth":      3,
"PetalLength":    4.2,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":      6,
"SepalWidth":    2.2,
"PetalLength":      4,
"PetalWidth":      1,
"Species": "versicolor" 
},
{
 "SepalLength":    6.1,
"SepalWidth":    2.9,
"PetalLength":    4.7,
"PetalWidth":    1.4,
"Species": "versicolor" 
},
{
 "SepalLength":    5.6,
"SepalWidth":    2.9,
"PetalLength":    3.6,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    6.7,
"SepalWidth":    3.1,
"PetalLength":    4.4,
"PetalWidth":    1.4,
"Species": "versicolor" 
},
{
 "SepalLength":    5.6,
"SepalWidth":      3,
"PetalLength":    4.5,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":    5.8,
"SepalWidth":    2.7,
"PetalLength":    4.1,
"PetalWidth":      1,
"Species": "versicolor" 
},
{
 "SepalLength":    6.2,
"SepalWidth":    2.2,
"PetalLength":    4.5,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":    5.6,
"SepalWidth":    2.5,
"PetalLength":    3.9,
"PetalWidth":    1.1,
"Species": "versicolor" 
},
{
 "SepalLength":    5.9,
"SepalWidth":    3.2,
"PetalLength":    4.8,
"PetalWidth":    1.8,
"Species": "versicolor" 
},
{
 "SepalLength":    6.1,
"SepalWidth":    2.8,
"PetalLength":      4,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    2.5,
"PetalLength":    4.9,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":    6.1,
"SepalWidth":    2.8,
"PetalLength":    4.7,
"PetalWidth":    1.2,
"Species": "versicolor" 
},
{
 "SepalLength":    6.4,
"SepalWidth":    2.9,
"PetalLength":    4.3,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    6.6,
"SepalWidth":      3,
"PetalLength":    4.4,
"PetalWidth":    1.4,
"Species": "versicolor" 
},
{
 "SepalLength":    6.8,
"SepalWidth":    2.8,
"PetalLength":    4.8,
"PetalWidth":    1.4,
"Species": "versicolor" 
},
{
 "SepalLength":    6.7,
"SepalWidth":      3,
"PetalLength":      5,
"PetalWidth":    1.7,
"Species": "versicolor" 
},
{
 "SepalLength":      6,
"SepalWidth":    2.9,
"PetalLength":    4.5,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":    5.7,
"SepalWidth":    2.6,
"PetalLength":    3.5,
"PetalWidth":      1,
"Species": "versicolor" 
},
{
 "SepalLength":    5.5,
"SepalWidth":    2.4,
"PetalLength":    3.8,
"PetalWidth":    1.1,
"Species": "versicolor" 
},
{
 "SepalLength":    5.5,
"SepalWidth":    2.4,
"PetalLength":    3.7,
"PetalWidth":      1,
"Species": "versicolor" 
},
{
 "SepalLength":    5.8,
"SepalWidth":    2.7,
"PetalLength":    3.9,
"PetalWidth":    1.2,
"Species": "versicolor" 
},
{
 "SepalLength":      6,
"SepalWidth":    2.7,
"PetalLength":    5.1,
"PetalWidth":    1.6,
"Species": "versicolor" 
},
{
 "SepalLength":    5.4,
"SepalWidth":      3,
"PetalLength":    4.5,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":      6,
"SepalWidth":    3.4,
"PetalLength":    4.5,
"PetalWidth":    1.6,
"Species": "versicolor" 
},
{
 "SepalLength":    6.7,
"SepalWidth":    3.1,
"PetalLength":    4.7,
"PetalWidth":    1.5,
"Species": "versicolor" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    2.3,
"PetalLength":    4.4,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    5.6,
"SepalWidth":      3,
"PetalLength":    4.1,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    5.5,
"SepalWidth":    2.5,
"PetalLength":      4,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    5.5,
"SepalWidth":    2.6,
"PetalLength":    4.4,
"PetalWidth":    1.2,
"Species": "versicolor" 
},
{
 "SepalLength":    6.1,
"SepalWidth":      3,
"PetalLength":    4.6,
"PetalWidth":    1.4,
"Species": "versicolor" 
},
{
 "SepalLength":    5.8,
"SepalWidth":    2.6,
"PetalLength":      4,
"PetalWidth":    1.2,
"Species": "versicolor" 
},
{
 "SepalLength":      5,
"SepalWidth":    2.3,
"PetalLength":    3.3,
"PetalWidth":      1,
"Species": "versicolor" 
},
{
 "SepalLength":    5.6,
"SepalWidth":    2.7,
"PetalLength":    4.2,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    5.7,
"SepalWidth":      3,
"PetalLength":    4.2,
"PetalWidth":    1.2,
"Species": "versicolor" 
},
{
 "SepalLength":    5.7,
"SepalWidth":    2.9,
"PetalLength":    4.2,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    6.2,
"SepalWidth":    2.9,
"PetalLength":    4.3,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    5.1,
"SepalWidth":    2.5,
"PetalLength":      3,
"PetalWidth":    1.1,
"Species": "versicolor" 
},
{
 "SepalLength":    5.7,
"SepalWidth":    2.8,
"PetalLength":    4.1,
"PetalWidth":    1.3,
"Species": "versicolor" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    3.3,
"PetalLength":      6,
"PetalWidth":    2.5,
"Species": "virginica" 
},
{
 "SepalLength":    5.8,
"SepalWidth":    2.7,
"PetalLength":    5.1,
"PetalWidth":    1.9,
"Species": "virginica" 
},
{
 "SepalLength":    7.1,
"SepalWidth":      3,
"PetalLength":    5.9,
"PetalWidth":    2.1,
"Species": "virginica" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    2.9,
"PetalLength":    5.6,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    6.5,
"SepalWidth":      3,
"PetalLength":    5.8,
"PetalWidth":    2.2,
"Species": "virginica" 
},
{
 "SepalLength":    7.6,
"SepalWidth":      3,
"PetalLength":    6.6,
"PetalWidth":    2.1,
"Species": "virginica" 
},
{
 "SepalLength":    4.9,
"SepalWidth":    2.5,
"PetalLength":    4.5,
"PetalWidth":    1.7,
"Species": "virginica" 
},
{
 "SepalLength":    7.3,
"SepalWidth":    2.9,
"PetalLength":    6.3,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    6.7,
"SepalWidth":    2.5,
"PetalLength":    5.8,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    7.2,
"SepalWidth":    3.6,
"PetalLength":    6.1,
"PetalWidth":    2.5,
"Species": "virginica" 
},
{
 "SepalLength":    6.5,
"SepalWidth":    3.2,
"PetalLength":    5.1,
"PetalWidth":      2,
"Species": "virginica" 
},
{
 "SepalLength":    6.4,
"SepalWidth":    2.7,
"PetalLength":    5.3,
"PetalWidth":    1.9,
"Species": "virginica" 
},
{
 "SepalLength":    6.8,
"SepalWidth":      3,
"PetalLength":    5.5,
"PetalWidth":    2.1,
"Species": "virginica" 
},
{
 "SepalLength":    5.7,
"SepalWidth":    2.5,
"PetalLength":      5,
"PetalWidth":      2,
"Species": "virginica" 
},
{
 "SepalLength":    5.8,
"SepalWidth":    2.8,
"PetalLength":    5.1,
"PetalWidth":    2.4,
"Species": "virginica" 
},
{
 "SepalLength":    6.4,
"SepalWidth":    3.2,
"PetalLength":    5.3,
"PetalWidth":    2.3,
"Species": "virginica" 
},
{
 "SepalLength":    6.5,
"SepalWidth":      3,
"PetalLength":    5.5,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    7.7,
"SepalWidth":    3.8,
"PetalLength":    6.7,
"PetalWidth":    2.2,
"Species": "virginica" 
},
{
 "SepalLength":    7.7,
"SepalWidth":    2.6,
"PetalLength":    6.9,
"PetalWidth":    2.3,
"Species": "virginica" 
},
{
 "SepalLength":      6,
"SepalWidth":    2.2,
"PetalLength":      5,
"PetalWidth":    1.5,
"Species": "virginica" 
},
{
 "SepalLength":    6.9,
"SepalWidth":    3.2,
"PetalLength":    5.7,
"PetalWidth":    2.3,
"Species": "virginica" 
},
{
 "SepalLength":    5.6,
"SepalWidth":    2.8,
"PetalLength":    4.9,
"PetalWidth":      2,
"Species": "virginica" 
},
{
 "SepalLength":    7.7,
"SepalWidth":    2.8,
"PetalLength":    6.7,
"PetalWidth":      2,
"Species": "virginica" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    2.7,
"PetalLength":    4.9,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    6.7,
"SepalWidth":    3.3,
"PetalLength":    5.7,
"PetalWidth":    2.1,
"Species": "virginica" 
},
{
 "SepalLength":    7.2,
"SepalWidth":    3.2,
"PetalLength":      6,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    6.2,
"SepalWidth":    2.8,
"PetalLength":    4.8,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    6.1,
"SepalWidth":      3,
"PetalLength":    4.9,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    6.4,
"SepalWidth":    2.8,
"PetalLength":    5.6,
"PetalWidth":    2.1,
"Species": "virginica" 
},
{
 "SepalLength":    7.2,
"SepalWidth":      3,
"PetalLength":    5.8,
"PetalWidth":    1.6,
"Species": "virginica" 
},
{
 "SepalLength":    7.4,
"SepalWidth":    2.8,
"PetalLength":    6.1,
"PetalWidth":    1.9,
"Species": "virginica" 
},
{
 "SepalLength":    7.9,
"SepalWidth":    3.8,
"PetalLength":    6.4,
"PetalWidth":      2,
"Species": "virginica" 
},
{
 "SepalLength":    6.4,
"SepalWidth":    2.8,
"PetalLength":    5.6,
"PetalWidth":    2.2,
"Species": "virginica" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    2.8,
"PetalLength":    5.1,
"PetalWidth":    1.5,
"Species": "virginica" 
},
{
 "SepalLength":    6.1,
"SepalWidth":    2.6,
"PetalLength":    5.6,
"PetalWidth":    1.4,
"Species": "virginica" 
},
{
 "SepalLength":    7.7,
"SepalWidth":      3,
"PetalLength":    6.1,
"PetalWidth":    2.3,
"Species": "virginica" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    3.4,
"PetalLength":    5.6,
"PetalWidth":    2.4,
"Species": "virginica" 
},
{
 "SepalLength":    6.4,
"SepalWidth":    3.1,
"PetalLength":    5.5,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":      6,
"SepalWidth":      3,
"PetalLength":    4.8,
"PetalWidth":    1.8,
"Species": "virginica" 
},
{
 "SepalLength":    6.9,
"SepalWidth":    3.1,
"PetalLength":    5.4,
"PetalWidth":    2.1,
"Species": "virginica" 
},
{
 "SepalLength":    6.7,
"SepalWidth":    3.1,
"PetalLength":    5.6,
"PetalWidth":    2.4,
"Species": "virginica" 
},
{
 "SepalLength":    6.9,
"SepalWidth":    3.1,
"PetalLength":    5.1,
"PetalWidth":    2.3,
"Species": "virginica" 
},
{
 "SepalLength":    5.8,
"SepalWidth":    2.7,
"PetalLength":    5.1,
"PetalWidth":    1.9,
"Species": "virginica" 
},
{
 "SepalLength":    6.8,
"SepalWidth":    3.2,
"PetalLength":    5.9,
"PetalWidth":    2.3,
"Species": "virginica" 
},
{
 "SepalLength":    6.7,
"SepalWidth":    3.3,
"PetalLength":    5.7,
"PetalWidth":    2.5,
"Species": "virginica" 
},
{
 "SepalLength":    6.7,
"SepalWidth":      3,
"PetalLength":    5.2,
"PetalWidth":    2.3,
"Species": "virginica" 
},
{
 "SepalLength":    6.3,
"SepalWidth":    2.5,
"PetalLength":      5,
"PetalWidth":    1.9,
"Species": "virginica" 
},
{
 "SepalLength":    6.5,
"SepalWidth":      3,
"PetalLength":    5.2,
"PetalWidth":      2,
"Species": "virginica" 
},
{
 "SepalLength":    6.2,
"SepalWidth":    3.4,
"PetalLength":    5.4,
"PetalWidth":    2.3,
"Species": "virginica" 
},
{
 "SepalLength":    5.9,
"SepalWidth":      3,
"PetalLength":    5.1,
"PetalWidth":    1.8,
"Species": "virginica" 
} 
];

//filter in json by Species
/*json.filter(function (i,n){
        return i.Species!=='virginica';
    });*/

var SepalLength = [];
var Species = [];

json.forEach(function(element){
SepalLength.push(parseFloat(element.SepalLength));
Species.push(element.Species);
})
//Width and height
var w = 800;
var h = 250;
var barPadding = 5;
var w2 = w + SepalLength.length*barPadding
var padding = 30;
var rScale = d3.scale.linear()
				 .domain([0, d3.max(SepalLength, function(d) { return d[1]; })])
				 .range([2, 5]);
var xScale = d3.scale.ordinal()
                .domain(d3.range(SepalLength.length))
                .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
			.domain([0, d3.max(SepalLength)])
			.range([0, h]);

//Create SVG element
var svg = d3.select("body")
		.append("svg")
		.attr("width", w2)
		.attr("height", h);

//Create bars
svg.selectAll("rect")
.data(SepalLength)
.enter()
.append("rect")
.style("fill","teal")
.style("margin-right", function(d) {
    return barPadding + "px";
})
.attr("x", function(d, i) {
		return xScale(i);
})
.attr("y", function(d) {
		return h - yScale(d);
})
.attr("width", xScale.rangeBand())
.attr("height", function(d) {
		return yScale(d);
})
.on("click", 
	function(){
        var currentColor = d3.select(this)[0][0].style["fill"] == "teal" ? 'grey' : 'teal'
        d3.select(this)[0][0].style["fill"] = currentColor;
    }

)
.append("title")
.text(function(d) {
         return "This value is " + d;
})
;
