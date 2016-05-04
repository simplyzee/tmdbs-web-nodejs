require('../sass/main.scss');

import React from 'react';
import $ from 'jquery';

class App extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    };

    getLatestMovies() {
        $.get(this.props.source, function (result) {
           this.setState({
               data: result
           });
        }.bind(this));
    }

    componentDidMount() {
        this.serverRequest = this.getLatestMovies();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <div>
                {this.state.data.page}
            </div>
        );
    }
}

export default App;
