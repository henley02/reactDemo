import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <h1>yejiao</h1>
            </footer>
        )
    }

    componentWillMount(){
        console.log("BodyIndex-componentWillMount")
    }
    componentDidMount(){
        console.log("bodyIndex - componentDidMount")
    }
}