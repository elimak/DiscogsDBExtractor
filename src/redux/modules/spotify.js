const RESET_PLAYLIST = 'playlist/RESET_PLAYLIST';
const SAVE_PLAYLIST = 'playlist/SAVE_PLAYLIST';
const SAVE_PLAYLIST_SUCCESS = 'playlist/SAVE_PLAYLIST_SUCCESS';
const SAVE_PLAYLIST_FAIL = 'playlist/SAVE_PLAYLIST_FAIL';
import config from '../../config';

const initialState = {
    saving: false,
    saved: false,
    playlist: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case RESET_PLAYLIST:
            console.log('calling playlist reset with?', action);
            return {
                ...state,
                saved: false,
                saving: false,
                playlist: null,
                error: null
            };

        case SAVE_PLAYLIST:
            console.log('calling playlist save with?', action);
            return {
                ...state,
                saved: false,
                saving: true,
                playlist: null
            };

        case SAVE_PLAYLIST_SUCCESS:
            console.log('did we succeed?', action);
            return {
                ...state,
                saving: false,
                saved: true,
                playlist: action.result.playlistInfo
            };

        case SAVE_PLAYLIST_FAIL:
            console.log('looks like we failed?', action);
            return {
                ...state,
                saving: false,
                saved: false,
                error: action.result.error,
                playlist: null
            };
        default:
            return state;
    }
}

const stateKey = 'spotify_auth_state';

const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < length; index++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export function connectSpotify(notYou) {
    const clientId = '8a137d38ba9d46b9a2ca8528eca44bed'; // Your client id
    const redirectUri = config.redirect; // Your redirect uri
    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);
    const scope = 'playlist-modify-private user-read-private user-read-email';
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);
    url += '&state=' + encodeURIComponent(state);
    if (notYou) {
        url += '&show_dialog=true';
    }
    window.location = url;
}

export function resetPlaylist() {
    return {
        type: RESET_PLAYLIST
    };
}

export function savePlaylist(userId, playlistName, albums) {
    return {
        types: [SAVE_PLAYLIST, SAVE_PLAYLIST_SUCCESS, SAVE_PLAYLIST_FAIL],
        promise: (client) => client.post('/savePlaylist', {
            data: {
                userId,
                playlistName,
                albums
            }
        })
    };
}
