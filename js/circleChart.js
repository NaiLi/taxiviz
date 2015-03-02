function circleChart(){

	console.log("in function circleChart");

	var self = this;

	var ccDiv = $("circleChart");
	var hired;

var rad = Math.PI*180;
var r = 100;

//for(var i=0; i<360; i=i+15) {
//  console.log("grader: " + i + "  x: " + Math.cos(i/rad)*10 + " + x: " + Math.sin(i/rad)*10);
//}

//var lineData = [  {"x": Math.cos(0/rad)*r,   "y": Math.sin(0/rad)*r},
//                  {"x": Math.cos(15/rad)*r,   "y": Math.sin(15/rad)*r},
//                  {"x": Math.cos(30/rad)*r,   "y": Math.sin(30/rad)*r},
//                  {"x": Math.cos(45/rad)*r,   "y": Math.sin(45/rad)*r},
//                  {"x": Math.cos(60/rad)*r,   "y": Math.sin(60/rad)*r},
//                  {"x": Math.cos(75/rad)*r,   "y": Math.sin(75/rad)*r},
//                  {"x": Math.cos(90/rad)*r,   "y": Math.sin(90/rad)*r},
//                  {"x": Math.cos(105/rad)*r,   "y": Math.sin(105/rad)*r}];

var lineData = [];

for(var i=0; i<24; i++) {
  //console.log("test");
  var rad = i*15;
  var deg = (2*Math.PI)/24;

  var x = Math.cos(i*deg)*r;
  var y = Math.sin(i*deg)*r;

  lineData.push({"x": x, "y": y});
  //test.push({"x": Math.cos(0/rad)*r, "y": Math.sin(0/rad)*r},);

//console.log(lineData[i]);
}



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


  d3.csv("data/weekOne.csv", function(data) {

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

  function polarToCoord(angle, value) {

  	//motst/hyp = sin(v)
  	// motst = hyp*sin(v)
  	// närl/hyp = cos(v)
  	// närl = hyp*cos(v)
  }




}








