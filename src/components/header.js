import React from 'react';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            miniHeader: false,
        }
    }

    switchHeader() {
        this.setState({
            miniHeader: !this.state.miniHeader,
        })

    }

    render() {
        const styleComponentHeader = {
            backgroundColor: "#333",
            color: "#fff",
            "paddingTop": (this.state.miniHeader ) ? '30px' : "10px",
            paddingBottom: (this.state.miniHeader ) ? '30px' : "10px",
        };
        return (
            <header style={styleComponentHeader} onClick={this.switchHeader.bind(this)}>
                <h1>header</h1>
            </header>
        )
    }
}