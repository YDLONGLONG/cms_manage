import React, {useEffect, useState} from 'react';
import "./less/MyHeader.less"
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Logo = require('assets/images/logo.jpg')
const default_avatar = require('assets/images/avatar.jpg')

export default function MyHeader() {
    const [avatar,setAvatar] = useState(default_avatar);
    const [username,setUsername] = useState("默认名称");

    useEffect(()=>{
        let avatar1 = localStorage.getItem("avatar") || default_avatar;
        let username1 = localStorage.getItem("username") || "默认名称";
        setAvatar(avatar1);
        setUsername(username1);
    },[])

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
                    <img src={process.env.SERVER_PORT_IMG+avatar} width={40} style={{borderRadius:'50%',marginRight:'15px'}} alt="" />
                    <span style={{marginRight:'10px'}}>{username}</span><DownOutlined />
                </a>
            </Dropdown>
        </header>
    )
}
