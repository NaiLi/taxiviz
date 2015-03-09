function map() {

	var self = this;

	// Global variables
	var file = "data/reducedTable_sortedbyDateTime.csv";
	var data;
	var day;
	var map;
	var tickCounter;
	var part;
	var prevHeatmap;
	var currHeatmap;

	var localData = [];

	// READING THE DATA
	d3.csv(file, function(error, data) {
		self.data = data;
		run(data);
	});

	// FIRST THING THAT HAPPENS
	function run(data) {

		// Creates the map
		initializeMap();
		// EXTRAXTS ONE DAY TO DRAW
		self.day = data;//self.getOneDay(data, new Date("2013-03-04")); 
		//var hour = self.getHourOf(self.day,8);
		//draw(localData[0]);

		// SAVES THE DATA TO BE STORED 
		for(var i=0; i<24; i++) {
			var temp  = self.getHourOf(self.day, i);
			//console.log("i: ", i);
			//console.log("self.day", self.day);
			localData.push(temp);
		};

		//console.log(localData);

		draw(localData[18]);

	}

	// FUNCTION TO CALL EVERYTHING THAT SHOULD BE DRAWN ON MAP
	function draw(data) {

		createHeatMap(createLocArray(data, 0, data.length-1));

		//var taxiRoute = storeTaxiRoute(data, 10010);
		//taxiRoute = sortByDate(taxiRoute);
		//var freeTaxis = allFreeOrHiredTaxis(data, "t");
		//google.maps.event.addDomListener(window, 'load', addMarkers(taxiRoute));

	}

	function initializeMap() {

		// CREATES LATLONG VARIABLE FOR STHML
		var stockholm = new google.maps.LatLng(59.326142,17.9875455);

		var mapOptions = {
			// SET THE TYPE OF MAP 
			// HYBRID	Displays a photographic map + roads and city names
			// ROADMAP	Displays a normal, default 2D map 
			// SATELLITE	Displays a photographic map
			// TERRAIN Displays a map with mountains, rivers, etc.
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			// SETS LEVEL OF ZOOM
		  zoom: 11,
		  // CENTERS STHML
		  center: stockholm
		}

		// CREATES THE MAP IN MAP-DIV
		map = new google.maps.Map(document.getElementById("map"), mapOptions);
	}

	// GLOBAL FUNCTION TO REACH createHeatMap FORM OTHER FILE
	this.createHeatMapGlobal = function(data) {
		createHeatMap(data);	
	}

	// FUNCTION THAT CREATES THE HEATMAP
	function createHeatMap(data) {

		// CREATES THE HEATMAP LAYER
	  	var heatmap = new google.maps.visualization.HeatmapLayer({
	   		// CREATING COLORS FOR HEATMAP, COLORBLINDNESS!
	   		gradient: [	'rgba(0,	 0, 255, 0)',
	  		  					'rgba(51,	 0, 255, 5)', 
	    							'rgba(102, 0, 255, 5)', 
	    							'rgba(154, 0, 255, 5)', 
	    							'rgba(203, 0, 255, 5)', 
	    							'rgba(255, 0, 255, 5)', 
	    							'rgba(255, 0, 203, 5)', 
	    							'rgba(255, 0, 152, 5)', 
	    							'rgba(255, 0, 102, 5)', 
	    							'rgba(255, 0, 51,	 5)', 
	    							'rgba(255, 0, 0,	 5)'],
	    	// SETTING THE DATA FOR HEATMAP
	    	data: data
	    	//radius: 20
	  		});

  		// LAYERS THE HEATMAP ON THE MAP
  		heatmap.setMap(map);

		// create heatmap
		if(self.currHeatmap != null) {
			self.prevHeatmap = self.currHeatmap;
			self.currHeatmap = heatmap;
			self.prevHeatmap.setMap(null);
		} else {
			self.currHeatmap = heatmap;
		}
  		//return heatmap;
	}


/*
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
				    title:"Taxi 2",
				    icon: image
				});

				marker.setMap(map);			
		}
	}
*/
/*
	function storeTaxiRoute(data, id) {

		var route = [];

		for(i=0; i<data.length ; i++) {

			if(data[i]["id"] == id) {
				
				route.push(data[i]);
			}
		}

		return route; 
	}
*/

/*
	function allFreeOrHiredTaxis(data, wanted) {

		var freeTaxis = [];

		for(i=0; i<data.length; i++) {

			if(data[i]["hired"] == wanted) {
				freeTaxis.push(data[i]);
			}
		}

		return freeTaxis;
	}
*/
/*
	function sortByDate(array) {

		array.sort(function(a,b) {
			return a["date"] > b["date"];
		})

		return array;
	}
*/

	// CREATES DATA FOR HEAT MAP WITH LATLONG AND WEIGHT
	function createLocArray(data, from, to) {

		var temp = [];
		for(i=from; i<to; ++i) {

			obj = {
				location: new google.maps.LatLng(data[i]["y_coord"], data[i]["x_coord"]),
				weight: ((data[i]["weight"])/100)};

			temp.push(obj);
		}
		return temp;
	}
	

	this.tickMap = function tickMap() {

		var hour = 8; // start with hour 8 (morning)
		var positionInClock = 18; // start with position 18 in clock
		var count = 0; // count 24 hours

		var timer = setInterval(function() {
			
			if(count > 23) {
				clearInterval(timer);
			}
			if(hour > 23) {
				hour = 0;
			}
			if(positionInClock > 23) {
				positionInClock = 0;
			}

			var dh = localData[hour];
			dh = createLocArray(dh, 0, dh.length-1);
			createHeatMap(dh);
			
			slider.setValue(positionInClock) // Move slider position

			hour++;
			positionInClock++;
			count++;

		}, 1000);
	}

/*
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
*/

	//collects all sub data of one hour from data consisting of only one day
	this.getHourOf = function getHourOf(dayData, hour) {

		if(dayData) {


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
		return false;
	}
}
