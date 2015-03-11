function monthSlider() {

	function setLocalData(_data, date) {

		//clean local data
		localData = [];

		var day = map.getOneDay(_data, date);

		for(var i=0; i<24; i++) {
			var temp  = map.getHourOf(day, i);
			localData.push(temp);
		};
		map.run();
	}

	var x = d3.scale.linear().domain([1,31]).range([0,300]).clamp(true);
	var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("top");

	var slide = d3.select("#monthSlider").on("input", function() {
 		 
 		var num = this.value;
 		num = (num<10) ? "0" + num : num;
 		var d = "2013-03-" + num;
 		//console.log(new Date(d));

 		setLocalData(data, new Date(d)); 
	})
	
	slide.append("g")
	.call(xAxis)
	.select(".domain");

	this.setGlobalDataGlobal = function(_data, date) {
		setLocalData(_data, date);
	}
/*
	var slide2 = d3.select("#monthSlider2").call(d3.slider()).on("input", function() {
		console.log("hej")
	});*/
}