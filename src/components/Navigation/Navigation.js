require('./navigation.scss');

import React from 'react';
import { Motion, spring } from 'react-motion';
import Menu from 'react-motion-menu';

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menu: { isOpen: false }
        };
    }

    handleOnOpen(name) {
        this.setState({[name] : {isOpen: true} });
    }

    handleOnClose(name) {
        this.setState({[name] : {isOpen: false} });
    }

    render() {
        return (
            <div>
                <Menu direction="horizontal"
                      onOpen={this.handleOnOpen.bind(this)}
                      onClose={this.handleOnClose.bind(this)}
                      distance={80}
                      width={50}
                      height={50}
                      y={0}
                      x={0}
                      customStyle={{
                          color: "#FFFFFF",
                          textAlign:"center",
                          lineHeight:"50px",
                          backgroundColor: "#16A085",
                          border: "solid 1px #16A085",
                          borderRadius: "50%"
                        }}>
                    <div><i className={this.state.menu.isOpen ? "fa fa-times" : "fa fa-bars"}></i></div>
                    <div>
                        <a href="/">
                            <i className="fa fa-home"></i>
                        </a>
                    </div>
                </Menu>
            </div>
        );
    }
}

export default Navigation;