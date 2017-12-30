import React from 'react';
import ReactDOM from 'react-dom';

import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';
import BodyIndex from './components/bodyIndex';

class Index extends React.Component {
    render() {
        return (
            <div>
                <ComponentHeader/>
                <BodyIndex/>
                <ComponentFooter/>
            </div>
        )
    }
}
ReactDOM.render(
    <Index/>,
    document.getElementById("root")
)