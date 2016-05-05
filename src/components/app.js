require('../sass/main.scss');

import React from 'react';
import 'whatwg-fetch';

class App extends React.Component {
    constructor() {
        super();
        this.state = { results: [] };
    };

    getLatestMovies() {
        fetch(this.props.source)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState(json);
            })
            .catch((ex) => {
                console.log('parsing failed', ex);
            });
    }

    componentDidMount() {
        this.serverRequest = this.getLatestMovies();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <ul>
                {this.state.results.map(result => <li>{result.id}</li>)}
            </ul>
        );
    }
}

export default App;
