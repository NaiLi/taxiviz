function circleChart(){
	//console.log("in function circleChart");

	var file = "data/reducedTable_sortedbyDateTime.csv";
	//var file = "data/weekOne_sortedbyDateTime.csv";
	
	var self = this;
	var ccDiv = $("circleChart");
	var data;

	var hired;
	var lineData = [];
	var week = [];

	d3.csv(file, function(error, data) {

		run(data);

	});


	function run(data) {
	
		var test = data.length;
		console.log("test: " + test);
		//draw();
		createCircleChart(data);
	};

	function createCircleChart(data) {

		var l = data.length;
		console.log("data.length: " + l);

		var h00_t = h01_t = h02_t = h03_t = h04_t = h05_t = h06_t = h07_t = h08_t = h09_t = h10_t = h11_t = 
				h12_t = h13_t = h14_t = h15_t = h16_t = h17_t = h18_t = h19_t = h20_t = h21_t = h22_t = h23_t =  100;	

		// TODO data should be the data for only chosen day
		var data1 = map.getOneDay(data, new Date("2013-03-04"));

		var h00_f = getNrOfFalse(map.getHourOf(data1, 00));
		var h01_f = getNrOfFalse(map.getHourOf(data1, 01));
		var h02_f = getNrOfFalse(map.getHourOf(data1, 02));
		var h03_f = getNrOfFalse(map.getHourOf(data1, 03));
		var h04_f = getNrOfFalse(map.getHourOf(data1, 04));
		var h05_f = getNrOfFalse(map.getHourOf(data1, 05));
		var h06_f = getNrOfFalse(map.getHourOf(data1, 06));
		var h07_f = getNrOfFalse(map.getHourOf(data1, 07));
		var h08_f = getNrOfFalse(map.getHourOf(data1, 08));
		var h09_f = getNrOfFalse(map.getHourOf(data1, 09));
		var h10_f = getNrOfFalse(map.getHourOf(data1, 10));
		var h11_f = getNrOfFalse(map.getHourOf(data1, 11));
		var h12_f = getNrOfFalse(map.getHourOf(data1, 12));
		var h13_f = getNrOfFalse(map.getHourOf(data1, 13));
		var h14_f = getNrOfFalse(map.getHourOf(data1, 14));
		var h15_f = getNrOfFalse(map.getHourOf(data1, 15));
		var h16_f = getNrOfFalse(map.getHourOf(data1, 16));
		var h17_f = getNrOfFalse(map.getHourOf(data1, 17));
		var h18_f = getNrOfFalse(map.getHourOf(data1, 18));
		var h19_f = getNrOfFalse(map.getHourOf(data1, 19));
		var h20_f = getNrOfFalse(map.getHourOf(data1, 20));
		var h21_f = getNrOfFalse(map.getHourOf(data1, 21));
		var h22_f = getNrOfFalse(map.getHourOf(data1, 22));
		var h23_f = getNrOfFalse(map.getHourOf(data1, 23));
	

		var chartData = [	{	"Hired": true,
												"data": {	"00": h00_t, "01": h01_t, "02": h02_t, "03": h03_t, "04": h04_t, "05": h05_t, "06": h06_t, "07": h07_t, "08": h08_t, "09": h09_t, "10": h10_t, "11": h11_t, 
																	"12": h12_t, "13": h13_t, "14": h14_t, "15": h15_t, "16": h16_t, "17": h17_t, "18": h18_t, "19": h19_t, "20": h20_t, "21": h21_t, "22": h22_t, "23": h23_t 
																}
		  								},
		  								{ "Hired": false,
												"data": {	"00": h00_f, "01": h01_f, "02": h02_f, "03": h03_f, "04": h04_f, "05": h05_f, "06": h06_f, "07": h07_f, "08": h08_f, "09": h09_f, "10": h10_f, "11": h11_f, 
																	"12": h12_f, "13": h13_f, "14": h14_f, "15": h15_f, "16": h16_f, "17": h17_f, "18": h18_f, "19": h19_f, "20": h20_f, "21": h21_f, "22": h22_f, "23": h23_f 
																}
												}
		]

		var chart = radialBarChart()
		.barHeight(250)
		.domain([0,100])
		.barColors(['green', 'red'])
		.tickValues([5,10,15])
    .tickCircleValues([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);


		d3.select('#circleChart')
		.datum(chartData)
		.call(chart);

	}

	function getNrOfFalse(data) {

		var nrOfFalse = 0;
		for(var i=0; i<data.length; i++) {

			if(data[i]["hired"] == "f") {

				nrOfFalse++;
			}
		}

		output = (nrOfFalse/data.length)*100;

		console.log("nrOfFalse: " + nrOfFalse);
		console.log("output: " + output);
		return output;
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








