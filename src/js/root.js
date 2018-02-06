import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
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
                    <MediaQuery query="(min-device-width: 1224px)">
                        <Switch>
                            <Route exact path="/" component={PCIndex}/>
                            <Route path="/details/:uniquekey" component={PCNewsDetails}/>
                            <Redirect to="/"/>
                        </Switch>
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