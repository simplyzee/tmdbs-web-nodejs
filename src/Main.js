require('./main.scss');
var Loader = require('react-loader');

import React from 'react';
import 'whatwg-fetch';
import Navigation from './Components/Navigation/Navigation';

import {
    Button,
    Grid,
    Row,
    Col
} from 'react-bootstrap';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            loaded: false
        };
    };

    getLatestMovies() {
        fetch(this.props.source)
            .then((response) => {
                return response.json();
            })
            .then((results) => {
                this.setState({
                    movies: results.results,
                    loaded: true
                });
            })
            .catch((ex) => {
                console.log('Parsing latest movies failed', ex);
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
            <div>
                <div className="header">
                    <Grid>
                        <Row className="show-grid">
                            <Col lg={12}>
                                <Navigation />
                            </Col>
                        </Row>
                    </Grid>
                </div>


                <Loader loaded={this.state.loaded} color="#16A085">
                    <div className="movies">
                        <Grid>
                            <Row className="show-grid">
                                <Col lg={12}>
                                    <ul className="latest-movies list-inline">
                                        {this.state.movies.map(result =>
                                            <li>
                                                <img className="movie-poster" src={"http://image.tmdb.org/t/p/w1280" + result.poster_path} />
                                                <p className="movie-title">{result.title}</p>
                                            </li>
                                        )}
                                    </ul>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Loader>
            </div>
        );
    }
}

var loaderOptions = {
    color: '#16A085'
};

export default Main;
