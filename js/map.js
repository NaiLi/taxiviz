function map() {

	console.log("in function map()");

	var data;

	d3.csv("data/taxi_sthlm_march_2013_5000.csv", function(error, data) {
		self.data = data;

		var test = data[1];
		var x = data[1]["x_coord"];
		var y = data[1]["y_coord"];

		draw(data);

		//storeTaxiRoute(data, 11228);
	});

	function draw(data) {
		console.log("in function draw()");

		var taxiRoute = storeTaxiRoute(data, 11266);
		console.log(taxiRoute);
		taxiRoute = sortByDate(taxiRoute);
		console.log(taxiRoute);
		var freeTaxis = allFreeOrHiredTaxis(data, "t");
		google.maps.event.addDomListener(window, 'load', addMarkers(taxiRoute));

	}

	function addMarkers(taxis) {
		console.log("in function addMarkers()");

		var c = new google.maps.LatLng(59.326142,17.9875455); //TODO: byt till sthlm

		var mapOptions = {
		  zoom: 11,
		  center: c
		}
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		for(i=0; i<taxis.length; i++) {

			var myLatlng = new google.maps.LatLng(taxis[i]["y_coord"],taxis[i]["x_coord"]);

			var imgUrl = (taxis[i]["hired"] == "f") ? 'js/flower1.png' : 'js/seastar1.png';
			var image = {
			    url: imgUrl,

			    origin: new google.maps.Point(0,0),
			    anchor: new google.maps.Point(10, 10),
			    scaledSize: new google.maps.Size(20, 20)
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
		console.log("in function storeTaxiRoute()");

		var route = [];

		for(i=0; i<data.length; i++) {

			if(data[i]["id"] == id) {
				
				route.push(data[i]);
			}
		}

		return route; 
	}

	function allFreeOrHiredTaxis(data, wanted) {
		console.log("in function allFreeTaxis()");

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
}

