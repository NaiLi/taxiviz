function interaction() {

	var data;

	var h = document.getElementById('dayChart').clientHeight;

	slider = $('#slider').CircularSlider({
	    radius: (h/2.2),
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
			map.createHeatMapGlobal(createLocArray(localData[num], 0, localData[num].length-1));
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

	function createLocArray(data, from, to) {

		var temp = [];

		for(i=from; i<to; ++i) {
			obj = {
				location: new google.maps.LatLng(data[i]["y_coord"], data[i]["x_coord"]),
				weight: (data[i]["weight"])/2
			}
			temp.push(obj);
		}
		return temp;
	}
}