import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import discogs from './discogs';

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    discogs
});
