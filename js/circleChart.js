function circleChart(){
	
	var self = this;
	var data;
	var chartData;
	var chart;
	var chosen = 0;

	var hired;
	var lineData = [];
	var week = [];

	this.run = function run(data) {
	
		chartData = createChartData(data, "free");

		createCircleChart(data);
	};

	this.updateGlobal = function(hour) {
		update(hour);
	}

	function update(hour) {
	 	if(chart!=undefined) {
	 		chart.setChosen(hour);
		
		  	d3.select('#circleChart')
		    	.datum(chartData)
		    	.call(chart);
	 	}
	}

	function createCircleChart(data) {

		//TESTING TO CREATE COLORS
		var colors = [];
		colors.push("red");
		for(var i=0; i<23; i++) {
			colors.push("	green");
		}

		// Creating circle chart of free cars
		var chartDataFree = createChartData(data, "free");

		chart = radialBarChart()
		.barHeight(100)
		.reverseLayerOrder(false)
		.capitalizeLabels(true)
		.barColors(createColors())
		.domain([0,100])
		.tickValues([30,60,90])
		.tickCircleValues([10,20,30,40,50,60,70,80,90]);

		d3.select('#circleChart')
		.datum(chartDataFree)
		.call(chart);
	}

	function getNrOfFalse(data) {

		var totalNrOfPosts = 0;
		var nrOfFalse = 0;
		for(var i=0; i<data.length; i++) {

			var temp = 1.;
			if(data[i]["weight"] != 1) {
				temp = parseInt(data[i]["weight"].valueOf());
			}

			if(data[i]["hired"] == "f") {

				nrOfFalse = nrOfFalse + temp;
			}

			totalNrOfPosts = totalNrOfPosts + temp;
		}

		output = (nrOfFalse/totalNrOfPosts)*100;
		return output;
	}

	function getNrOfTrue(data) {

		var totalNrOfPosts = 0;
		var nrOfTrue = 0;
		for(var i=0; i<data.length; i++) {

			var temp = 1.;
			if(data[i]["weight"] != 1) {
				temp = parseInt(data[i]["weight"].valueOf());
			}

			if(data[i]["hired"] == "t") {

				nrOfTrue = nrOfTrue + temp;
			}

			totalNrOfPosts = totalNrOfPosts + temp;
		}

		output = (nrOfTrue/totalNrOfPosts)*100;
		return output;
	}

	//Create color array
	function createColors() {

		var colors = [];
		for(var i=0; i<24; i++) {
			// Night
			if(i>5 && i<18) {
				colors.push("#31567A");
			}
			// Day
			else {
				colors.push("#FBFF8F");
			}
		}
		return colors;
	}

	// Creating data showing hired cars in the middle
	function createChartData(data, innerShowing) {

		var h00_outer = h01_outer = h02_outer = h03_outer = h04_outer = h05_outer = h06_outer = h07_outer = h08_outer = h09_outer = h10_outer = h11_outer = 
			h12_outer = h13_outer = h14_outer = h15_outer = h16_outer = h17_outer = h18_outer = h19_outer = h20_outer = h21_outer = h22_outer = h23_outer =  100;	

		// Extracting data from one chosen day
		var data1 = data;//map.getOneDay(data, new Date("2013-03-04"));

		var h00 = map.getHourOf(data1, 00);
		var h01 = map.getHourOf(data1, 01);
		var h02 = map.getHourOf(data1, 02);
		var h03 = map.getHourOf(data1, 03);
		var h04 = map.getHourOf(data1, 04);
		var h05 = map.getHourOf(data1, 05);
		var h06 = map.getHourOf(data1, 06);
		var h07 = map.getHourOf(data1, 07);
		var h08 = map.getHourOf(data1, 08);
		var h09 = map.getHourOf(data1, 09);
		var h10 = map.getHourOf(data1, 10);
		var h11 = map.getHourOf(data1, 11);
		var h12 = map.getHourOf(data1, 12);
		var h13 = map.getHourOf(data1, 13);
		var h14 = map.getHourOf(data1, 14);
		var h15 = map.getHourOf(data1, 15);
		var h16 = map.getHourOf(data1, 16);
		var h17 = map.getHourOf(data1, 17);
		var h18 = map.getHourOf(data1, 18);
		var h19 = map.getHourOf(data1, 19);
		var h20 = map.getHourOf(data1, 20);
		var h21 = map.getHourOf(data1, 21);
		var h22 = map.getHourOf(data1, 22);
		var h23 = map.getHourOf(data1, 23);

		if(innerShowing == "free") {

			var h00_inner = getNrOfFalse(h00);
			var h01_inner = getNrOfFalse(h01);
			var h02_inner = getNrOfFalse(h02);
			var h03_inner = getNrOfFalse(h03);
			var h04_inner = getNrOfFalse(h04);
			var h05_inner = getNrOfFalse(h05);
			var h06_inner = getNrOfFalse(h06);
			var h07_inner = getNrOfFalse(h07);
			var h08_inner = getNrOfFalse(h08);
			var h09_inner = getNrOfFalse(h09);
			var h10_inner = getNrOfFalse(h10);
			var h11_inner = getNrOfFalse(h11);
			var h12_inner = getNrOfFalse(h12);
			var h13_inner = getNrOfFalse(h13);
			var h14_inner = getNrOfFalse(h14);
			var h15_inner = getNrOfFalse(h15);
			var h16_inner = getNrOfFalse(h16);
			var h17_inner = getNrOfFalse(h17);
			var h18_inner = getNrOfFalse(h18);
			var h19_inner = getNrOfFalse(h19);
			var h20_inner = getNrOfFalse(h20);
			var h21_inner = getNrOfFalse(h21);
			var h22_inner = getNrOfFalse(h22);
			var h23_inner = getNrOfFalse(h23);

		}
		else if (innerShowing == "hired") {

			var h00_inner = getNrOfTrue(h00);
			var h01_inner = getNrOfTrue(h01);
			var h02_inner = getNrOfTrue(h02);
			var h03_inner = getNrOfTrue(h03);
			var h04_inner = getNrOfTrue(h04);
			var h05_inner = getNrOfTrue(h05);
			var h06_inner = getNrOfTrue(h06);
			var h07_inner = getNrOfTrue(h07);
			var h08_inner = getNrOfTrue(h08);
			var h09_inner = getNrOfTrue(h09);
			var h10_inner = getNrOfTrue(h10);
			var h11_inner = getNrOfTrue(h11);
			var h12_inner = getNrOfTrue(h12);
			var h13_inner = getNrOfTrue(h13);
			var h14_inner = getNrOfTrue(h14);
			var h15_inner = getNrOfTrue(h15);
			var h16_inner = getNrOfTrue(h16);
			var h17_inner = getNrOfTrue(h17);
			var h18_inner = getNrOfTrue(h18);
			var h19_inner = getNrOfTrue(h19);
			var h20_inner = getNrOfTrue(h20);
			var h21_inner = getNrOfTrue(h21);
			var h22_inner = getNrOfTrue(h22);
			var h23_inner = getNrOfTrue(h23);
		}
		
		var chartData = [	{	"Outer": true,
												"data": {	00: h00_outer, 01: h01_outer, 02: h02_outer, 03: h03_outer, 04: h04_outer, 05: h05_outer, 
																	06: h06_outer, 07: h07_outer, 08: h08_outer, 09: h09_outer, 10: h10_outer, 11: h11_outer, 
																	12: h12_outer, 13: h13_outer, 14: h14_outer, 15: h15_outer, 16: h16_outer, 17: h17_outer, 
																	18: h18_outer, 19: h19_outer, 20: h20_outer, 21: h21_outer, 22: h22_outer, 23: h23_outer
																}
		  								},
		  								{ "Inner": false,
												"data": {	00: h00_inner, 01: h01_inner, 02: h02_inner, 03: h03_inner, 04: h04_inner, 05: h05_inner, 
																	06: h06_inner, 07: h07_inner, 08: h08_inner, 09: h09_inner, 10: h10_inner, 11: h11_inner, 
																	12: h12_inner, 13: h13_inner, 14: h14_inner, 15: h15_inner, 16: h16_inner, 17: h17_inner, 
																	18: h18_inner, 19: h19_inner, 20: h20_inner, 21: h21_inner, 22: h22_inner, 23: h23_inner,
																}
												}
		]

		return chartData;
	}
}
