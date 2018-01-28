import React from 'react';
import {Icon} from 'antd';
import ModalRegisterLogin from './modal_register_login';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default class MobileHeader extends React.Component {
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


    logout() {
        localStorage.userId = '';
        localStorage.userNickName = '';
        this.setState({
            hasLogined: false,
        })
    }

    setUserInfo(userNickName, userId) {
        this.setState({
            userNickName: userNickName,
            userId: userId,
        });
        localStorage.userId = this.state.userId;
        localStorage.userNickName = this.state.userNickName;
    }

    componentWillMount() {
        if (localStorage.userId != '') {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userId: localStorage.userId,
            })
        }
    }

    login() {
        this.setModalVisible(true);
    }

    setLoginState(val) {
        this.setState({hasLogined: val});
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

    render() {

        const userShow = this.state.hasLogined
            ?
            <Router>
                <Link to={'/'}>
                    <Icon type="inbox"/>
                </Link>
            </Router>
            : <Icon type="setting" onClick={this.login.bind(this)}/>;
        return (
            <div id="mobileheader">
                <header>
                    <a href="/">
                        <img src="./src/images/logo.png" alt="logo"/>
                        <span>ReactNews</span>
                    </a>
                    {userShow}
                </header>


                <ModalRegisterLogin modalVisible={this.state.modalVisible}
                                    setModalVisible={this.setModalVisible.bind(this)}
                                    setLoginState={this.setLoginState.bind(this)}
                                    setUserInfo={this.setUserInfo.bind(this)}/>
            </div>
        )
    }
}