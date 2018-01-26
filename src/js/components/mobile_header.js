import React from 'react';
import {Icon} from 'antd';
import ModalRegisterLogin from './modal_register_login';

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

    login() {
        this.setModalVisible(true);
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
            ? <Link>
                <Icon type="inbox"/>
            </Link>
            : <Icon type="setting" onClick={this.login.bind(this)}/>;
        return (
            <div id="mobileHeader">
                <header>
                    <a href="/">
                        <img src="./src/images/logo.png" alt="logo"/>
                        <span>ReactNews</span>
                    </a>
                    {userShow}
                </header>

                <ModalRegisterLogin modalVisible={this.state.modalVisible}
                                    setModalVisible={this.setModalVisible.bind(this)}/>
            </div>
        )
    }
}