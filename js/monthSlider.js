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

	// Set the slider to pick day of the month
    d3.select('#sliderDiv')
    .append("div")
        .attr("class","slider")
        .attr("fill", "white")
    .call(d3.slider()
        .axis(d3.svg.axis()
            .tickFormat(function(d) { 
                return d; 
              })
            .ticks(31)
        	)
            .min(1)
            .max(31)
            .step(1)
            .value(1)
        .on("slide", function(evt, value) {
	 		var num = value;
 			value = (value<10) ? "0" + value : value;
 			var d = "2013-03-" + value;

 			setLocalData(data, new Date(d)); 
        })
    )

	this.setGlobalDataGlobal = function(_data, date) {
		setLocalData(_data, date);
	}
}