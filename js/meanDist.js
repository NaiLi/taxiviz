function meanDist() {
	/*Calculate mean distance of a hired route
	 *Data argument should be sorted by time first*/

   var oneDist;

  this.run = function(data) {

    var done = false;
    var i;
    var startPoint;
    var endPoint;

    //Find random car
    //var rand = Math.floor(Math.random()*data.length);

    //getStartAndEnd(data, rand);

    getSeveralDistances(data);

  }

  function getSeveralDistances(data) {

    var distances = [];
    for(i=0; i<3; i++) {
      var rand = Math.floor(Math.random()*data.length);
      var dist = getDistanceOfIndexCar(data, rand);
      console.log(dist)

    }
  }

  //TODO border cases!
  function getDistanceOfIndexCar(data, i) {
    var car = data[i];
    console.log(car["hired"])
    //if we start at hired, search for false first:
    while(car["hired"] == "t") {
      i++;
      if(car["id"] == data[i]["id"]) 
        car = data[i];
    }

    //if not (or after) we want to find the next time it is hired
    while(car["hired"] == "f") {
      i++;
      if(car["id"] == data[i]["id"]) 
        car = data[i];
    }

    startPoint = car;

    //Search for end of the same route
    var temp;
    while(car["hired"] == "t") {
      temp = car;
      i++;
      if(car["id"] == data[i]["id"]) 
        car = data[i];
    }

    endPoint = temp;

    //console.log("the car " + startPoint["id"] + "(" + endPoint["id"] + ") has gone from ");
    //console.log(startPoint["hired"] + " to " + endPoint["hired"] + " (not " + car["hired"] + ")")

    return calcDist(startPoint, endPoint);
  }

  //Calculate distance between start and end point
  function calcDist(start, end) { //calculate euclidian distance between start and end point

    var a = new google.maps.LatLng(start["y_coord"], start["x_coord"]);
    var b = new google.maps.LatLng(end["y_coord"], end["x_coord"]);

    var origin = start["y_coord"] + "," + start["x_coord"];
    var destination = end["y_coord"] + "," + end["x_coord"];

    //fågeldistans
    //var dist = google.maps.geometry.spherical.computeDistanceBetween (a, b);
    //console.log(dist)

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,/*
      transitOptions: TransitOptions,
      unitSystem: UnitSystem,
      durationInTraffic: Boolean,
      avoidHighways: Boolean,
      avoidTolls: Boolean,*/
    }, callback);

    function callback(response, status) {
      if (status == google.maps.DistanceMatrixStatus.OK) {
      //console.log("in callback " + response.originAddresses)

      var distance = response.rows[0].elements[0].distance.text;
      this.oneDist = distance;
      console.log("distance: " + distance);
      // See Parsing the Results for
      // the basics of a callback function.
      }
    }
    console.log("in cald " + this.oneDist)
    return this.oneDist; 
  }
}