import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import { Link, useNavigate } from 'react-router-dom';
import { RegisterApi } from "request/api";

const logo = require("assets/images/logo.jpg")

interface IRegisterLogin {
  username: string;
  password: string;
  password1: string;
}

export default function Register() {
  const navigate = useNavigate()

  const onFinish = (values: IRegisterLogin) => {
    console.log('Success:', values);
    //当后台数据和前台数据名称不一致时定义
    let { username, password, password1 } = values;
    if (password !== password1) {
      message.error("请输入相同的密码", 1.5);
      return;
    }

    interface IRes {
      errCode?: number;
      message?: string;
      data?: any;
    }

    RegisterApi(values).then((res: IRes) => {
      if (res.errCode === 0) {
        message.success(res.message, 1.5);
        setTimeout(() => {
          navigate("/login")
        })
      } else {
        message.error(res.message);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login_box'>
      <img src={logo} width={400} height={100} className='logo' alt="" />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size='large'
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-from-item-icon" />} placeholder='请输入用户名' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-from-item-icon" />} placeholder='请输入密码' />
        </Form.Item>

        <Form.Item
          name="password1"
          rules={[{ required: true, message: '请确认密码!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-from-item-icon" />} placeholder='请确认密码' />
        </Form.Item>

        <Form.Item>
          <Link to="/login">已有账号？返回登录</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size='large' block>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
