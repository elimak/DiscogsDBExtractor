import spotifyApi from '../utils/spotifyWrapper';

export default function getUserInfo(req) {
    console.log('token ', req.body.token);
    spotifyApi.setAccessToken(req.body.token);
    return new Promise((resolve, reject) => {
        spotifyApi.getMe()
            .then(function(data) {
                console.log('Some information about the authenticated user', data.body);
                resolve(data.body);
            }, function(err) {
                console.log('AA We failed to load the user', JSON.stringify(err));
                reject(err);
            });
    });
}
