// API con interfaccia asincrona a callback
var asyncronousGreetingCallback = function (name, callback) {
    setTimeout(function () {
        var rnd = Math.random();
        if (rnd < 0.5) {
            callback(null, "Hello " + name);
        } else {
            callback(new Error("rnd >= 0.5"), null);
        }
    }, 1000);
};

// Esempio di chiamata dell'API a callback
asyncronousGreetingCallback("Paolo", function (error, greeting) {
    if (error) {
        console.log("An error occurred: %s", error.message);
    } else {
        console.log(greeting);
    }
});



// Wrapper per far diventare l'interfaccia a callback un'interfaccia ad eventi
var EventEmitter = require('events').EventEmitter;

var asyncronousGreetingEvent = function (name) {
    var evt = new EventEmitter();
    asyncronousGreetingCallback(name, function (error, greeting) {
        if (!error) {
            evt.emit("greetingAvailable", greeting);
        } else {
            evt.emit("error", error);
        }
    });
    return evt;
};

// Esempio di chiamata dell'API a eventi
var davideEvt = asyncronousGreetingEvent("Davide");
davideEvt.on("greetingAvailable", function (greeting) {
    console.log(greeting);
});
davideEvt.on("error", function (error) {
    console.log(error.message);
});



// Wrapper per far diventare l'interfaccia a callback un'interfaccia a promesse
var Promise = require("bluebird");

var asyncronousGreetingPromise = function (name) {
    return new Promise(function (resolve, reject) {
        asyncronousGreetingCallback(name, function (error, greeting) {
            if (!error) {
                resolve(greeting);
            } else {
                reject(error);
            }
        });
    });
};

// Esempio di chiamata dell'API a promesse

var veroPromise = asyncronousGreetingPromise("Vero");
veroPromise
    .then(function(greeting) {
        console.log(greeting);
    })
    .catch(function(error) {
        console.log(error.message);
    });


// Wrapper e esempio di chiamata con promisify
var asyncronousGreetingPromise2 = Promise.promisify(asyncronousGreetingCallback);
var veroPromise2 = asyncronousGreetingPromise2("Guido");
veroPromise2
    .then(function(greeting) {
        console.log(greeting);
    })
    .catch(function(error) {
        console.log(error.message);
    });






//
