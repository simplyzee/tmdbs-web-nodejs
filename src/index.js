import React from 'react';
import ReactDom from 'react-dom';
import Main from './Main';

ReactDom.render(
    <Main source="http://localhost:3000/api/latestmovies" />,
    document.getElementById('main')
);