function columnChart() {

          var x_domain = d3.extent(sentimentsForChart, function(d) { return d.time; });
/*   hours = x_domain[1].getHours();
      x_domain[1] = new Date(x_domain[1].setHours(hours));*/
         
              // Define dimensions.
    var margin = {top: 20, right: 0, bottom: 30, left: 40};
    var svgWidth = ($("#timeline").width()/noOfHours) * (noOfHours-1.68);
    // var svgWidth = (svgWidth - svgWidth/28)
    var svgHeight = $("#timeline").height();
    var width = (svgWidth) * 0.98 - margin.left - margin.right;
    var height = svgHeight - margin.bottom - margin.top - 100      


    var formatDate = d3.time.format("%Y-%m-%d %H:%M");


      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; };
      xScale = d3.time.scale()
            .domain(x_domain)
            .range([0, width-(width/(noOfHours+noOfHours/2))]);
            //width/48, (width*46)/49


      yScale = d3.scale.linear(),
      yAxis = d3.svg.axis().scale(yScale).ticks(0).orient("left");

      xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(12)
      .tickFormat(d3.time.format("%m-%d-%Y, %H:%M"));
      

  function chart(selection) {
    selection.each(function(data) {
      var colorScale = d3.scale.linear().domain([0,1]).range(["white","#88FF88"]);
      var colorScaleRed = d3.scale.linear().domain([0,-1]).range(["white","#FF8888"]);
 

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });
    
      // Update the x-scale.
         
console.log(noOfHours)
      // Update the y-scale.
      yScale
          .domain([-1,1])
          .range([height, 0])
          .nice();
          

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "bars");
      gEnter.append("g").attr("class", "y axis");
      gEnter.append("g").attr("class", "x axis lineXAxis"); //"x axis lineXAxis"
      gEnter.append("g").attr("class", "x axis zero");

      // Update the outer dimensions.
      svg .attr("width", svgWidth)
          .attr("height", "700");

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + (margin.left+(width/(noOfHours* 1.75)))  + "," + margin.top + ")");

          counter = 0;
var xStart = 0;
var xStartRed = 0;
     // Update the bars.
      var bar = svg.select(".bars").selectAll(".bar").data(data);
      bar.enter().append("rect");
      bar.exit().remove();
      bar .attr("class", function(d, i) { return d[1] < 0 ? "bar negative" : "bar positive"; })
          .attr("fill", function(d){ 
                                          if(d[1]<0){
                                            
                                         return colorScaleRed(d[1]);
                                            }
                                          else 
                                            return colorScale(d[1]);                                   
                                      })

          .attr("x", function(d) { /*if(d[1]<0) {
                                      xStartRed = xStartRed + width/24;
                                      return xScale(xStartRed);
                                    }
                                   else {
                                     xStart = xStart + width/24;  
                                      return xStart; } */
                                       return X(d);
                                  }) //console.log(width/36)

          .attr("y", function(d, i) {   return d[1] < 0 ? Y0() : "0"; })
          .attr("width", (svgWidth/noOfHours)-2)
          .attr("height", function(d, i) { return 225; })
          .on('click', function(d,i){ 
                  mousex = d3.mouse(this);
                  var invertedx = timelineX.invert(mousex[0]);
                  //var invertedy = timelineY.invert(mousex[1]);
                  invertedx = invertedx.getTime();
                  var time = new Date(invertedx).setMinutes(0);
                  startTimeForRelation = new Date(new Date(time).setSeconds(0));

                  var timeEnd = new Date(invertedx)
                      timeEndHour = timeEnd.setHours(timeEnd.getHours()+1);
                      timeEndMinute = new Date(timeEndHour).setMinutes(0);
                      endTimeForRelation = new Date(new Date(timeEndMinute).setSeconds(0));

                  console.log(startTimeForRelation + " " + endTimeForRelation)
                  drawRelationSanky();
              });

    // x axis at the bottom of the chart
     g.select(".x.axis.lineXAxis") //".x.axis.lineXAxis"
        .attr("transform", "translate("+ 0 +"," + height + ")")
        .call(xAxis)
            .selectAll("text")  
            .attr("x", "-60")
            .attr("y", "-5")
            .attr("transform", "rotate(-90)");;
    
    // zero line
    /* g.select(".x.axis.zero")
        .attr("transform", "translate(0," + Y0() + ")")
        .call(xAxis.tickFormat(d3.time.format("%m-%d-%Y, %H:%M")).tickSize(5));*/
    
    
      // Update the y-axis.
      g.select(".y.axis")
        .call(yAxis);
          
    });
  }


// The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(d[0]);
  }

  function Y0() {
    return yScale(0);
  }

  // The x-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(d[1]);
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;
}