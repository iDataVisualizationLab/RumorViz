function columnChart() {

          var x_domain = d3.extent(sentimentsForChart, function(d) { return d.time; });
            console.log(x_domain);
              // Define dimensions.
    var margin = {top: 20, right: 0, bottom: 30, left: 40};
    var svgWidth = $("#timeline").width();
    var svgHeight = $("#timeline").height();
    var width = svgWidth * 0.98 - margin.left - margin.right;
    var height = svgHeight - margin.bottom - margin.top - 100      


      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; };

      xScale = d3.time.scale()
            .domain(x_domain)
            .range([0, width]);

      yScale = d3.scale.linear(),
      yAxis = d3.svg.axis().scale(yScale).orient("left"),

      xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat(d3.time.format("%m-%d-%Y, %H:%M"))
      .ticks(12)
      .orient("bottom");
      

  function chart(selection) {
    selection.each(function(data) {

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });
    
      // Update the x-scale.
         

      // Update the y-scale.
      yScale
          .domain(d3.extent(data.map(function(d) { return (1/d[1])*d[1];} )))
          .range([height, 0])
          .nice();
          

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "bars");
      gEnter.append("g").attr("class", "y axis");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "x axis zero");

      // Update the outer dimensions.
      svg .attr("width", svgWidth)
          .attr("height", "700");

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     // Update the bars.
      var bar = svg.select(".bars").selectAll(".bar").data(data);
      bar.enter().append("rect");
      bar.exit().remove();
      bar .attr("class", function(d, i) { return d[1] < 0 ? "bar negative" : "bar positive"; })
          .attr("fill", function(d){  var c = Math.floor((255 * d[1])/2) ;
                                        if(c>0)
                                          return "rgb("+ c + ", 255, " + c + ")";
                                        else if(c<0)
                                          return "rgb("+ 255 + ", "+ c*-1 + ", "+ c*-1 + ")";
                                          else
                                            return "none";
                                      })

          .attr("x", function(d) { return X(d); })
          .attr("y", function(d, i) {   return d[1] < 0 ? Y0()/2 : "0"; })
          .attr("width", (svgWidth/24)-1)
          .attr("height", function(d, i) { return Math.abs( Y(d)/2 ); });

    // x axis at the bottom of the chart
     g.select(".x.axis")
        .attr("transform", "translate(0," + height + ")")
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