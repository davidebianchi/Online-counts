var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var R = require("ramda");

var orgs = ["mondora", "mondora-labs", "please-beer"];

var countRepos = function (orgName) {
    var options = {
        method: "GET",
        url: "https://api.github.com/orgs/" + orgName + "/repos?per_page=100",
        json: true,
        auth: {
            user : "/*username*/",
            password: "/*password access token*/"
        },
        headers: {
            "User-Agent": "Davide",
        }
    };
    return request(options)
        .spread(function (response, body) {
            return body.length;
        });
};

Promise.map(orgs, countRepos)
    .then(R.sum)
    .then(function (totCount) {
        console.log("Mondora has " + totCount + " repositories on Github");
    });
