import React, {useEffect, useState} from 'react';
import "./less/MyHeader.less"
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Logo = require('assets/images/logo.jpg')
const default_avatar = require('assets/images/avatar.jpg')

export default function MyHeader() {
    const [avatar,setAvatar] = useState(default_avatar);
    const [username,setUsername] = useState("默认名称");
    const navigate = useNavigate();

    useEffect(()=>{
        let avatar1 = process.env.SERVER_PORT+'/'+ localStorage.getItem("avatar") || default_avatar;
        let username1 = localStorage.getItem("username") || "默认名称";
        setAvatar(avatar1);
        setUsername(username1);
    },[])

    const goMeans = () =>{
        let token = localStorage.getItem("cms-token")
        if(token){
            navigate('/means')
        }else{
            message.warning("登录失效，请重新登录",1.5);
            setTimeout(()=>{
                navigate('/login')
            },1500)
        }
    }

    const logout = () =>{
        localStorage.removeItem("cms-token");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        message.success("即将跳转登录页",1.5);
        setTimeout(()=>{
            navigate('/login')
        },1500)
    }

    const menu = (
        <Menu>
            <Menu.Item key={1} onClick={goMeans}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );
    
    return (
        <header>
            <img src={Logo} height={50} width={50} alt="" />
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href='!#' onClick={e => e.preventDefault()}>
                    <img src={avatar} width={40} style={{borderRadius:'50%',marginRight:'15px'}} alt="" />
                    <span style={{marginRight:'10px'}}>{username}</span><DownOutlined />
                </a>
            </Dropdown>
        </header>
    )
}
