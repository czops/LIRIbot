console.log('this is loaded');

//this is then linked to the .env(?) file where youre keys are actually stored? I think?
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};



