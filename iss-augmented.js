//Advanced - calculating the distnce from me to the iss
Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
}

//taking input and calculating user location and iss location
var prompt = require('prompt');
var request = require('request');

prompt.get("Where do you live?", function(err, userInput) {
    if (err) {
        console.log('there was an error');
    }
    else {
        var myLocation = userInput['Where do you live?'];
        request('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLocation, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                var valActual1 = JSON.parse(result.body);
                // console.log(valActual1);
                var lat1 = valActual1.results[0].geometry.location.lat;
                // console.log(lat1);
                var long1 = valActual1.results[0].geometry.location.lng;
                console.log('In ' + myLocation + ' your latitude is:' + lat1 + ' and longitude is: ' + long1);

                request('https://api.wheretheiss.at/v1/satellites/25544', function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var valActual2 = JSON.parse(result.body);
                        var lat2 = valActual2.latitude;
                        var long2 = valActual2.longitude;
                        var p1 = new LatLon(lat1, long1);
                        var p2 = new LatLon(lat2, long2);
                        var d = p1.distanceTo(p2);

                        console.log('Your distance to the iss is: ', d);

                    }
                });
            }
        });

    }
});




//calculating distance between the two

function LatLon(lat, lon) {
    // allow instantiation without 'new'
    if (!(this instanceof LatLon)) return new LatLon(lat, lon);

    this.lat = Number(lat);
    this.lon = Number(lon);
}

LatLon.prototype.distanceTo = function(point, radius) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    var R = radius;
    var φ1 = this.lat.toRadians(),
        λ1 = this.lon.toRadians();
    var φ2 = point.lat.toRadians(),
        λ2 = point.lon.toRadians();
    var Δφ = φ2 - φ1;
    var Δλ = λ2 - λ1;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
};
