import React from 'react';
import {Row, Col} from 'antd';

export default class PCNewsDetails extends React.Component {
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
                this.setState({newsItem: json})
            });
        document.title = this.state.newsItem.title;
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}
