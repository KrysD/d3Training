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
    SpeciesFilter = iris.dimension(function(d) { return d.Species; }),
	gSpecies = Species.group().reduceCount().all(), //Group to cardinality of each Species
    PetalLength = iris.dimension(function(d) {return d.PetalLength;}),
    PetalLengthFilter = iris.dimension(function(d) {return d.PetalLength;}),
    gPetalLength = PetalLength.group(function(d) {return d ==1 ? Math.trunc(d*2)/2 : Math.trunc((d-0.1)*2)/2;}); //Create one group each centimeter

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
/*console.log(gSpecies);*/
var margin = {top: 10,
    right: 41,
    bottom: 42,
    left: 10
};

var width = 400 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width])
    .domain([0, d3.max(data, function(d) { return d.value; })]);

var y = d3.scale.ordinal()
    .domain(data.map(function(d) { return d.key; }))
    .rangeRoundBands([0,height],.1);

var barWidth = height / data.length;

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
    .attr("transform", function(d, i) { return "translate("+y(d.key)+",0)"; });

var filterSpecies = [];
chart.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", function(d) { return y(d.key); })
    .attr("width", function(d) { return x(d.value); })
    .attr("height", y.rangeBand())
    .style("fill","steelblue")
    .on("click", function(){
        var currentColor = d3.select(this)[0][0].style["fill"] == "steelblue" ? 'grey' : 'steelblue'
        d3.select(this)[0][0].style["fill"] = currentColor;
        var actVal = d3.select(this)[0][0].textContent;
        filterSpecies.includes(actVal) == true ? filterSpecies.splice(filterSpecies.indexOf(actVal),1) : filterSpecies.push(actVal);
        Species.filter(function(d){
          return filterSpecies.indexOf(d) == -1;
        });
        var data = gPetalLength.reduceCount().all();
        updateData(data);
        
    })
    .append("title")
    .text(function(d) { return d.key;});

chart.selectAll(".chart")
    .data(data)
  .enter().append("text")    
    .text(function(d) { return d.key;})
    .attr("id","catTitle")
    .attr("class","catTitle")
    .attr("text-anchor", "middle")
    .attr("x", function(d,i) {
        return x(d.value) - margin.right;
    })
    .attr("y", function(d) {
        return y(d.key) + barWidth/2;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill","white");

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .attr("x", 1)


chart.append("text") //Add chart title
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Species"); 



// Second Chart

var data2 = gPetalLength.reduceCount().all();
/*console.log(data2);*/
var y2 = d3.scale.linear()
    .domain([0, d3.max(data2, function(d) { return d.value })])
    .range([height ,0 ]);

var x2 = d3.scale.linear()
    .domain([0, d3.max(data2, function(d) { return d.key; })+1])
    .rangeRound([0, width]);

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");

var chart2 = d3.select(".chart#chart2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left",15+"px");

var bar = chart2.selectAll("g")
    .data(data2)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + x2(d.key) + ",0)"; });

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed)
    .on("brushend", brushend);

function brushed() {
  var e = brush.extent(); //range of the brush e[0] min e[1] max
  chart2.selectAll(".bar").classed("hidden", function(d,id) {
        /*d.key >= e[0] && d.key <= e[1]*/
        /*console.log( "key : "+d.key+" start: "+e[0]+" end: "+e[1]);*/
        return(d.key >= e[0] && d.key <= e[1] ? false : true)
    });
  var range = [e[0],e[1]];
  updateRange(range);
}

function brushend() {
    if (brush.empty()) chart2.selectAll(".hidden").classed("hidden", false);
    if (brush.empty()) PetalLength.filterAll()
  }

function resizePath(d) {
    var e = +(d == "e"),
    x = e ? 1 : -1,
    y = height / 3;
    return "M" + (.5 * x) + "," + y
    + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
    + "V" + (2 * y - 6)
    + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
    + "Z"
    + "M" + (2.5 * x) + "," + (y + 8)
    + "V" + (2 * y - 8)
    + "M" + (4.5 * x) + "," + (y + 8)
    + "V" + (2 * y - 8);
}

chart2.selectAll(".bar")
    .data(data2)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x2(d.key); })
    .attr("y", function(d) { return y2(d.value); })
    .attr("height", function(d) { return height - y2(d.value); })
    .attr("width", x2(0.5))
    .style("stroke","white")
    .append("title")
    .text(function(d) { return d.key;});
  

chart2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis2);

  chart2.append("text") //Add chart title
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Petal Length");  
    

chart2.append("g")
    .attr("class", "y axis")
    .call(yAxis2)



chart2.append("g")
  .attr("class", "x brush")
  .call(brush)  //call the brush function, causing it to create the rectangles
 .selectAll("rect") //select all the just-created rectangles
  .attr("y", -6)
  .attr("height", (height + margin.top)) //set their height

chart2.selectAll(".resize").append("path").attr("d", resizePath);




window.updateData = function(dat) {

// Scale the range of the data again 
x2.domain([0, d3.max(dat, function(d) { return d.key; })+1]);
y2.domain([0, d3.max(dat, function(d) { return d.value })])

// Select the section we want to apply our changes to

var chart2 = d3.select(".chart#chart2")
//Update all rects
chart2.selectAll("rect")
   .data(dat)
   .transition()
   .delay(function(d, i) {
        return i * 50;
    })
   .duration(500)
   .attr("y", function(d) {
        return y2(d.value);
   })
   .attr("height", function(d) {
        return height - y2(d.value);
});
   //Update x-axis
chart2.select(".x.axis")
    .transition()
    .duration(500)
    .call(xAxis2);

//Update y-axis
chart2.select(".y.axis")
    .transition()
    .duration(500)
    .call(yAxis2);
};

window.filter = function(filt){
    Species.filter(function(d){
      return filt.indexOf(d) == -1;
    });
    var data = gPetalLength.reduceCount().all();
    updateData(data);
};

window.updateRange = function(filt){
    if(brush.empty()){ 
        PetalLength.filterAll()
    }else{
    PetalLength.filter(filt)
    }
    var data = gSpecies;

// Scale the range of the data again 
    x.domain([0, d3.max(data, function(d) { return d.value; })]);
    y.domain(data.map(function(d) { return d.key; }))

// Select the section we want to apply our changes to
    var chart = d3.select(".chart#chart")

    //Update all rects
chart.selectAll("rect")
   .data(data)
   .transition()
   .delay(function(d, i) {
        return i * 50;
    })
   .duration(500)
   .attr("width", function(d) { return x(d.value); })

   //Update x-axis
chart.select(".x.axis")
    .transition()
    .duration(500)
    .call(xAxis);

//Update all labels
chart.selectAll("text#catTitle.catTitle")
   .data(data)
       .transition()
   .delay(function(d, i) {
        return i * 50;
    })
   .duration(500)
   .text(function(d) {
        return d.key;
   })
   .attr("x", function(d,i) {
        return x(d.value) - margin.right;
    })

};

