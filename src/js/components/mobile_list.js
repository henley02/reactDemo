import React from 'react';
import {Row, Col} from 'antd';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: '',
        }
    }

    componentWillMount() {
        var myFetchOption = {
            method: 'GET',
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOption)
            .then(response => response.json())
            .then(json => this.setState({news: json}))
    }

    render() {
        const styleImage = {
            display: "block",
            width: this.props.imageWidth,
            height: "90px"
        };
        const styeH3 = {
            width: this.props.imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };
        const {news} = this.state;
        const newsList = news.length
            ?
            news.map((newsItem, index) => (
                <section key={index} className="m_article list-item special_section clearfix">
                    <Link to={`details/${newsItem.uniquekey}`}>
                        <div className="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.uniquekey}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{newsItem.realtype}</span>
                                    <span className="m_article_time">{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
            :
            '没有加载到任何新闻';
        return (
            <div className="">
                <Router>
                    <Row>
                        <Col span={24}>
                            {newsList}
                        </Col>
                    </Row>
                </Router>
            </div>
        )
    }

}
