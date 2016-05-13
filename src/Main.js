require('./main.scss');

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

                <div className="movies">
                    <Grid>
                        <Row className="show-grid">
                            <Col lg={12}>
                                <ul className="latest-movies list-inline">
                                    {this.state.results.map(result => <li>
                                        <img className="movie-poster" src={"http://image.tmdb.org/t/p/w1280" + result.poster_path} />
                                        <p className="movie-title">{result.title}</p>
                                    </li>)}
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Main;
