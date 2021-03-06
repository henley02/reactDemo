import React from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom'
import Tloader from 'react-touch-loader';

export default class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: '',
            count: 5,
            canRefreshResolve: 1,
            hasMore: 0,
            initializing: 1,
            refreshedAt: Date.now(),
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

    loadMore(resolve) {
        setTimeout(() => {
            var count = this.state.count;
            this.setState({
                count: count + 5,
            })
            var myFetchOption = {
                method: 'GET',
            };
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOption)
                .then(response => response.json())
                .then(json => this.setState({news: json}));

            this.setState({
                hasMore: count > 0 && count < 50
            })
            resolve();

        }, 2e3);

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                hasMore: 1,
                initializing: 2,
            })
        }, 2e3)
    }

    toggleCanReresh() {
        this.setState({canRefreshResolve: !this.state.canRefreshResolve});
    };

    render() {

        var {hasMore, initializing, refreshedAt, canRefreshResolve} = this.state;
        var {refresh, loadMore, toggleCanReresh} = this;

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
                    <Link to={`/details/${newsItem.uniquekey}`}>
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
            <div className="view">
                <Row>
                    <Col span={24}>
                        <Tloader className="main" autoLoadMore={true} onRefresh={refresh}
                                 onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
                            {newsList}
                        </Tloader>
                    </Col>
                </Row>
            </div>
        )
    }

}
