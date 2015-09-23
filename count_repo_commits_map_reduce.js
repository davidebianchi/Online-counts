var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var R = require("ramda");
var moment = require("moment");

var orgs = ["mondora", "mondora-labs", "please-beer", "innowatio"];
var auth; // This is your authorization name and token

var countRepoCommits = function (orgName, repoBody) {
    var date = moment().subtract(1, "weeks").startOf("week").toISOString();
    var repoName = repoBody.name;
    var options = {
        method: "GET",
        url: "https://api.github.com/repos/" + orgName + "/" + repoName + "/commits?per_page=100&since=" + date,
        json: true,
        auth: auth,
        headers: {
            "User-Agent": "Davide"
        }
    };
    return request(options)
        .spread(function (response, body) {
            /*
            *   When the repository is empty, body is an object with the
            *   following shape:
            *
            *       {
            *           message: "Git Repository is empty.",
            *           documentation_url: "https://developer.github.com/v3"
            *       }
            *
            */
            return Array.isArray(body) ? body.length : 0;
        });
};

var retrieveRepos = function (orgName) {
    var options = {
        method: "GET",
        url: "https://api.github.com/orgs/" + orgName + "/repos?per_page=100",
        json: true,
        auth: auth,
        headers: {
            "User-Agent": "Davide"
        }
    };
    return request(options)
        .spread(function (response, body) {
            return body;
        });
};

var countRepos = function (orgName) {
    return retrieveRepos(orgName)
        .then(function (body) {
            return body.length;
        });
};

var countOrgCommits = function (orgName) {
    return retrieveRepos(orgName)
        .map(R.partial(countRepoCommits, orgName))
        .then(R.sum);
};

Promise.map(orgs, countRepos)
    .then(R.sum)
    .then(function (totCount) {
        console.log("Mondora has " + totCount + " repositories on Github.");
    });

Promise.map(orgs, countOrgCommits)
    .then(R.sum)
    .then(function (totCount) {
        console.log("Mondora has " + totCount + " commits on Github in the last week.");
});
