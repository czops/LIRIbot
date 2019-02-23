require("dotenv").config();

//this is allowing you to access the keys.js file
var keys = require("./keys.js");

var axios = require("axios");


var spotify = new Spotify(keys.spotify);



//liri should be able to accept the following commands:
//concert-this
//spotify-this-song
//movie-this
//do-what-it-says

//input will take in the right function
var input = process.argv[2];
//input2 will be some search term for the various API calls
var input2 = process.argv[3];
//don't know what input3 is for... but we'll keep it around for now.
//the difficulty here is keeping the application working for strings..
//no way to separate out this next input
var input3 = process.argv[4];


var errorFunction = function (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
}


//this should search the Bands in Town Artist Events
var concertThis = function () {


    var appID = 'dont have this yet';
    var appKey = 'dont have this yet';

    //https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp
    //some special characters cannot be searched for... make this a stretch goal.
    queryURL = 'https://rest.bandsintown.com/artists/' + input2 + '/events?app_id=codingbootcamp';


    axios.get(queryURL).then(function (response) {


        //get information about the venue
        var showData = [
            //this needs to be converted using moment....
            "Date of the Event: " + response.datetime,
            "Venue name: " + response.venue.name,
            "Venue city: " + response.venue.city,
            "Venue country: " + response.venue.country
        ].join("\n\n");;

        console.log(response);
        console.log(showData);

    });
};



var Spotify = require('node-spotify-api');

var spotifyThisSong = function () {


    //how the hell is this supposed to work?

    var spotify = new Spotify({
        //is this supposed to be in here?
        id: "id",
        secret: "secret"
    });

    spotify.search({ type: 'track', query: input2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });

    axios.get(queryURL).then(function (response) {


        console.log(response);
    })
        .catch(errorFunction());

    //     function (error) {
    //     console.log(error);

};


var omdbApi = require('omdb-client');

var movieThis = function () {
   
    var appKey = '204334cd';

 
    var params = {
        apiKey: 'XXXXXXX',
        title: 'Terminator',
        year: 2012
    }
    omdbApi.get(params, function(err, data) {
        // process response...
    });


    axios.get(queryURL).then(function (response) {


        //get information about the venue
        var showData = [
            //this needs to be converted using moment....
            "Date of the Event: " + response.datetime,
            "Venue name: " + response.venue.name,
            "Venue city: " + response.venue.city,
            "Venue country: " + response.venue.country
        ].join("\n\n");;

        console.log(response);
        console.log(showData);

}

var doWhatItSays = function () {

    axios.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(errorFunction());

}



//process what the input to node is and try to interpret and run the correct function
if (input == "concert") {
    //make sure the parameters being entered are correct
    concertThis();
} else if (input == "song") {
    spotifyThisSong();
} else if (input == "movie") {
    movieThis();
} else if (input == "doWhatItSays") {
    doWhatItSays();
}