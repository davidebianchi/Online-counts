var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var R = require("ramda");
var strava = require("strava-v3");

var options = {
    "id" : 148440,
};

function dateCalc (day_before) {
    var day = new Date(Date.now() - day_before*24*3600*1000);
    var date = day.toISOString(day);
    return date;
}

var countMembersStrava = function () {
    strava.clubs.listMembers(options,function(err,payload) {
        if(!err) {
            console.log("Il numero di membri del club strava di mondora è " + payload.length);
        }
        else {
            console.log(err);
        }
    });
};
var listActivitiesStrava = function () {
    strava.clubs.listActivities(options,function(err,payload){
        if(!err) {
            // console.log(options);
            // console.log(payload);
            console.log(payload[0].distance);
        }
        else {
            console.log(err);
        }
    });
};


countMembersStrava();
listActivitiesStrava();
