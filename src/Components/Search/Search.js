require('./search.scss');

import React from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class Search extends React.Component {

    constructor() {
        super();

        //this.state = {showSearchBar: false};
    }

    onClick() {
        //this.setState({showSearchBar: true});

        //{ /* this.state.showSearchBar ? <SearchBar /> : null */ }
    }

    render() {
        return (
            <div>
                <FormGroup className="search-form">
                    <FormControl type="text" placeholder="Search" />
                </FormGroup>
                <Button type="submit" className="search-button"><i className="fa fa-search"></i></Button>
            </div>
        )
    }
}

export default Search;