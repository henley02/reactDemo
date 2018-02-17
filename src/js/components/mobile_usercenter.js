import React from 'react';
import {Row, Col, Modal, Menu, Icon, Tabs, Upload, Button, Card} from 'antd';
import {Link} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;


export default class MobileUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: '',
            usercomments: '',
        }
    }


    componentDidMount() {//收藏列表
        var myFetchOption = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId, myFetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({usercollection: json});
            });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId, myFetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({usercomments: json});
            });
    }


    render() {
        const {usercollection, usercomments} = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((item, index) => (
                <Card key={index} title={item.uniquekey}
                      extra={<Link to={`/details/${item.uniquekey}`}>查看</Link>}>
                    <p>{item.Title}</p>
                </Card>
            ))
            : "您还没有收藏任何的新闻，快去收藏一些把。";

        const usercommentsList = usercomments.length ?
            usercomments.map((item, index) => (
                <Card key={index} title={`于${item.datetime}评论了文章`}
                      extra={<Link to={`/details/${item.uniquekey}`}>查看</Link>}>
                    <p>{item.Comments}</p>
                </Card>
            ))
            : "您还没有发表任何评论，快去评论把。";

        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div>
                                    <Row>
                                        <Col span="24">
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div>
                                    <Row>
                                        <Col span="24">
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">

                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }
}