import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import { Link ,useNavigate} from 'react-router-dom';
import { LoginApi } from "request/api";

const logo = require("assets/images/logo.jpg")

interface IRegisterLogin {
  username: string;
  password: string;
}

export default function Login() {
    const navigate = useNavigate()

    const onFinish = (values: IRegisterLogin) => {
      console.log('Success:', values);
      LoginApi(values).then((res: any) => {
        if (res.errCode === 0) {
          message.success(res.message, 1.5);

          localStorage.setItem('username',res.data.username);
          localStorage.setItem('cms-token',res.data['cms-token']);
          localStorage.setItem('avatar',res.data.avatar);

          setTimeout(() => {
            navigate("/")
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

      <Form.Item>
        <Link to="/register">还没账号？立即注册</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size='large' block>
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
