require('./moviedetails.scss');
var Loader = require('react-loader');
var Blur = require('react-blur');

import React from 'react';
import 'whatwg-fetch';
import { Button, Col, Grid, Row } from 'react-bootstrap';

import Header from '../Header/Header';

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: [],
            loaded: false
        };
    }

    getMovieDetails() {
        fetch("http://localhost:3000/api/movie/" + this.props.params.movieId)
            .then(response => response.json())
            .then((results) => {
                this.setState({
                    movie: results,
                    loaded: true
                })
            })
            .catch(err => {
                this.setState({
                    loaded: true
                });
                console.log('Error fetching movie information', err)
            });
    }

    componentDidMount() {
        this.getMovieDetails();
    }

    componentWillUnmount() {
        this.getMovieDetails().abort();
    }

    render() {

        let movieInformation = this.state.movie;
        let moviePoster = movieInformation.poster_path;
        let movieBackdrop = movieInformation.backdrop_path;

        return(
            <Blur img={ 'http://image.tmdb.org/t/p/w1280' + movieBackdrop } blurRadius={100} className="blurred-background">
                <Header />
                <Loader loaded={ this.state.loaded }>
                    <div className="movie-details">
                        <Grid>
                            <Row className="show-grid">
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Col lg={4} md={4} sm={12} xs={12} className="movie-sidebar">
                                        <div className="movie-poster">
                                            <img className="img-responsive" src={ "http://image.tmdb.org/t/p/w342" + moviePoster } />
                                        </div>
                                    </Col>
                                    <Col lg={8} md={8} sm={12} xs={12} className="movie-right-info-pane backdrop-overlay">
                                        <h1 className="movie-title">{ movieInformation.title }</h1>
                                        <div className="movie-info">
                                            <span>Release date: { movieInformation.release_date }</span> | <span>Status: { movieInformation.status }</span>
                                        </div>
                                        <div className="movie-overview">
                                            { movieInformation.overview }
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Loader>
            </Blur>
        )
    }

}

export default MovieDetails;