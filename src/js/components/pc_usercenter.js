import React from 'react';
import {Row, Col, Modal, Menu, Icon, Tabs, Upload, Button, Card} from 'antd';
import {Link} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: '',
            usercomments: '',

            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            previewVisible: false,
            previewImage: '',
            uploading: false,
        }
    }

    handleCancel() {
        this.setState({previewVisible: false})
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
        const {uploading, usercollection, usercomments} = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((item, index) => (
                <Card key={index} title={item.uniquekey}
                      extra={<Link target="_blank" to={`/details/${item.uniquekey}`}>查看</Link>}>
                    <p>{item.Title}</p>
                </Card>
            ))
            : "您还没有收藏任何的新闻，快去收藏一些把。";


        const usercommentsList = usercomments.length ?
            usercomments.map((item, index) => (
                <Card key={index} title={`于${item.datetime} 评论了文章 ${item.uniquekey}`}
                      extra={<Link target="_blank" to={`/details/${item.uniquekey}`}>查看</Link>}>
                    <p>{item.Comments}</p>
                </Card>
            ))
            : "您还没有发表任何评论，快去评论把。";

        const props = {
            action: 'http://newsapi.gugujiankong.com/Handler.ashx',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            listType: 'picture-card',
            onRemove: (file) => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            onPreview: (file) => {
                this.setState({previewImage: file.url, previewVisible: true});
            },
            beforeUpload: (file) => {
                this.setState(({fileList}) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span="24">
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div className="comment">
                                    <Row>
                                        <Col span="24">
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null}
                                           onCancel={this.handleCancel.bind(this)}>
                                        <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
                                    </Modal>

                                    <Button
                                        className="upload-demo-start"
                                        type="primary"
                                        onClick={this.handleUpload}
                                        disabled={this.state.fileList.length === 0}
                                        loading={uploading}
                                    >
                                        {uploading ? 'Uploading' : 'Start Upload'}
                                    </Button>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}