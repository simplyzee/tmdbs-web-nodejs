require('./relatedmovies.scss');

import React from 'react';
import 'whatwg-fetch';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const apiUrl = process.env.NODE_ENV == 'production' ? "http://react-movie-hub.herokuapp.com" : "http://localhost:3000";

class RelatedMovies extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          similar_movies: [],
          loaded: false
      };
  }

  getRelatedMovies() {
    fetch(apiUrl + "/api/movie/" + this.props.movieId + "/similar")
      .then(response => response.json())
      .then((results) => {
          this.setState({
              similar_movies: results.results,
              loaded: true
          })
      })
      .catch(err => {
          this.setState({
              loaded: true
          });
          console.log('Error fetching related movies', err)
      });
  }

  componentDidMount() {
      this.getRelatedMovies();
  }

  render() {

    let relatedMovies = this.state.similar_movies.length ?
        <ul className="related-movies list-inline">
            { this.state.similar_movies.map(result =>
                <li>
                    <Link to={"/movie/" + result.id}>
                        <img className="img-responsive movie-poster" src={"http://image.tmdb.org/t/p/w185" + result.poster_path} />
                    </Link>
                    <p className="movie-title">{result.title}</p>
                </li>
            )}
        </ul> : <h1 className="heading-failure">No Related Movies Found</h1>;

    return (
      <div className="related-movies-container">
          { relatedMovies }
      </div>
    )
  }
}

export default RelatedMovies;
