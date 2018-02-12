import React from 'react';
import {Row, Col,} from 'antd';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComment from './common_comments';

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
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title;
            });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComment uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={40} type={"top"} width="100%" cardTitle={"相关新闻"} imageWidth="130px"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}
