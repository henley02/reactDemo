import React from 'react';
import {Row, Col,} from 'antd';
import CommonComment from './common_comments';

export default class MobileNewsDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: '',
        }
    };

    createMarkup() {
        return {__html: this.state.newsItem.pagecontent};
    };

    componentWillMount() {
        console.log(this.props.match.params.uniquekey);
    }

    componentDidMount() {
        console.log(this.props)
        var myFetchOption = {
            method: 'GET'
        };
        /*+ this.props.params.uniquekey*/
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title;
            });
    }

    render() {
        return (
            <div id="mobileDetailsContainer">
                <div className={"ucmobileList"}>
                    <Row>
                        <Col span={24} className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <hr/>
                            <CommonComment uniquekey={this.props.match.params.uniquekey}/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
