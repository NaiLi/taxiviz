function interaction() {

	var self = this;

	var file = "data/reducedTable_sortedbyDateTime.csv";

	var div = $("#interaction");

    var margin = [30, 10, 10, 10],
        width = div.width();// - margin[1] - margin[3],
        height = div.height();// - margin[0] - margin[2];

	var data;
	var day;

	var weekScale = d3.scale.linear()
		.domain([1,24])
		.range([1,width]);

	var weekAxis = d3.svg.axis()
		.scale(weekScale)
		.ticks(24)
		.orient("bottom");


	var svg = d3.select("#interaction").append("svg:svg")
    .attr("height", height)
    .append("svg:g");

	d3.csv(file, function(data) {
		self.data = data;
		run(data);
	});

	function run(data) {
		self.day = map.getOneDay(data, new Date("2013-03-04"));
	}
	
	var slide = d3.select("#weekslide").on("input", function() {

			var num = this.value;
			var hourData = map.getHourOf(self.day, num);

			map.createHeatMapGlobal(createLocArray(hourData, 0, hourData.length-1));
		
    	});
/*
	svg.call(weekAxis)
		.attr("x", width);*/

	function createLocArray(data, from, to) {

		var temp = [];

		for(i=from; i<to; ++i) {
			obj = {
				location: new google.maps.LatLng(data[i]["y_coord"], data[i]["x_coord"]),
				weight: (data[i]["weight"]/4)
			}
			temp.push(obj);
		}
		return temp;
	}
}