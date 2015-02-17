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

	}
}

