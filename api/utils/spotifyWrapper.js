import SpotifyWebApi from 'spotify-web-api-node';

const spotifyWrapper = new SpotifyWebApi({
    clientId: '8a137d38ba9d46b9a2ca8528eca44bed',
    clientSecret: '3d77374dab264498822a7e83ffb08cb7',
    redirectUri: null
});

// Get an access token and 'save' it using a setter
spotifyWrapper.clientCredentialsGrant()
    .then(function(data) {
        console.log('The access token is ' + data.body.access_token);
        spotifyWrapper.setAccessToken(data.body.access_token);
    }, function(err) {
        console.log('Something went wrong!', err);
    });

module.exports = spotifyWrapper;
