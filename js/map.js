function map() {

	var data;

	d3.csv("data/taxi_sthlm_march_2013_small.csv", function(error, data) {
		self.data = data;

		draw(data);
	});

	function draw(data) {
		console.log(data[0]["x_cord"]);
	}
}

