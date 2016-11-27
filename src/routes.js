import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Home from 'containers/Home';
import NotFound from 'containers/NotFound';
import App from 'containers/App';

export default () => {
    /**
    * Please keep routes in alphabetical order
    */
    return (
        <Route path="/" component={App}>
            { /* Home (main) route */ }
            <IndexRoute component={Home}/>

            { /* Catch all route */ }
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
