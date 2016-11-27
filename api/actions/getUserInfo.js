import spotifyApi from '../utils/spotifyWrapper';

export default function getUserInfo(req) {
    spotifyApi.setAccessToken(req.body.token);
    return new Promise((resolve, reject) => {
        spotifyApi.getMe()
            .then(function(data) {
                console.log('Some information about the authenticated user', data.body);
                resolve(data.body);
            }, function(err) {
                console.log('We failed to load the user', JSON.stringify(err));
                reject(err);
            });
    });
}