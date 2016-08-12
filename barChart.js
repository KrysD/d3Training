/////////////////////////////////////////////
// Chaining function to create d3 histogram from numeric values
// This function is inspired by the d3 crossfilter examples https://github.com/square/crossfilter/blob/gh-pages/index.html
// and adapted from various training
/////////////////////////////////////////////

function barChart(){

/////////////////////////////////////////////
//Create variable inside function and set
//default value
/////////////////////////////////////////////
    if (!barChart.id) barChart.id = 0;

    var margin = {top : 10, right: 41, bottom: 42, left: 10},
        width = 400 - margin.left - margin.right,
        height = 250 -margin.top - margin.bottom,
        id = barChart.id++,
        xAxis = d3.svg.axis().orient("bottom"),
        yAxis = d3.svg.axis().orient("left"),
        brush = d3.svg.brush(),
        x = d3.scale.linear().rangeRound([0,width]), //set x range from 0 to width
        y = d3.scale.linear().range([height, 0]), //set for all barCharts range from 0 to height with linear scale
        dimension,
        filter,
        group,
        round;

/////////////////////////////////////////////
//use all variable set bellow or default
//values to create the chart    
/////////////////////////////////////////////

    function my(div){
        div.each(function() {

            y.domain([0, group.top(1)[0].value]);

            var div = d3.select(this),
                g = div.select("g");
            //Create skeletal chart if no chart in this `div` specified in the call
            if (g.empty()) {
                //create link to reset filter function
                div.select(".title").append("a")
                    .attr("href", "javascript:reset("+id+")")
                    .attr("class", "reset")
                    .text("reset")
                    .style("display", "none");
                //create `svg` element and set bounds    
                g = div.append("svg")
                    .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .style("margin-left",15+"px")
                        .style("padding-top",10+"px")
                        .style("padding-left",20+"px")
                    .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                //create `clipath` rect         
                g.append("defs")
                    .append("clipPath")
                        .attr("id", "clip")
                    .append("rect")
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr("width", width)
                        .attr("height", height);
                //create the hidden bar        
                g.selectAll(".hidden")
                    .data(group.all())
                .enter().append("rect")
                    .attr("class", "hidden")
                    .attr("x", function(d) {
                    return x(d.key);
                    })
                    .attr("y", function(d) {
                    return y(d.value);
                    })
                    .attr("height", function(d) {
                    return height - y(d.value);
                    })
                    .attr("width", x(0.5))
                    .style("stroke", "#C2BFBD")
                .append("title")
                    .text(function(d) {
                    return d.key;
                    }); 
                //create the rect        
                g.selectAll(".bar")
                    .data(group.all())
                .enter().append("rect")
                    .attr("clip-path", "url(#clip)")
                    .attr("class", "bar")
                    .attr("x", function(d) {
                    return x(d.key);
                    })
                    .attr("y", function(d) {
                    return y(d.value);
                    })
                    .attr("height", function(d) {
                    return height - y(d.value);
                    })
                    .attr("width", x(0.5))
                    .style("stroke", "#B0C4DE")
                    .append("title")
                    .text(function(d) {
                    return d.key;
                    });
                //create the x axis       
                g.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
/*                //add Axis title        
                g = div.select("svg").append("text")
                .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Petal Length (cm)"); */

                //create the y axis
                g.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                //Create and initialise the brush
                var gBrush = g.append("g")
                    .attr("class", "x brush")
                    .call(brush)  //call the brush function, causing it to create the rectangles
                    .selectAll("rect") //select all the just-created rectangles
                    .attr("y", -6)
                    .attr("height", (height + margin.top)) //set their height

                gBrush.selectAll(".resize").append("path").attr("d", resizePath);

                /////////////////////////////////////////////
                // function definition 
                /////////////////////////////////////////////    

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
            };//End if g empty()

            //show reset link on brush start
            brush.on("brushstart.chart", function() {
                var div = d3.select(this.parentNode.parentNode.parentNode);
                div.select(".title a").style("display", null);
            });

            brush.on("brush.chart", function() {
                var g = d3.select(this.parentNode),
                extent = brush.extent();
                if (round) g.select(".brush")
                .call(brush.extent(extent = extent.map(round)))
                .selectAll(".resize")
                .style("display", null);
                g.select("#clip-" + id + " rect")
                .attr("x", x(extent[0]))
                .attr("width", x(extent[1]) - x(extent[0]));
                dimension.filterRange(extent);
            });
        });
    }
/////////////////////////////////////////////
//Variable Getter and Setter for the barChart 
/////////////////////////////////////////////

    //get width or set default
    my.width = function(value){
        if(!arguments.length) return width;
        width = value;
        return my;
    };
    //get heigth or set default
    my.height = function(value){
        if(!arguments.length) return heigth;
        height = value;
        return my;
    };
    //get margin {top, rigth, bottom, left} or set default
     my.margin = function(value) {
      if (!arguments.length) return margin;
      margin = value;
      return my;
    };
    //get x domain set axis scale and brush
    my.x = function(value) {
      if (!arguments.length) return x;
      x = value;
      xAxis.scale(x);
      brush.x(x);
      return my;
    };
    //get y domain and scale
    my.y = function(value) {
      if (!arguments.length) return y;
      y = value;
      yAxis.scale(y);
      return my;
    };

    //get dimension for the barChart
    my.dimension = function(value) {
      if (!arguments.length) return dimension;
      dimension = value;
      return my;
    };
    //filter dimension if set and update the brush range or reset filter on the dimension
    my.filter = function(value) {
      if (value) {
        brush.extent(value);
        dimension.filterRange(value);
      } else {
        brush.clear();
        dimension.filterAll();
      }
      brushDirty = true;
      return my;
    };
    //get group (data) for the chart
    my.group = function(value) {
      if (!arguments.length) return group;
      group = value;
      return my;
    };

    my.round = function(_) {
      if (!arguments.length) return round;
      round = _;
      return my;
    };
/*    function brushed() {
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
    }*/
    return d3.rebind(my);
    return my;
};