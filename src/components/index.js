import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './app';

ReactDom.render(
    /*<Router history={hashHistory}>
        <Route path="/" component={Home}>

        </Route>
    </Router>,*/
    <App source="http://localhost:3000/api/latestmovies" />,
    document.getElementById('root')
);
