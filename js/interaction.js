function interaction() {

	var self = this;

	var file = "data/reducedTable_sortedbyDateTime.csv";

	var div = $("#interaction");

    var margin = [30, 10, 10, 10],
        width = div.width();// - margin[1] - margin[3],
        height = div.height();// - margin[0] - margin[2];

	//var height = 50;
	//var width = 600;
	var data;
	var day;

	var weekScale = d3.scale.linear()
		.domain([1,24])
		.range([1,width]);

	var weekAxis = d3.svg.axis()
		.scale(weekScale)
		.ticks(6)
		.orient("bottom");


	var svg = d3.select("#interaction").append("svg:svg")
    //.attr("width", width)
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
			//console.log(num)
			//console.log(self.day.length)

			var hourData = map.getHourOf(self.day, num);

			map.createHeatMapGlobal(createLocArray(hourData, 0, hourData.length-1));
			draw();
		
    	});

	svg.call(weekAxis)
		.attr("x", width);
    /*
  	d3.select("#weekslide").on("input", function() {

  		var start = Math.floor((this.value - 1)*(self.data.length/7));
  		var stop = Math.floor((this.value)*(self.data.length/7));
  		console.log("start: " + start + "  stop:  " + stop);

  		//if(this.value == 1) {
			map.createHeatMapGlobal(createLocArray(self.data, start, stop));
  		//}
  		console.log(this.value);
  	})*/

    function draw() {
    	//console.log(self.data.length);
    	//map.createHeatMapGlobal(createLocArray(self.data, 0, self.data.length-1));
    }

	function createLocArray(data, from, to) {

		var temp = [];

		for(i=from; i<to; ++i) {
			obj = {
				location: new google.maps.LatLng(data[i]["y_coord"], data[i]["x_coord"]),
				weight: (data[i]["weight"]/4)
			}
			temp.push(obj);
		}
		//console.log(temp)
		return temp;
	}
}




















