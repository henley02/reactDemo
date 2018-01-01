/**
 * Created by shilihong on 2018/1/1.
 */
import React from 'react';

var SetIntervalMixin = {
    componentWillMount(){
        console.log("SetIntervalMixin componentWillMount")
        this.intervals = [];
    },
    setInterval(){
        console.log("SetIntervalMixin setInterval ")
        console.log(arguments)
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount(){
        console.log("SetIntervalMixin componentWillUnmount ")
        console.log(clearInterval)
        this.intervals.forEach(clearInterval);
    }
}
var createReactClass = require('create-react-class');

var TickTock = createReactClass({
    mixins: [SetIntervalMixin],
    getInitialState: function () {
        return {seconds: 0}
    },
    componentDidMount: function () {
        this.setInterval(this.tick, 1000);
    },
    tick: function () {
        this.setState({
            seconds: this.state.seconds + 1
        });
    },
    render(){
        return (
            <div>
                React has been running for {this.state.seconds} seconds.
            </div>
        )
    }
})

export default  TickTock;