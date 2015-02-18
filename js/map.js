function map() {

	console.log("in function map()");

	var data;

	d3.csv("data/taxi_sthlm_march_2013_5000.csv", function(error, data) {
		self.data = data;

		var test = data[1];
		var x = data[1]["x_coord"];
		var y = data[1]["y_coord"];

		console.log(test);
		console.log(x);
		console.log(y);

		draw(data);

		//storeTaxiRoute(data, 11228);
	});

	function draw(data) {
		console.log("in function draw()");

		var taxiRoute = storeTaxiRoute(data, 10740);
		console.log(taxiRoute)
		google.maps.event.addDomListener(window, 'load', addMarkers(taxiRoute));

	}

	function addMarkers(taxis) {
		console.log("in function addMarkers()");

		var c = new google.maps.LatLng(taxis[1]["y_coord"],taxis[1]["x_coord"]); //TODO: byt till sthlm

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
			    anchor: new google.maps.Point(20, 22),
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

	function allFreeTaxis(data) {
		console.log("in function allFreeTaxis()");

		var freeTaxis = [];

		for(i=0; i<data.length; i++) {

			if(data[i]["hired"] == "f") {
				freeTaxis.push(data[i]);
			}
		}

		return freeTaxis;
	}
}

