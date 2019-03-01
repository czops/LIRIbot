require("dotenv").config();

//this is allowing you to access the keys.js file
var keys = require("./keys.js");

var axios = require("axios");




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


    // var appID = 'dont have this yet';
    // var appKey = 'dont have this yet';

    //https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp
    //some special characters cannot be searched for... make this a stretch goal.

    queryURL = 'https://rest.bandsintown.com/artists/' + input2 + '/events?app_id=codingbootcamp';
    //can add a function here to chain the inputs in case the artist has multiple words in the name

    axios.get(queryURL).then(function (response) {
        //console.log(response);
        //get information about the venue
        var showData = [
            //this needs to be converted using moment....
            "Date of the Event: " + response.data[0].datetime,
            "Venue name: " + response.data[0].venue.name,
            "Venue city: " + response.data[0].venue.city,
            "Venue country: " + response.data[0].venue.country
        ].join("\n\n");


        console.log(showData);

    });
};


// you are creating a "class" variable using the package you are requiring
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);

var spotifyThisSong = function () {


    spotify.search({ type: 'track', query: input2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //JSON.stringify();
        // console.log(data.tracks.items[0].artists);

        var showData = [
            "Artist(s) or Band: " + data.tracks.items[0].artists[0].name,
            "Song name: " + data.tracks.items[0].name,
            "Link to a sample: " + data.tracks.items[0].preview_url,
            "Album: " + data.tracks.items[0].album.name
        ].join("\n\n");

        console.log(showData);

    });

    // axios.get(queryURL).then(function (response) {

    //     console.log(response);
    // })
    //     .catch(errorFunction());

    //     function (error) {
    //     console.log(error);

};


var omdbApi = require('omdb-client');

var movieThis = function () {

    var params = {
        apiKey: '204334cd',
        title: input2,
        //this is hardcoded - but it could be better off running as another input
        // year: input3
    }

    omdbApi.get(params, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        var showData = [
            "Title of the movie: " + data.Title,
            "Year the movie came out: " + data.Year,
            "IMDB Rating of the movie: " + data.Rated,
            "Rotten Tomatoes Rating of the movie: " + data.Ratings[1].Value,
            "Country where the movie was produced: " + data.Country,
            "Language of the movie: " + data.Language,
            "Plot of the movie: " + data.Plot,
            "Actors in the movie: " + data.Actors
        ].join("\n\n");

        console.log(showData);
    });


    // axios.get(queryURL).then(function (response) {

    // });
};

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