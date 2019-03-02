require("dotenv").config();

//this is allowing you to access the keys.js file
var keys = require("./keys.js");

var axios = require("axios");

var fs = require("fs");


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


//this should search the Bands in Town Artist Events call using "concert"
var concertThis = function (band) {


    // var appID = 'dont have this yet';
    // var appKey = 'dont have this yet';

    //https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp
    //some special characters cannot be searched for... make this a stretch goal.

    queryURL = 'https://rest.bandsintown.com/artists/' + band + '/events?app_id=codingbootcamp';
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

var spotifyThisSong = function (song) {


    spotify.search({ type: 'track', query: song }, function (err, data) {
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

var movieThis = function (movie) {

    var params = {
        apiKey: '204334cd',
        title: movie,
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

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        };

        // We will then print the contents of data
        //console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        //console.log(dataArr);

        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        }

     
        var randomNumber = parseInt(getRandomIntInclusive(1, 3));
        console.log(randomNumber);

        
        if (randomNumber === 1) {
            var input = dataArr[0];
            var input2 = dataArr[1].substring(1, dataArr[1].length - 1);
            console.log('1st option');
            console.log(input);
            console.log(input2);
            concertThis(input2);
        } else if (randomNumber === 2) {
            var input = dataArr[2];
            var input2 = dataArr[3].substring(1, dataArr[3].length - 1);
            console.log('2nd option');
            console.log(input);
            console.log(input2);
            movieThis(input2);
        } else if (randomNumber === 3) {
            var input = dataArr[4];
            var input2 = dataArr[5].substring(1, dataArr[5].length - 1);
            console.log('3rd option');
            console.log(input);
            console.log(input2);
            spotifyThisSong(input2);
        };

        // if (input == "concert") {
        //     concertThis();
        // } else if (input == "song") {
        //     spotifyThisSong();
        // } else if (input == "movie") {
        //     movieThis();
        // } else if (input == "doWhatItSays") {
        //     doWhatItSays();
        // };

        // console.log(dataArr);


    });

}

//process what the input to node is and try to interpret and run the correct function
if (input == "concert") {
    concertThis(input2);
} else if (input == "song") {
    spotifyThisSong(input2);
} else if (input == "movie") {
    movieThis(input2);
} else if (input == "doWhatItSays") {
    doWhatItSays();
}