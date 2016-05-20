require('./main.scss');
var Loader = require('react-loader');

import React from 'react';
import 'whatwg-fetch';
import Navigation from './Components/Navigation/Navigation';
import Search from './Components/Search/Search';

import { Grid, Row, Col } from 'react-bootstrap';

class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            loaded: false,
            showSideBar: false
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

    showMovieSideBar() {
        this.setState({
            showSideBar: true
        })
    }

    render() {

        const movieSidebar = this.state.showSideBar ? <MovieSideBar /> : "";

        const latestMovies = this.state.movies.length ?
            <ul className="latest-movies list-inline">
                { this.state.movies.map(result =>
                    <li>
                        <img className="movie-poster" onClick={this.showMovieSideBar.bind(this)} src={"http://image.tmdb.org/t/p/w1280" + result.poster_path} />
                        <p className="movie-title">{result.title}</p>
                    </li>
                )}
            </ul> : <h1 className="heading-failure">No Movies Found</h1>;

        return (
            <div>
                {movieSidebar}

                <div className="header">
                    <Grid>
                        <Row className="show-grid">
                            <Col lg={9} md={9} sm={9} xs={9}>
                                <Navigation />
                            </Col>
                            <Col lg={3} md={3} sm={3} xs={3}>
                                <Search />
                            </Col>
                        </Row>
                    </Grid>
                </div>


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
