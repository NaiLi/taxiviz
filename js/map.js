function map() {

	console.log("in function map()");

	var data;

	d3.csv("data/taxi_sthlm_march_2013_small.dsv", function(error, data) {
		self.data = data;

		var test = data[1];
		var x = data[1]["x_coord"];
		var y = data[1]["y_coord"];

		console.log(test);
		console.log(x);
		console.log(y);

		draw(data);
	});

	function draw(data) {
		console.log("in function draw()");

		//addMarker(data);
		google.maps.event.addDomListener(window, 'load', addMarker(data));


	}

	function addMarker(data) {
		console.log("in function addMarker()");

		var myLatlng = new google.maps.LatLng(data[1]["y_coord"],data[1]["x_coord"]);
		var mapOptions = {
		  zoom: 11,
		  center: myLatlng
		}

		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		var image = 'js/flower1.png';

		var marker = new google.maps.Marker({
		    position: myLatlng,
		    //map: map,
		    title:"Taxi 2"
		    //icon: image
		});

		marker.setMap(map);
	}
}

