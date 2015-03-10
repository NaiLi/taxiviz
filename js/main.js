var slider;
var data;

var file = "data/reducedTable_sortedbyDateTime.csv";
var localData = [];
var map = new map();
var interaction;
var circleChart = new circleChart();

d3.csv(file, function(data) {

	//use to get entire data set:
	//self.data = data;
	//use if we want only one day:
	self.data = map.getOneDay(data, new Date("2013-03-02"));

	for(var i=0; i<24; i++) {
		var temp  = map.getHourOf(self.data, i);
		localData.push(temp);
	};

	interaction = new interaction();
	map.run();
	circleChart.run(data);
});
