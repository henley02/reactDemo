import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import {Button} from 'antd';

import PCIndex from './components/pc_index';
import 'antd/dist/antd.css';

export default class Root extends React.Component {
    render() {
        return (
            <div>
                <PCIndex></PCIndex>
            </div>
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById("app"));