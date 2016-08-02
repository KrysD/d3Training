'use strict'

var fs = require('fs'); //natif node system file read and write in file
var d3 = global.d3 = require('d3');
var d3brush = require('d3-brush');
var crossfilter = require('crossfilter');
var parse = require('csv-parse'); //read line by line csv file

json.forEach(function(d, i) {
    d.index = i;
    d.PetalLength = +d.PetalLength;
    d.PetalWidth = +d.PetalWidth;
    d.SepalLength = +d.SepalLength;
    d.SepalWidth = +d.SepalWidth;
});

// Create the crossfilter for the relevant dimensions and groups.
var iris = crossfilter(json),
	all = iris.groupAll(),
	Species = iris.dimension(function(d) { return d.Species; }),
	gSpecies = Species.group().reduceCount().all(), //Group to cardinality of each Species
    PetalLength = iris.dimension(function(d) {return d.PetalLength;}),
    gPetalLength = PetalLength.group(function(d) {return Math.floor(d);}); //Create one group each centimeter

/*Species.filter("setosa") //include only setosa
var n = iris.groupAll().reduceCount().value(); //count number of element
console.log("1: "+n) //50
Species.filterFunction(function(d) { return d =='setosa' || d=='versicolor'; });//include only setosa anv versicolor
var n = iris.groupAll().reduceCount().value(); //count number of element
console.log("2: "+n)//150 
Species.filterAll() //reset filter 
var n = iris.groupAll().reduceCount().value(); //count number of element
console.log("3: "+n)//150 
var n = console.log(gPetalLength.top(Infinity));
console.log("4: "+n)//count number of plants in each petalLength group [1=50,,3=11,4=43,5=35,6=11]*/
/*PetalLength.filter([5, 6])*/
var data = gSpecies;
console.log(gSpecies);
var margin = {top: 10,
    right: 31,
    bottom: 32,
    left: 10
};

var width = 500 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, d3.max(data, function(d) { return d.value; })]);

/*var x = d3.scale.ordinal()
    .domain(function(d){return d.key})
    .range(function(d){return d.value});*/

var x = d3.scale.ordinal()
    .domain(data.map(function(d) { return d.key; }))
    .rangeRoundBands([0,width],.1);

var barWidth = width / data.length;

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left",15+"px");

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + x(d.key) + ",0)"; });

var filterSpecies = [];
chart.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .attr("width", x.rangeBand())
    .style("fill","steelblue")
    .text(function(d) { return d.key;})
    .on("click", function(){
        var currentColor = d3.select(this)[0][0].style["fill"] == "steelblue" ? 'grey' : 'steelblue'
        d3.select(this)[0][0].style["fill"] = currentColor;
        var actVal = d3.select(this)[0][0].textContent;
        filterSpecies.includes(actVal) == true ? filterSpecies.splice(filterSpecies.indexOf(actVal),1) : filterSpecies.push(actVal);
        console.log(filterSpecies);
        Species.filter(function(d){
          return filterSpecies.indexOf(d) == -1;
        });
    });

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text") //Add chart title
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".75em")
    .style("text-anchor", "end")
    .text("Frequency");

