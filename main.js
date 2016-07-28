'use strict'

var fs = require('fs'); //natif node system file read and write in file
var d3 = global.d3 = require('d3');
var d3brush = require('d3-brush');
var crossfilter = require('crossfilter');
var parse = require('csv-parse'); //read line by line csv file

// Create the crossfilter for the relevant dimensions and groups.
var iris = crossfilter(json),
  all = iris.groupAll(), //dimension with all the data
  speciesDim = iris.dimension(function(d) { return d.Species; }); //dimension depending on the species

//Calculate K for histograms

var K = Math.ceil(1+Math.log2(all.reduceCount().value()));
console.log(K);


//Test some crossfilter features 
//Not Run
var speciesDimension = iris.dimension(function(d) { return d.Species; });
speciesDimension.filter("setosa")

var n = iris.groupAll().reduceCount().value();
console.log("There are " + n + " setosa in my house.")

speciesDimension.filterAll()
var n = iris.groupAll().reduceCount().value();
console.log("There are " + n + " setosa in my house.")

var countSpecies = speciesDimension.group().reduceCount();
var a = countSpecies.top(4);

var test = iris.dimension(function(d) { return Math.min(1999, d.SepalLength); })
var distances = test.group(function(d) { return Math.floor(d / 50) * 50; });
//End not run


var SepalLength = [];
var Species = [];

json.forEach(function(element){
SepalLength.push(parseFloat(element.SepalLength));
Species.push(element.Species);
})

var counts = {};
for (var i = 0; i < Species.length; i++) {
    counts[Species[i]] = 1 + (counts[Species[i]] || 0);
}

/*console.log(Object.keys(counts));*/
//Width and height
var w = 800;
var h = 250;
var barPadding = 5;
var w2 = w + SepalLength.length*barPadding
var padding = 30;
var margin = {
'top'    : 5, 
'right'  : 20, 
'bottom' : 20, 
'left'   : 50 
};

var xScale = d3.scale.ordinal()
                .domain(d3.range(SepalLength.length))
                .rangeRoundBands([padding, w - padding * 2]);

var yScale = d3.scale.linear()
			.domain([0, d3.max(SepalLength)])
			.range([h - margin.top,0 + margin.top,]);

//Define X axis
var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")//label position
		.tickSize(5)
    	.tickSubdivide(true);

//Define Y axis
var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5)
                  .tickValues([1,3,5,7]);

//Create SVG element
var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr("margin",margin);

var brush = d3.svg.brush()
    .x(xScale)
    .on("brush", brushed);

function brushed() {
  xScale.domain(brush.empty() ? xScale.domain() : brush.extent());//brush.extent() array with [0] lower extent : [1] upper extent
  console.log(brush.extent());
}

//Create bars
svg.selectAll("rect")
.data(SepalLength)
.enter()
.append("rect")
.style("fill","teal")
.style("margin-right", function(d) {
    return barPadding + "px";
})
.style("opacity",function(d){
	return 0.7
})
.attr("x", function(d, i) {
		return xScale(i);
})
.attr("y", function(d) {
		return yScale(d) - margin.bottom;
})
.attr("width", xScale.rangeBand())
.attr("height", function(d) {
		return (yScale(0) - yScale(d));
})
.on("click", function(){
    var currentColor = d3.select(this)[0][0].style["fill"] == "teal" ? 'grey' : 'teal'
    d3.select(this)[0][0].style["fill"] = currentColor;
})
.on("mouseover", function() {
	var currentOpacity = d3.select(this)[0][0].style["opacity"] == 0.7 ? 1 : 0.7;
    d3.select(this)[0][0].style["opacity"] = currentOpacity;
  })
.on("mouseout", function() {
	var currentOpacity = d3.select(this)[0][0].style["opacity"] == 0.7 ? 1 : 0.7;
    d3.select(this)[0][0].style["opacity"] = currentOpacity;
  })
.append("title")
.text(function(d) {
         return "This value is " + d;
})
;

//Create X axis
svg.append("g")
	.attr("class", "axis") //Assign "axis" class
	.attr("transform",'translate(0,' + (h - margin.bottom - margin.top) + ')')
	.call(xAxis);
//Create Y axis
svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + (padding + margin.left) + ","+ (-margin.bottom)+")")
	.call(yAxis);



svg.append("g")
  .attr("class", "x brush")
  .call(brush)  //call the brush function, causing it to create the rectangles
.selectAll("rect") //select all the just-created rectangles
  .attr("y", -6)
  .attr("height", h + 7); //set their height