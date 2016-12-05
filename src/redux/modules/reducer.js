import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import discogs from './discogs';
import userInfo from './userInfo';
import spotify from './spotify';
import search from './search';

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    discogs,
    search,
    userInfo,
    spotify
});
