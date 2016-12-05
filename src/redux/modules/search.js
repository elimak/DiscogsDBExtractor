const SEARCH = 'query/SEARCH';

const initialState = {
    title: '',
    artist: '',
    label: '',
    stylesIn: [],
    stylesOut: [],
    genre: '',
    country: '',
    year: '',
    decade: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                ...action.data
            };

        default:
            return state;
    }
}

export function storeSearch(data) {
    return {
        type: SEARCH,
        data
    };
}
