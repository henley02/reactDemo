import React from 'react';
import {Row, Col, Menu, Icon, Button, message, Form,} from 'antd';

import ModalRegisterLogin from './modal_register_login';

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            mode: 'horizontal',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userId: '',
        }
    }

    setModalVisible(val) {
        this.setState({modalVisible: val});
    }

    handleClick(e) {
        console.log(e);
        this.setState({current: e.key});
        if (e.key == "register") {
            this.setState({modalVisible: true});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var myFetchOption = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword)
            .then(res => res.json()).then(json => {
            this.setState({userNickName: json.NickUserName, userId: json.UserId});
        })
        message.success("请求成功！");
        this.setModalVisible(false);
    }

    render() {
        const userShow = this.state.hasLogined
            ? <Menu.Item key="logout" className="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank">
                    <Button type="dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="ghost" htmlType="button">退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" className="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode={this.state.mode} selectedKeys={[this.state.current]}
                              onClick={this.handleClick.bind(this)}>
                            <Menu.Item key="top"> <Icon type="appstore"/>头条</Menu.Item>
                            <Menu.Item key="shehui"> <Icon type="appstore"/>社会</Menu.Item>
                            <Menu.Item key="guonei"> <Icon type="appstore"/>国内</Menu.Item>
                            <Menu.Item key="guoji"> <Icon type="appstore"/>国际</Menu.Item>
                            <Menu.Item key="yule"> <Icon type="appstore"/>娱乐</Menu.Item>
                            <Menu.Item key="tiyu"> <Icon type="appstore"/>体育</Menu.Item>
                            <Menu.Item key="keji"> <Icon type="appstore"/>科技</Menu.Item>
                            <Menu.Item key="shishang"> <Icon type="appstore"/>时尚</Menu.Item>
                            {userShow}
                        </Menu>

                        <ModalRegisterLogin modalVisible={this.state.modalVisible}
                                            setModalVisible={this.setModalVisible.bind(this)}/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}

export default PCHeader = Form.create({})(PCHeader);