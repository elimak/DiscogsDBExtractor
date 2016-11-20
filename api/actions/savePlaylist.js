import spotifyApi from '../utils/spotifyWrapper';


function createPlaylist(userId, playlistName) {
    return new Promise((resolve) => {
        spotifyApi.createPlaylist(userId, playlistName, { public: false })
            .then(function(data) {
                console.log('Created playlist!', JSON.stringify(data));
                resolve(data);
            }, function(err) {
                console.log('Something went wrong!', err);
                resolve({ error: err });
            });
    });
}

function addTracks(userId, albums, index, playlistInfo, resolve) {
    console.log('-------- ' + index + ' < ' + albums.length);

    if (index < albums.length) {
        // Get tracks in an album
        spotifyApi.getAlbumTracks(albums[index], { limit: 40, offset: 0 })
            .then(function(data) {
                console.log('Gotten tracks!', JSON.stringify(data));
                const tracks = data.body.items.map(obj => obj.uri);

                // Add tracks to a playlist
                spotifyApi.addTracksToPlaylist(userId, playlistInfo.id, tracks)
                    .then(function() {
                        console.log('-------- Added tracks to playlist! ');
                        addTracks(userId, albums, (index + 1), playlistInfo, resolve);
                    }, function(err) {
                        console.log('Something went wrong when adding tracks!', err);
                        resolve({ error: err });
                    });
            }, function(err) {
                console.log('Something went wrong getting tracks!', err);
                resolve({ error: err });
            });
    } else {
        // done
        console.log('-------- Are we done ?');
        resolve({ playlistInfo });
    }
}

export default function savePlaylist(req) {
    console.log('savePlaylist', req.body.userId, req.body.playlistName, req.body.albums.join(', '));
    return new Promise((resolve) => {
        createPlaylist(req.body.userId, req.body.playlistName)
            .then((response) => {
                if (!response.error) {
                    const playlistInfo = {
                        url: response.body.external_urls.spotify,
                        name: response.body.name,
                        id: response.body.id,
                        uri: response.body.uri
                    };

                    addTracks(req.body.userId, req.body.albums, 0, playlistInfo, resolve);
                } else {
                    resolve({ error: response.error });
                }
            });
    });
}
