import React from 'react';

export default class MobileHeader extends React.Component {
    render() {
        return (
            <header id="mobileHeader">
                <a href="/" className="logo">
                    <img src="./src/images/logo.png" alt="logo"/>
                    <span>ReactNews</span>
                </a>
            </header>
        )
    }
}