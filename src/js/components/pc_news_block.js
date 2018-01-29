import React from 'react';
import {Card} from 'antd';
import {Link, Route, BrowserRouter as Router} from 'react-router-dom';

export default class PCNewsBlock extends React.Component {
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
        const {news} = this.state;
        const newsList = news.length
            ?
            news.map((newsItem, index) => (<li key={index}>
                <Link to={`/details/${newsItem.uniquekey}`} target="_blank">{newsItem.title}</Link>
            </li>))
            :
            '没有任何新闻';
        return (
            <div className="topNewsList">
                <Card>
                    <Router>
                        <ul>
                            {newsList}
                        </ul>
                    </Router>
                </Card>
            </div>
        )
    }
}