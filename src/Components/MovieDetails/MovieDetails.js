require('./moviedetails.scss');
var Loader = require('react-loader');

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

        return(
            <div>
                <Header />
                <Loader loaded={this.state.loaded}>
                    <div className="movie-details">
                        <Grid>
                            <Row className="show-grid">
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{movieInformation.title}</h1>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Loader>
            </div>
        )
    }

}

export default MovieDetails;