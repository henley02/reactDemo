import React from 'react';
import {Menu, Modal, Button, Tabs, Form, Input, message} from 'antd';


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class ModalRegisterLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            action: 'login',
        }
    }

    changeTab(key) {
        if (key == 1) {
            this.setState({action: 'login'});
        } else if (key == 2) {
            this.setState({action: 'register'});
        }
    }

    setUserInfo(userNickName, userId) {
        this.props.setUserInfo(userNickName, userId);
    }

    setModalVisible(val) {
        this.props.setModalVisible(val);//传值给父组件
    }

    handleSubmit(e) {
        e.preventDefault();

        var myFetchOption = {
            method: 'GET'
        };

        var formData = this.props.form.getFieldsValue();
        console.log(formData);

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?" +
            "action=" + this.state.action +
            "&username=" + formData.userName +
            "&password=" + formData.password +
            "&r_userName=" + formData.r_userName +
            "&r_password=" + formData.r_password +
            "&r_confirmPassword=" + formData.r_confirmPassword
        ).then(res => res.json())
            .then(json => {
                this.setUserInfo(json.NickUserName, json.UserId);
            })

        if (this.state.action == "login") {
            this.props.setLoginState(true);
        }
        message.success("请求成功！");
        this.setModalVisible(false);
    }

    render() {
        var modalVisible = this.props.modalVisible;
        let {getFieldDecorator} = this.props.form;
        return (
            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={modalVisible}
                   onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)}
                   okText="关闭" cancelText="取消" footer={null} maskClosable={false}>
                <Tabs type="card" onChange={this.changeTab.bind(this)}>
                    <TabPane tab="登录" key="1">
                        <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="账户">
                                {
                                    getFieldDecorator("userName")(<Input placeholder="请输入您的账户"/>)
                                }
                            </FormItem>
                            <FormItem label="密码">
                                {
                                    getFieldDecorator("password")(<Input type={"password"} placeholder="请输入您的密码"/>)
                                }
                            </FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form>
                    </TabPane>

                    <TabPane tab="注册" key="2">
                        <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="账户">
                                {
                                    getFieldDecorator("r_userName")( <Input placeholder="请输入您的账户"/>)
                                }
                            </FormItem>
                            <FormItem label="密码">
                                {
                                    getFieldDecorator("r_password")( <Input placeholder="请输入您的密码" type="password"/>)
                                }
                            </FormItem>
                            <FormItem label="确认密码">
                                {
                                    getFieldDecorator("r_confirmPassword")( <Input placeholder="请再次输入您的密码" type="password"/>)
                                }
                            </FormItem>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form>
                    </TabPane>

                </Tabs>
            </Modal>
        )
    }
}

export default ModalRegisterLogin = Form.create({})(ModalRegisterLogin);