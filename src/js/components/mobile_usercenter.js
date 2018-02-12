import React from 'react';
import {Row, Col, Modal, Menu, Icon, Tabs} from 'antd';

const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

export default class MobileUserCenter extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">

                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">

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