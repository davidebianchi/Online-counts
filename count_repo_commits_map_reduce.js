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
            user : "dade12",
            password: "ca03e9df6c77d9dc9294323c23b44143b4a7cf22"
        },
        headers: {
            "User-Agent": "dade12",
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
        console.log("The number of repo Mondora in GitHub is: " + totCount);
    });
