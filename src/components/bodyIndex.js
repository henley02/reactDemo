import React from 'react';
import CompontentBodyChild from './bodyChild';
import PropTypes from 'prop-types';
import ReactMixin from 'react-mixin';
import Mixins from './mixins';

export default  class BodyIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            num: 0,
            age: 20,
        }
    }

    changeUserInfo(age) {
        this.setState({age: age});
        // var submitBtn = document.getElementById("submitBtn");
        // console.log(submitBtn);
        // ReactDOM.findDOMNode(submitBtn).style.color="red";

        // submitBtn.style.color = "red";
        Mixins.log()
        this.refs.submitBtn.style.color = "red";
    }

    handleChildValueChange(event) {
        this.setState({age: event.target.value});
    }

    render() {
        var html = "<span>fasf</span>";
        /*    setInterval(() => {
         let a=this.state.num++;
         console.log(a)
         this.setState({num: a})
         }, 1000)*/
        /*   setTimeout(()=>{
         this.props.userName='11111';
         },4000)*/
        return (
            <div>
                <h2>页面的主体部分</h2>
                {/*shushi*/}
                <div dangerouslySetInnerHTML={{__html: html}}></div>
                <p>{this.state.age}</p>
                <p>{this.props.userName}</p>
                <input type="button" value="submit" onClick={this.changeUserInfo.bind(this, 99)} id="submitBtn"
                       ref="submitBtn"/>
                <CompontentBodyChild handleChildValueChange={this.handleChildValueChange.bind(this)} {...this.props}
                                     id={123}/>
            </div>
        )
    }
}
BodyIndex.propTypes = {
    userName: PropTypes.string.isRequired,
}
BodyIndex.defaultProps = {
    userName: '1111',
}
ReactMixin(BodyIndex.prototype,Mixins)