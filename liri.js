require("dotenv").config();

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

var input2 = process.argv[3];
var input3 = process.argv[4];


//process what the input to node is and try to interpret and run the correct function
if (input == concertThis) {
    //make sure the parameters being entered are correct
    concertThis();
} else if (input == spotifyThisSong) {
    spotifyThisSong();
} else if (input == movieThis) {
    movieThis();
} else if (input == doWhatItSays) {
    doWhatItSays();
}

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

    var artist = input;
    var appID = 'dont have this yet';
    var appKey = 'dont have this yet';

    //https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp

    queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';


    axios.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(errorFunction());

    //the ajax call doesnt need to get used here

    // $.ajax({
    //     url: queryURL,
    //     method: 'GET',
    // }).then(function (answer) {
    //     //Name of Dish
    //     foodName = answer.hits[randomRecipe].recipe.label;
    //     $('.recipe-name').text(foodName);
    //     //Image path
    //     foodImage = answer.hits[randomRecipe].recipe.image;
    //     $('.food-image').attr('src', foodImage);
    //     //Calories. May not end up using
    //     foodCalories = answer.hits[randomRecipe].recipe.calories;
    //     $('.recipe-calories').html('Calories: ');
    //     $('.recipe-calorie-count').html(foodCalories.toFixed(0) + '<br><br>');
    //     $('.recipe-ingredients').html('Ingredients:<br>');
    //     //Ingredients. It is an array of strings
    //     foodIngredients = answer.hits[randomRecipe].recipe.ingredientLines;
    //     console.log(foodIngredients);
    //     $('.last-moment').css('overflow', 'auto');
    //     $('.caard-body').css('overflow', 'auto');
    //     for (i = 0; i < foodIngredients.length; i++) {
    //         $('.recipe-text').append(foodIngredients[i] + '<br>');
    //     };
    //     //Link to full recipe website with prep instructions
    //     foodPrepSite = answer.hits[randomRecipe].recipe.url;
    //     $('.recipe-link').attr('href', foodPrepSite);
    //     $('.recipe-link').attr('target', 'blank');
    //     $('.recipe-link').text(foodPrepSite);
    // });
};

var spotifyThisSong = function () {

    var artist = input;
    var appID = 'dont have this yet';
    var appKey = 'dont have this yet';

    queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';

    axios.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(errorFunction());

    //     function (error) {
    //     console.log(error);
    // });

}

var movieThis = function () {

    axios.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(errorFunction());

}

var doWhatItSays = function () {

    axios.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(errorFunction());

}