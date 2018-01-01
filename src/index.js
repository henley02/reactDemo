import React from 'react';
import ReactDOM from 'react-dom';

import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';
import BodyIndex from './components/bodyIndex';
import ComponentDemo from './components/demo';

class Index extends React.Component {
    render() {
        return (
            <div>
                <ComponentDemo/>
                <ComponentHeader/>
                <BodyIndex userName={'131dfaafda'}/>
                <ComponentFooter/>
            </div>
        )
    }
    componentWillMount(){
        console.log("Index-componentWillMount")
    }
    componentDidMount(){
        console.log("Index - componentDidMount")
    }
}
ReactDOM.render(
    <Index/>,
    document.getElementById("root")
)