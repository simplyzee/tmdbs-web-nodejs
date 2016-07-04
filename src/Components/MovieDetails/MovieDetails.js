require('./moviedetails.scss');
var Loader = require('react-loader');
var Blur = require('react-blur');

import React from 'react';
import 'whatwg-fetch';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router';

import Header from '../Header/Header';
import MovieTrailer from './MovieTrailer/MovieTrailer';
import RelatedMovies from './RelatedMovies/RelatedMovies';

const apiUrl = process.env.NODE_ENV == 'production' ? "http://react-movie-hub.herokuapp.com" : "http://localhost:3000";

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: [],
            similar_movies: [],
            loaded: false
        };
    }

    getMovieDetails() {
      fetch(apiUrl + "/api/movie/" + this.props.params.movieId)
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

    render() {

        let movieInformation = this.state.movie;
        let movieId = movieInformation.id;
        let moviePoster = movieInformation.poster_path;
        let movieBackdrop = movieInformation.backdrop_path;


        //let movieReleaseDate = movieInformation.length ? movieInformation.release_date : "";
        //let movieStatus = movieInformation.length ? movieInformation.status : "";


        return(
            <Blur img={ 'http://image.tmdb.org/t/p/w1280' + movieBackdrop } blurRadius={100} className="blurred-background">
                <Header />
                <Loader loaded={ this.state.loaded }>
                    <div className="movie-details">
                        <Grid>
                            <Row className="show-grid backdrop-overlay">
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Col lg={4} md={4} sm={12} xs={12} className="movie-sidebar">
                                        <div className="movie-poster">
                                            <h1 className="movie-title">{ movieInformation.title }</h1>
                                            <img className="poster img-responsive" src={ "http://image.tmdb.org/t/p/w342" + moviePoster } />
                                            <div className="movie-info">
                                                <ul className="movie-info-list">
                                                    <li>
                                                        <i className="fa fa-film" aria-hidden="true"></i>
                                                        <span className="movie-info-status">
                                                            { movieInformation.release_date }
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-info" aria-hidden="true"></i>
                                                        <span className="movie-info-status">
                                                            { movieInformation.status }
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-tag" aria-hidden="true"></i>
                                                        <span className="movie-info-status">
                                                            { movieInformation.tagline }
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-home" aria-hidden="true"></i>
                                                        <span className="movie-info-status">
                                                            <Link to={movieInformation.homepage} target="_blank">
                                                                { movieInformation.homepage }
                                                            </Link>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={8} md={8} sm={12} xs={12} className="movie-right-info-pane">
                                        <div className="movie-overview">
                                            <h2>Overview</h2>

                                            <div className="movie-overview-text">
                                                { movieInformation.overview }
                                                <span><i className="fa fa-star" aria-hidden="true"></i> { movieInformation.vote_average }</span>
                                            </div>

                                            <div className="movie-trailer">
                                                <MovieTrailer movieId={movieId} />
                                            </div>
                                        </div>

                                        <div className="movie-related-movies">
                                          <h3>Related Movies</h3>

                                          <RelatedMovies movieId={movieId} />
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
