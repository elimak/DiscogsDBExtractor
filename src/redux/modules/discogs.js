const SEARCH = 'discogs/SEARCH';
export const SEARCH_SUCCESS = 'discogs/SEARCH_SUCCESS';
const SEARCH_FAIL = 'discogs/SEARCH_FAIL';

const initialState = {
    loaded: false,
    loading: false,
    discogsData: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SEARCH:
            console.log('calling search with?', action);
            return {
                ...state,
                loading: true,
                loaded: false,
                discogsData: null,
                error: null
            };
        case SEARCH_SUCCESS:
            console.log('did we succeed?', action);
            return {
                ...state,
                loading: false,
                loaded: true,
                discogsData: action.result
            };
        case SEARCH_FAIL:
            console.log('looks like we failed?', action);
            return {
                ...state,
                loading: false,
                loaded: false,
                discogsData: null,
                error: action.error
            };
        default:
            return state;
    }
}

export function search(query) {
    return {
        types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
        promise: (client) => client.post('/getDiscogsResults', {
            data: {
                query
            }
        })
    };
}
