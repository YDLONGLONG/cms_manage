import React,{useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import { Link } from 'react-router-dom';

const logo = require("assets/images/logo.jpg")

export default function Register() {

    const onFinish = (values: any) => {
      console.log('Success:', values);
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
        name="password"
        rules={[{ required: true, message: '请确认密码!' }]}
      >
        <Input.Password prefix={<LockOutlined className="site-from-item-icon" />} placeholder='请确认密码' />
      </Form.Item>

      <Form.Item>
        <Link to="/login">已有账号？返回登录</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size='large' block>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
