function circleChart(){
	//console.log("in function circleChart");

	var file = "data/taxi_sortedbyDateTime.csv";
	//var file = "data/weekOne_sortedbyDateTime.csv";
	var self = this;

	var dataMonday;
	var dataTuesday;
	var dataWednesday;
	var dataThursday;
	var dataFriday;
	var dataSaturday;
	var daraSunday;

	var ccDiv = $("circleChart");
	var hired;
	var lineData = [];

	var week = [];

	readFiles();

	var data;

  function readFiles() {
  	
		d3.csv("data/weekOne_sortedbyDateTime.csv", function(error, data) {
			self.data = data;
		});

		test1 = data.length();
		/*
		d3.csv("data/weekTwo_sortedbyDateTime.csv", function(dataTuesday) {
			self.dataTuesday = dataTuesday;
		});
		d3.csv("data/weekOne_sortedbyDateTime.csv", function(dataWednesday) {
			self.dataWednesday = dataWednesday;
		});
		d3.csv("data/weekTwo_sortedbyDateTime.csv", function(dataThursday) {
			self.dataThursday = dataThursday;
		});
		d3.csv("data/weekOne_sortedbyDateTime.csv", function(dataFriday) {
			self.dataFriday = dataFriday;
		});
		d3.csv("data/weekOne_sortedbyDateTime.csv", function(dataSaturday) {
			self.dataSaturday = dataSaturday;
		});
		d3.csv("data/weekOne_sortedbyDateTime.csv", function(dataSunday) {
			self.dataSunday = dataSunday;
		});
		*/
  	run(data);
  };

	function run(data) {
	
		var test = data.length;
		console.log("test: " + test);
		//draw();
		createCircleChart();
	};

	function createCircleChart() {

		var mon_t = tue_t = wed_t = thu_t = fri_t = sat_t = sun_t = 100;	

		var mon_f = getNrOfFalse(self.dataMonday);
		var tue_f = 30;
		var wed_f = 40;
		var thu_f = 50; 
		var fri_f = 60;
		var sat_f = 70;
		var sun_f = 80;

		

		var weekData = [	{	"Hired": true,
												"data": {	"Monday": mon_t,
																	"Tuesday": tue_t,
																	"Wednesday": wed_t,
																	"Thursday": thu_t,
																	"Friday": fri_t,
																	"Saturday": sat_t,
																	"Sunday": sun_t 
																}
		  								},
		  								{ "Hired": false,
												"data": {	"Monday": mon_f,
																	"Tuesday": tue_f,
																	"Wednesday": wed_f,
																	"Thursday": thu_f,
																	"Friday": fri_f,
																	"Saturday": sat_f,
																	"Sunday": sun_f 
																}
												}
		]

		var chart = radialBarChart()
		.barHeight(250)
		.domain([0,100])
		.barColors(['steelblue']);

		d3.select('#circleChart')
		.datum(weekData)
		.call(chart);

	}

	function getNrOfFalse(dayData) {

		var nrOfFalse = 0;
		for(var i=0; i<dayData.length; i++) {
			if(dayData[i]["hired"] == f) {
				nrOfFalse++;
				console.log("FALSE");
			}
		}
		return nrOfFalse;
	}









	for(var i=0; i<=24; i++) {
		
		//console.log("data[i].time: " + i);

		var deg = (2*Math.PI)/24;
		var r = 100;
		var x = Math.cos(i*deg)*r + r;
		var y = Math.sin(i*deg)*r + r;

		lineData.push({"x": x, "y": y});
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








