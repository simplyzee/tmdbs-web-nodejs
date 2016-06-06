import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Main from './Main';
import MovieDetails from './Components/MovieDetails/MovieDetails';

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" component={Main} />
        <Route path="/movie/:movieId" component={MovieDetails} />
    </Router>,
    document.getElementById('main')
);