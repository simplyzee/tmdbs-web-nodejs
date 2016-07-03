require('./movietrailer.scss');

import React from 'react';
import ReactPlayer from 'react-player';
import 'whatwg-fetch';

class MovieTrailer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: []
        }
    }

    getMovieTrailerFromId() {
      var movieTrailerUrl = process.env.NODE_ENV == 'production' ? "http://react-movie-hub.herokuapp.com" : "http://localhost:3000";

      fetch(movieTrailerUrl + "/api/movie/" + this.props.movieId + "/videos/")
          .then(response => response.json())
          .then((results) => {
              this.setState({
                  videos: results.results[0]
              });
          })
          .catch(err => {
              console.log('Error fetching video information', err)
          });
    }

    componentWillMount() {
        this.getMovieTrailerFromId();
    }

    render() {
        let videoId = this.state.videos.key;
        return (
            <div className="video-container">
                <ReactPlayer url={"https://www.youtube.com/watch?v=" + videoId}
                            controls />
            </div>
        )
    }
}

export default MovieTrailer;
