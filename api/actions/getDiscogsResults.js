import https from 'https';
import spotifyApi from '../utils/spotifyWrapper';

const optionsDiscogs = {
    host: 'api.discogs.com',
    path: '/database/search?advanced=1&type=master&page=1&per_page=200',
    // path: '/database/search?advanced=1&type=master&label=Tympanik+Audio&style=IDM+Dubstep+-Rock+-Trance+-Hardcore+-Drum+-pop&page=1&per_page=100',
    // path: '/database/search?advanced=1&type=master&label=Tympanik+Audio&style=IDM+Dubstep+-Rock+-Trance+-Hardcore+-Drum+-pop&key=jNQgMlNcQeXMxBkszShj&secret=qpYmnUgQmfCRJFybPMYbPMXWItOcBuDb',
    headers: {
        'user-agent': 'node.js',
        'Authorization': 'Discogs key=jNQgMlNcQeXMxBkszShj, secret=qpYmnUgQmfCRJFybPMYbPMXWItOcBuDb'
    }
};

function doRequest(opt) {
    return new Promise((resolve) => {
        https.get(opt, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                let json = {};
                try {
                    json = JSON.parse(body);
                } catch (e) {
                    json = { error: 'error parsing the json response' };
                }
                resolve({ response: json });
            });
        }).on('error', (err) => {
            resolve({ error: err.message });
        });
    });
}

function cleanUpMasterTitle(title) {
    const parts = title.split('-');
    parts[0] = parts[0].replace(/\s*\(.*?\)\s*/g, '');
    return parts.join('-');
}

function processSpotifySearch(masters, index, values, resolve) {
    const next = (values.length !== (masters.length - 1)) ?
        () => {
            processSpotifySearch(masters, (index + 1), values, resolve);
        } :
        () => {
            resolve(values.filter(val => val !== 'empty' ));
        };

    function checkTimeout(currentIndex) {
        if (currentIndex === index) {
            // timmed out - restart call
            processSpotifySearch(masters, index, values, resolve);
        }
    }

    let timeout;
    if (!values[index]) {
        timeout = setTimeout(() => {
            checkTimeout(index);
        }, 5000);
    }


    const master = masters[index];
    master.title = cleanUpMasterTitle(master.title);
    spotifyApi.searchAlbums(master.title).then((result) => {
        clearTimeout(timeout);
        if (result.body.albums.items.length === 1) {
            const album = result.body.albums.items[0];
            values[index] = {
                query: master.title,
                discogs: `https://www.discogs.com${master.uri}`,
                spotify: `https://open.spotify.com/album/${album.id}`,
                styles: master.style,
                labels: master.label,
                image: album.images[1].url,
                year: master.year,
                country: master.country,
                name: album.name,
                id: album.id,
                artist: album.artists.map(artist => {
                    return {
                        name: artist.name,
                        id: artist.id
                    };
                })[0]
            };
        } else {
            values[index] = 'empty';
        }
        next();
    });
}

export default function getDiscogsResults(req) {
    const query = req.body.query;
    const opt = Object.assign({}, optionsDiscogs);
    opt.path += query;

    return new Promise((resolve) => {
        doRequest(opt).then((res) => {
            if (res.response) {
                const values = [];
                if (res.response.results.length > 0) {
                    processSpotifySearch(res.response.results, 0, values, resolve);
                } else {
                    resolve([]);
                }
            }
        });
    });
}
