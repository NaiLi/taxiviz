function map() {

	console.log("in function map()");

	// Global variables
	var data;
	var map;
	var tickCounter;
	var part;
	var prevHeatmap;
	var currHeatmap;

	d3.csv("data/weekOne_sortedbyDateTime.csv", function(error, data) {
	//d3.csv("data/taxi.csv", function(error, data) {
		self.data = data;
		self.tickCounter = 0;
		self.part = 7*24;
		run(data);

	});

	function run(data) {

		// Creates the map
		initializeMap();

		draw(data);

		createHeatMap(createLocArray(0,10000)); //initially shown cars
	}

	function initializeMap() {

		var stockholm = new google.maps.LatLng(59.326142,17.9875455);

		var mapOptions = {
		  zoom: 11,
		  center: stockholm
		}

		map = new google.maps.Map(document.getElementById("map"), mapOptions);
	}

	function createHeatMap(data) {


		// Create array with lat,long
		/*
		var temp = [];

		console.log(data.length)
		for(i=0; i<data.length; i++) {
			
			//console.log("data[i]: " + data[i][x_coord]);
			//  new google.maps.LatLng(37.782551, -122.445368),
			var t = new google.maps.LatLng(data[i]["y_coord"], data[i]["x_coord"]);
			temp.push(t);
			
		}*/
		var temp = data;

		var pointArray = new google.maps.MVCArray(temp);

		//console.log("pointArray.length: " + pointArray.length);

  		var heatmap = new google.maps.visualization.HeatmapLayer({
    		data: pointArray
  		});

  		heatmap.setMap(map);

  		return heatmap;
	}




	function draw(data) {
		//console.log("in function draw()");

		var taxiRoute = storeTaxiRoute(data, 10010);
		//console.log(taxiRoute);
		taxiRoute = sortByDate(taxiRoute);
		//console.log(taxiRoute);
		var freeTaxis = allFreeOrHiredTaxis(data, "t");
		google.maps.event.addDomListener(window, 'load', addMarkers(taxiRoute));

	}

	function addMarkers(taxis) {
		//console.log("in function addMarkers()");

		

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
		//console.log("in function storeTaxiRoute()");

		var route = [];

		for(i=0; i<data.length ; i++) {

			if(data[i]["id"] == id) {
				
				route.push(data[i]);
			}
		}

		return route; 
	}

	function allFreeOrHiredTaxis(data, wanted) {
		//console.log("in function allFreeTaxis()");

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

	function createLocArray(from, to) {

		var temp = [];
 
		for(i=from; i<to; ++i) {
			var t = new google.maps.LatLng(self.data[i]["y_coord"], self.data[i]["x_coord"]);
			temp.push(t);
		}
		return temp;
	}
	

	this.tickMap = function tickMap() {

		this.timer = setInterval(function() {

			//create temp array that is subarray of data set
			//var temp = [];

			var countFrom = Math.floor(self.tickCounter*(self.data.length/(self.part)));
			self.tickCounter++;
            var countTo = Math.floor(self.tickCounter*self.data.length/(self.part));

            if(countTo > self.data.length && countFrom < self.data.length) {
            	countTo = self.data.length;
            } else if(countFrom > self.data.length) {
            	clearInterval(this.timer);
            }
            //console.log(countFrom)
            /*
			for(i=countFrom; i<countTo; ++i) {
				var t = new google.maps.LatLng(self.data[i]["y_coord"], self.data[i]["x_coord"]);
				temp.push(t);
			}*/
			var temp = createLocArray(countFrom, countTo);

			//create heatmap
			if(self.currHeatmap != null) {
				self.prevHeatmap = self.currHeatmap;
				self.currHeatmap = createHeatMap(temp);
				self.prevHeatmap.setMap(null);
			} else {
				self.currHeatmap = createHeatMap(temp);
			}


        }
        , 100);
	}
}

