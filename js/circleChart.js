function circleChart(){

	console.log("in function circleChart");

	var self = this;

	var ccDiv = $("circleChart");
	var hired;



var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                  { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
    var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("cardinal");

    var margin = [10, 10, 10, 10],
        width = 600 - margin[1] - margin[3], //TODO 600 and 200 dynamically
        height = 200 - margin[0] - margin[2];


    var svg = d3.select("#circleChart").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");

    // radius scale from 0 to half of min of width/height
	var rScale = d3.scale.linear().range([0,(Math.min(height,width))/2]);


    d3.csv("data/taxi_sthlm_march_2013_5000.csv", function(data) {

        self.data = data;

        draw();
    });

    function draw(){
    	console.log("in function draw");

        hired = svg.append("path")
            //.attr("class", "hired")
            //.selectAll("path")
                        //
            //.data(self.data)
            //.enter().append("svg:path")
            .attr("d", lineFunction(lineData))
            .style("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "none");



    }

    function path(d) {
        
        //return line(dimensions.map(function(p) { 
          //  return [x(p), y[p](d[p])]; }));

    }




}








