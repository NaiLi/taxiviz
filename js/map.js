function map() {

	var self = this;

	console.log("in function map()");


	// Global variables
	var file = "data/reducedTable_sortedbyDateTime.csv";
	var data;
	var map;
	var tickCounter;
	var part;
	var prevHeatmap;
	var currHeatmap;

	d3.csv(file, function(error, data) {
	//d3.csv("data/taxi.csv", function(error, data) {
		self.data = data;
		self.tickCounter = 0;
		self.part = 7*24;
		run(data);

	});

	function run(data) {

		//console.log("in run()");

		// Creates the map
		initializeMap();

		var day = self.getOneDay(data, new Date("2013-03-04")); 
		var hour = self.getHourOf(day,17);

		draw(data);

		//createHeatMap(createLocArray(data, 0,10000)); //initially shown cars
	}

	function initializeMap() {

		var stockholm = new google.maps.LatLng(59.326142,17.9875455);

		var mapOptions = {
		  zoom: 11,
		  center: stockholm
		}

		map = new google.maps.Map(document.getElementById("map"), mapOptions);
	}

	this.createHeatMapGlobal = function(data) {
		createHeatMap(data);	
	}

	function createHeatMap(data) {

		var temp = data;
		var pointArray = new google.maps.MVCArray(temp);

  		var heatmap = new google.maps.visualization.HeatmapLayer({
    		data: pointArray
  		});

  		heatmap.setMap(map);

		//create heatmap
		if(self.currHeatmap != null) {
			self.prevHeatmap = self.currHeatmap;
			self.currHeatmap = heatmap;
			self.prevHeatmap.setMap(null);
		} else {
			self.currHeatmap = heatmap;
		}

  		//return heatmap;
	}

	function draw(data) {

		var taxiRoute = storeTaxiRoute(data, 10010);
		taxiRoute = sortByDate(taxiRoute);
		var freeTaxis = allFreeOrHiredTaxis(data, "t");
		//google.maps.event.addDomListener(window, 'load', addMarkers(taxiRoute));

	}

	function addMarkers(taxis) {

		for(i=0; i<taxis.length; i++) {

			var myLatlng = new google.maps.LatLng(taxis[i]["y_coord"],taxis[i]["x_coord"]);

			var imgUrl = (taxis[i]["hired"] == "t") ? 'img/red.png' : 'img/green.png';
			var image = {
			    url: imgUrl,

			    origin: new google.maps.Point(0,0),
			    anchor: new google.maps.Point(10, 10),
			    scaledSize: new google.maps.Size(10, 10)
			  };

				var marker = new google.maps.Marker({
				    position: myLatlng,
				    //map: map,
				    title:"Taxi 2",
				    icon: image
				});

				marker.setMap(map);			
		}
	}

	function storeTaxiRoute(data, id) {

		var route = [];

		for(i=0; i<data.length ; i++) {

			if(data[i]["id"] == id) {
				
				route.push(data[i]);
			}
		}

		return route; 
	}

	function allFreeOrHiredTaxis(data, wanted) {

		var freeTaxis = [];

		for(i=0; i<data.length; i++) {

			if(data[i]["hired"] == wanted) {
				freeTaxis.push(data[i]);
			}
		}

		return freeTaxis;
	}

	function sortByDate(array) {

		array.sort(function(a,b) {
			return a["date"] > b["date"];
		})

		return array;
	}

	function createLocArray(data, from, to) {

		var temp = [];
 
		for(i=from; i<to; ++i) {
			var t = new google.maps.LatLng(data[i]["y_coord"], data[i]["x_coord"]);
			temp.push(t);
		}
		return temp;
	}
	

	this.tickMap = function tickMap() {

		var temp;
		var countFrom;
		var countTo;

		var timer = setInterval(function() {

			countFrom = Math.floor(self.tickCounter*(self.data.length/(self.part)));
			self.tickCounter++;
            countTo = Math.floor(self.tickCounter*self.data.length/(self.part));

            
            if(countFrom >= self.data.length) {
            	clearInterval(timer);
            } else if(countFrom < self.data.length && countTo > self.data.length) {
            	countTo = self.data.length;
				temp = createLocArray(self.data, countFrom, countTo);
				createHeatMap(temp);
            } else {
				temp = createLocArray(self.data, countFrom, countTo);
				createHeatMap(temp);
            }
        }
        , 100);
	}

	//collects all sub data of one date. Not depending on sorting. 
	this.getOneDay = function getOneDay(data, searchDate) {

		var temp = [];

		for(i=0; i<data.length; ++i) {

			var d = new Date(data[i].date);

			if(+d == +searchDate) {
				temp.push(data[i]);
			}
		}
		return temp;
	}

	//collects all sub data of one hour from data consisting of only one day
	this.getHourOf = function getHourOf(dayData, hour) {

		var temp = [];
		var hourstr = (hour<10) ? "0"+hour : hour;
		var str;

		for(i=0; i<dayData.length; ++i) {

			str = dayData[i]["time"].substring(0,2);
			
			if(str == hourstr) {
				temp.push(dayData[i]);
			}
		}
		return temp;
	}
}






















