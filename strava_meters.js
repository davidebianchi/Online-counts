var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var R = require("ramda");
var strava = require("strava-v3");

Promise.promisifyAll(strava.clubs);

var dateCalc = function dateCalc (days_before) {
    var MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    return Date.now() - (days_before * MILLISECONDS_IN_A_DAY);
};

var options = {
    "id" : // your id
};

var countMembersStrava = function () {
    strava.clubs.listMembers(options, function (err, payload) {
        if (!err) {
            console.log("Il numero di membri del club strava di mondora è " + payload.length);
        }
        else {
            console.log(err);
        }
    });
};


strava.clubs.listActivitiesAsync(options)
    .then(function (activities) {
        var distance = 0;
        var meters = [];
        var dates = activities.map(function (activity) {
            day = new Date(activity.start_date).getTime();
            if (day > dateCalc(7) ) {
                meters[distance] = activity.distance;
                distance++;
            }
        });
    var sumTot = R.sum(meters);
    console.log("I colleghi mondora hanno percorso " + (sumTot/1000).toFixed(2) + " km in bici.");
    })
    .catch(function (err) {
        console.log(err);
    });


countMembersStrava();



//
