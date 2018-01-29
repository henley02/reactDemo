import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, HashRouter, Route, NavLink} from 'react-router-dom'
import MediaQuery from 'react-responsive';

import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';

import MobileIndex from './components/mobile_index';
import 'antd/dist/antd.css';

export default class Root extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <HashRouter basename={"/"}/>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <Route exact path="/" component={PCIndex}/>
                        <Route path="/details/:uniquekey" component={PCNewsDetails}/>
                    </MediaQuery>
                    <MediaQuery query="(max-device-width: 1224px)">
                        <MobileIndex/>
                    </MediaQuery>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById("app"));