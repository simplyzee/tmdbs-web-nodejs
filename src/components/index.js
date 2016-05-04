import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Home from './app';

ReactDom.render(
    /*<Router history={hashHistory}>
        <Route path="/" component={Home}>

        </Route>
    </Router>,*/
    <Home />,
    document.getElementById('root')
);