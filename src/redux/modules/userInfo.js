const USER_LOAD = 'userInfo/LOAD';
const USER_LOAD_SUCCESS = 'userInfo/LOAD_SUCCESS';
const USER_LOAD_FAIL = 'userInfo/LOAD_FAIL';

const initialState = {
    loaded: false,
    loading: false,
    userData: null,
    error: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case USER_LOAD:
            console.log('calling user load with?', action);
            return {
                ...state,
                loading: true,
                loaded: false,
                userData: null,
                error: null
            };
        case USER_LOAD_SUCCESS:
            console.log('did we succeed?', action);
            return {
                ...state,
                loading: false,
                loaded: true,
                userData: action.result,
                error: null
            };
        case USER_LOAD_FAIL:
            console.log('looks like we failed?', action);
            return {
                ...state,
                loading: false,
                loaded: false,
                userData: null,
                error: action.error
            };
        default:
            return state;
    }
}

export function loadUserData(token) {
    return {
        types: [USER_LOAD, USER_LOAD_SUCCESS, USER_LOAD_FAIL],
        promise: (client) => client.post('/getUserInfo', {
            data: {
                token
            }
        })
    };
}
