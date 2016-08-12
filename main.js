'use strict'

var fs = require('fs'); //natif node system file read and write in file
var d3 = global.d3 = require('d3');
var dc = require('dc');
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
    PetalLengthFilter = iris.dimension(function(d) {return d.PetalLength;}),
    gPetalLength = PetalLength.group(function(d) {return d ==1 ? Math.floor(d*2)/2 : (Math.floor((d)*2-0.1))/2;}), //Create one group each centimeter
    SepalLength = iris.dimension(function(d){ return d.SepalLength; }),
    gSepalLength = SepalLength.group(function(d){ return Math.floor(d*2)/2;}),
    SepalWidth = iris.dimension(function(d){return d.SepalWidth; }),
    gSepalWidth = SepalWidth.group(function(d){ return Math.floor(d*2)/2; });
/*    gPetalLength = PetalLength.group(function(d) {return Math.floor(d*2)/2}); //Create one group each centimeter*/
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

var chart = d3.select(".chart#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left",15+"px")
    .style("padding-top",20+"px");

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
    .style("stroke", "#B0C4DE")
    .on("click", function(){
        d3.select(".title#chart1 a").style("display", null);
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


d3.select(".title#chart1").append("a")
              .attr("href", "javascript:reset(chart)")
              .attr("class", "reset")
              .text("reset")
              .style("display", "none");

chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .attr("x", 1)


chart.append("text") //Add chart title
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Species"); 

//End First Chart

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

chart2.append("defs")
  .append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height);

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed)
    .on("brushend", brushend);

function brushed() {
  d3.select(".title#chart2 a").style("display", null);
    var e = brush.extent(); //range of the brush e[0] min e[1] max    
    chart2.select("#clip>rect")
        .attr("x", x2(e[0]))
        .attr("width", x2(e[1]) - x2(e[0]));
  var range = [e[0],e[1]];
  updateRange(range);
}



function brushend() {
    if (brush.empty()){
        chart2.select("#clip>rect")
        .attr("x", 0)
        .attr("width", width);

        PetalLength.filterAll()
    }
    /*if (brush.empty()) chart2.selectAll(".hidden").classed("hidden", false);*/
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

chart2.selectAll(".hidden")
  .data(data2)
  .enter().append("rect")
  .attr("class", "hidden")
  .attr("x", function(d) {
    return x2(d.key);
  })
  .attr("y", function(d) {
    return y2(d.value);
  })
  .attr("height", function(d) {
    return height - y2(d.value);
  })
  .attr("width", x2(0.5))
  .style("stroke", "#C2BFBD")
  .append("title")
  .text(function(d) {
    return d.key;
  });

chart2.selectAll(".bar")
    .data(data2)
    .enter().append("rect")
    .attr("clip-path", "url(#clip)")
    .attr("class", "bar")
    .attr("x", function(d) {
    return x2(d.key);
    })
    .attr("y", function(d) {
    return y2(d.value);
    })
    .attr("height", function(d) {
    return height - y2(d.value);
    })
    .attr("width", x2(0.5))
    .style("stroke", "#B0C4DE")
    .append("title")
    .text(function(d) {
    return d.key;
    });

chart2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis2);

  chart2.append("text") //Add chart title
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Petal Length (cm)");  
    

chart2.append("g")
    .attr("class", "y axis")
    .call(yAxis2)


d3.select(".title#chart2").append("a")
              .attr("href", "javascript:reset2(chart)")
              .attr("class", "reset")
              .text("reset")
              .style("display", "none");

chart2.append("g")
  .attr("class", "x brush")
  .call(brush)  //call the brush function, causing it to create the rectangles
 .selectAll("rect") //select all the just-created rectangles
  .attr("y", -6)
  .attr("height", (height + margin.top)) //set their height

chart2.selectAll(".resize").append("path").attr("d", resizePath);

//End Second chart


window.reset = function(){
   filterSpecies=[];
   Species.filterAll()
   updateData(gPetalLength.reduceCount().all())

  chart.selectAll("rect.bar")
    .style('fill',"steelblue")

  d3.select(".title#chart1 a").style("display", "none");
}

window.reset2 = function(){
    chart2.select("#clip>rect")
        .attr("x", 0)
        .attr("width", width);
    d3.select("g.brush").call(brush.extent([0, 0]))
    updateRange()
    d3.select(".title#chart2 a").style("display", "none");
}
//Function to filter depending on UI
window.updateData = function(dat,text=false) {

// Scale the range of the data again 
x2.domain([0, d3.max(dat, function(d) { return d.key; })+1]);
y2.domain([0, d3.max(dat, function(d) { return d.value })])

// Select the section we want to apply our changes to

var chart2 = d3.select(".chart#chart2")
//Update all rects

chart2.selectAll("rect.hidden")
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

chart2.selectAll("rect.bar")
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

if(text == true){
  chart.selectAll("rect.bar")
    .style('fill',function(d){
      var col = filterSpecies.includes(d.key) ? "grey" : "steelblue";
      return col
    })
}
};



window.filter = function(filt){
  d3.select(".title#chart1 a").style("display", null);
  filterSpecies = [];
    filt.forEach(function(d){
      filterSpecies.includes(d) == true ? filterSpecies.splice(filterSpecies.indexOf(d),1) : filterSpecies.push(d);
    })
    Species.filter(function(d){
      return filt.indexOf(d) == -1;
    });
    var data = gPetalLength.reduceCount().all();
    updateData(data,true);
};

window.filter2 = function(filt){
  d3.select(".title#chart2 a").style("display", null);
    var data = filt;
    console.log(data);
    updateRange(data,true);
};

window.updateRange = function(filt,text=false){
    if(brush.empty()&&text==false){ 
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

if(text == true){
  brush.extent(brush.extent());
  chart2.selectAll(".extent")
                .attr("x", x2(filt[0]))
                .attr("width", x2(filt[1]) - x2(filt[0]));

  chart2.select("#clip>rect")
        .attr("x", x2(filt[0]))
        .attr("width", x2(filt[1]) - x2(filt[0]));

  chart2.select(".resize.e")
         .attr("transform","translate("+x2(filt[1])+",0)")
         .style("display",null)
  chart2.select(".resize.w")
         .attr("transform","translate("+x2(filt[0])+",0)")
         .style("display",null)
}

};



//create histplot with crossfilter specifying size of bins
/*var result = [];
Math.random() * 1 -0.15
for (var i = 1; i != 2001; ++i) result.push(i)

var xtest = (d3.scale.linear()
        .domain([0, 2000])
        .rangeRound([0, 10 * 40]));
console.log(xtest(550))

var test = crossfilter(result)

var testdim = test.dimension(function(d) { return d })

var testgroup = testdim.group(function(d) { return Math.floor(d / 50) * 50; })

console.log(testgroup.reduceCount().all())*/

/*for (var a=[],i=0;i<15000;++i) a[i]=Math.random()*1 -0.15;

var xtest = d3.scale.linear()
        .domain([d3.min(a,function(d){return d; }), d3.max(a, function(d) { return d; })])
        .rangeRound([0,20*40]);

var test = crossfilter(a)

var adim = test.dimension(function(d){ return d})
var agroup = adim.group(function(d) {return Math.floor(d*20)/20; })

console.log(agroup.reduceCount().all());*/