//simple program - getting longitude and latitude
var request = require('request');

request('https://api.wheretheiss.at/v1/satellites/25544' , function(err, result) {
    if (err) {
        console.log(err);
    } else { 
        var valActual = JSON.parse(result.body);
        var lat = valActual.latitude;
        var latEx = lat.toFixed(2);
        var long = valActual.longitude;
        var longEx = long.toFixed(2);
        console.log('latitude is:' + latEx + ' and longitude is: ' + longEx);
    }
});
