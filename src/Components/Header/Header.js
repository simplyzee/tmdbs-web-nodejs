require('./header.scss');

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';

class Header extends React.Component {
    // To do - Add <Search /> again

    render() {
        return (
            <div className="header">
                <Grid>
                    <Row className="show-grid">
                        <Col lg={9} md={9} sm={9} xs={9}>
                            <Navigation />
                        </Col>
                        <Col lg={3} md={3} sm={3} xs={3}>

                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Header;