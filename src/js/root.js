import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import MediaQuery from 'react-responsive';
import {BackTop} from 'antd';

import PCHeader from './components/pc_header';
import PCFooter from './components/pc_footer';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';

import MobileHeader from './components/mobile_header';
import MobileFooter from './components/mobile_footer';
import MobileIndex from './components/mobile_index';
import MobileNewsDetails from './components/mobile_news_details';
import 'antd/dist/antd.css';

export default class Root extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <PCHeader/>
                        <Switch>
                            <Route exact path="/" component={PCIndex}/>
                            <Route path="/details/:uniquekey" component={PCNewsDetails}/>
                            <Redirect to="/"/>
                        </Switch>
                        <PCFooter/>
                    </MediaQuery>

                    <MediaQuery query="(max-device-width: 1224px)">
                        <MobileHeader/>
                        <Switch>
                            <Route exact path="/" component={MobileIndex}/>
                            <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
                            <Redirect to="/"/>
                        </Switch>
                        <MobileFooter/>
                    </MediaQuery>

                    <BackTop/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById("app"));