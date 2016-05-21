require('./main.scss');
var Loader = require('react-loader');

import React from 'react';
import 'whatwg-fetch';
import Header from './Components/Header/Header';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';


class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            loaded: false
        };
    };

    getLatestMovies() {
        fetch("http://localhost:3000/api/latestmovies")
            .then(response => response.json())
            .then(results => this.setState({
                movies: results.results,
                loaded: true
            }))
            .catch(error => {
                this.setState({
                    loaded: true
                });
                console.log('Error parsing latest movies', error)
            });
    }

    componentDidMount() {
        this.getLatestMovies();
    }

    componentWillUnmount() {
        this.getLatestMovies().abort();
    }

    render() {

        let latestMovies = this.state.movies.length ?
            <ul className="latest-movies list-inline">
                { this.state.movies.map(result =>
                    <li>
                        <Link to={"/movie/" + result.id}>
                            <img className="movie-poster" src={"http://image.tmdb.org/t/p/w1280" + result.poster_path} />
                        </Link>
                        <p className="movie-title">{result.title}</p>
                    </li>
                )}
            </ul> : <h1 className="heading-failure">No Movies Found</h1>;

        return (
            <div>
                <Header />

                <Loader loaded={this.state.loaded} options={loaderOptions}>
                    <div className="movies">
                        <Grid>
                            <Row className="show-grid">
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    { latestMovies }
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
