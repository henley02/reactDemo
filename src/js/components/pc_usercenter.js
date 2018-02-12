import React from 'react';
import {Row, Col, Modal, Menu, Icon, Tabs, Upload} from 'antd';

const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    handleCancel() {

    }

    render() {
        const props = {
            action: 'http://newsapi.gugujiankong.com/Handler.ashx',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            listType: 'picture-card',
            onPreview: (file) => {
                this.setState({previewImage: file.url, previewVisible: true});
            },
            beforeUpload: (file) => {
                this.setState(({fileList}) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
        };
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">

                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">

                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null}
                                           onCancel={this.handleCancel}>
                                        <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
                                    </Modal>
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