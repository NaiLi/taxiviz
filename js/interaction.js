function interaction() {

	var self = this;
	var localData = [];

	var file = "data/reducedTable_sortedbyDateTime.csv";

	var div = $("#interaction");

    var margin = [30, 10, 10, 10],
        width = div.width();// - margin[1] - margin[3],
        height = div.height();// - margin[0] - margin[2];

	var data;
	var day;

	slider = $('#slider').CircularSlider({
	    radius: 125,
	    innerCircleRatio: '0.5',
	    handleDist: 100,
	    min: 0,
	    max: 23,
	    value: 18,
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
			var hourData = map.getHourOf(self.day, num);
	    	if(hourData) {
	    	}
			map.createHeatMapGlobal(createLocArray(localData[num], 0, hourData.length-1));
			circleChart.updateGlobal(value);
			num = (num<10) ? "0" + num : num;
			num = num + ":00";
	    	return null;
	    	//return value;
	    }
	});

	var dayDiv = d3.select("#dayChart");
	
	dayDiv.append("div")
		.attr("id", "circleChart");

	d3.csv(file, function(data) {
		self.data = data;
		run(data);
	});

	function run(data) {
		self.day = data;//map.getOneDay(data, new Date("2013-03-04"));

		// SAVES THE DATA TO BE STORED 
		for(var i=0; i<24; i++) {
			var temp  = map.getHourOf(self.day, i);
			localData.push(temp);
		};
	}

	function createLocArray(data, from, to) {

		var temp = [];

		for(i=from; i<to; ++i) {
			obj = {
				location: new google.maps.LatLng(data[i]["y_coord"], data[i]["x_coord"]),
				weight: (data[i]["weight"])/100
			}
			temp.push(obj);
		}
		return temp;
	}
}