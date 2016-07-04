require('./movieimages.scss');

import React from 'react';
import 'whatwg-fetch';

const apiUrl = process.env.NODE_ENV == 'production' ? "http://react-movie-hub.herokuapp.com" : "http://localhost:3000";

class MovieImages extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          movie_images: []
      }
  }

  getMovieImages() {
    fetch(apiUrl + "/api/movie/" + this.props.movieId + "/images")
      .then(response => response.json())
      .then((results) => {
          this.setState({
              movie_images: results.backdrops,
              loaded: true
          })
      })
      .catch(err => {
          this.setState({
              loaded: true
          });
          console.log('Error fetching movie images', err)
      });
  }

  componentDidMount() {
      this.getMovieImages();
  }

  render() {

    let movieImages = this.state.movie_images.length ?
        <ul className="movie-images list-inline">
            { this.state.movie_images.map(result =>
                <li>
                  <img className="img-responsive movie-image" src={"http://image.tmdb.org/t/p/w300" + result.file_path} />
                </li>
            )}
        </ul> : <h1 className="heading-failure">No Movies Images</h1>;

    return (
      <div className="movie-images-container">
          { movieImages }
      </div>
    )
  }
}

export default MovieImages;
