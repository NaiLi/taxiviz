var slider;
var data;
var dayData; 

var file = "data/reducedTable_sortedbyDateTime.csv";
var localData = [];
var map = new map();
var interaction;
var monthSlider = new monthSlider();
var circleChart = new circleChart();

d3.csv(file, function(data) {

	this.data = data;

	//use to get entire data set:
	//self.data = data;
	//use if we want only one day:
	/*self.data = map.getOneDay(data, new Date("2013-03-12"));

	for(var i=0; i<24; i++) {
		var temp  = map.getHourOf(self.data, i);
		localData.push(temp);
	};*/

	monthSlider.setGlobalDataGlobal(data, new Date("2013-03-01"));

	interaction = new interaction();
	map.run();
	circleChart.run(dayData);
});
