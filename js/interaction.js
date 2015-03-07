function interaction() {

	var self = this;

	var file = "data/reducedTable_sortedbyDateTime.csv";

	var div = $("#interaction");
	//var slider_hor = $("#slider_hor");


	var slider = $('#slider').CircularSlider({
	    radius: 125,
	    innerCircleRatio: '0.5',
	    handleDist: 100,
	    min: 0,
	    max: 23,
	    value: 0,
	    clockwise: true,
	    labelSuffix: "",
	    labelPrefix: "",
	    shape: "Circle",
	    touch: true,
	    animate: false,
	    selectable: false,
	    slide: function(ui, value) {},
	    formLabel: function(value) {

	    	var num = (value+14)%24;
			var hourData = map.getHourOf(self.day, value);
			map.createHeatMapGlobal(createLocArray(hourData, 0, hourData.length-1));
			num = (num<10) ? "0" + num : num;
			num = num + ":00";
			console.log(num)
	    	return null;
	    	//return value;
	    }
	});

    var margin = [30, 10, 10, 10],
        width = div.width();// - margin[1] - margin[3],
        height = div.height();// - margin[0] - margin[2];

	var data;
	var day;

/*
	var weekScale = d3.scale.linear()
		.domain([1,24])
		.range([1,width]);

	var weekAxis = d3.svg.axis()
		.scale(weekScale)
		.ticks(24)
		.orient("bottom");
*/

	var day = d3.select("#dayChart");
	
	day.append("div")
		.attr("id", "circleChart");

	d3.csv(file, function(data) {
		self.data = data;
		run(data);
	});

	function run(data) {
		self.day = map.getOneDay(data, new Date("2013-03-04"));
	}
	
	/*
	var slide = d3.select("#slider_hor").on("input", function() {

		num = this.value;
		var hourData = map.getHourOf(self.day, num);

		map.createHeatMapGlobal(createLocArray(hourData, 0, hourData.length-1));
	});*/

	function createLocArray(data, from, to) {

		var temp = [];

		for(i=from; i<to; ++i) {
			obj = {
				location: new google.maps.LatLng(data[i]["y_coord"], data[i]["x_coord"]),
				weight: (data[i]["weight"]/3)
			}
			temp.push(obj);
		}
		return temp;
	}
}