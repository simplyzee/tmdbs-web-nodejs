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
        fetch("http://localhost:3000/api/movie/" + this.props.movieId + "/videos/")
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

    componentWillUnmount() {
        this.getMovieTrailerFromId().abortRequest();
    }

    render() {
        let videoId = this.state.videos.key;
        return <ReactPlayer url={"https://www.youtube.com/watch?v=" + videoId} />
    }
}

export default MovieTrailer;