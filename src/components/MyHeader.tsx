import React from 'react';
import "./less/MyHeader.less"
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Logo = require('assets/images/logo.jpg')
const default_avatar = require('assets/images/avatar.jpg')

export default function MyHeader() {
    const menu = (
        <Menu>
            <Menu.Item>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item>退出登录</Menu.Item>
        </Menu>
    );
    
    return (
        <header>
            <img src={Logo} height={50} alt="" />
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href='!#' onClick={e => e.preventDefault()}>
                    <img src={default_avatar} height={40} style={{borderRadius:'50%',marginRight:'15px'}} alt="" />
                    <span style={{marginRight:'10px'}}>用户</span><DownOutlined />
                </a>
            </Dropdown>
        </header>
    )
}
