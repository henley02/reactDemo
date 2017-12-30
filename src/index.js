import React from 'react';
import ReactDOM from 'react-dom';

import ComponentHeader from './components/header';

class Index extends React.Component{
    render(){
        return(
            <ComponentHeader/>
        )
    }
}
ReactDOM.render(
    <Index/>,
    document.getElementById("root")
)