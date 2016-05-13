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
                <Grid>
                    <Row className="show-grid">
                        <Col lg={12}>
                            <Navigation />
                        </Col>
                    </Row>
                </Grid>

                <Grid>
                    <Row className="show-grid">
                        <Col lg={12}>
                            <ul>
                                {this.state.results.map(result => <Button>{result.id}</Button>)}
                            </ul>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Main;
