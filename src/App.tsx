import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { ReadOutlined, EditOutlined, UserOutlined, SelectOutlined } from '@ant-design/icons';
import "./App.less"
import { Outlet } from "react-router-dom";
import MyHeader from "components/MyHeader";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

interface IProps{
  key:number;
}

function App(props:IProps) {

  return (
    <Layout className="container">
    <MyHeader key={props.key} />
    <Layout className="container_content">
      <Sider width={200}>
      <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          style={{height:'100%',borderRight:0}}
        >
            <Menu.Item key="1"><ReadOutlined /> 查看文章列表</Menu.Item>
            <Menu.Item key="2"><EditOutlined /> 文章编辑</Menu.Item>
            <Menu.Item key="3"><ReadOutlined /> 修改资料</Menu.Item>
          <SubMenu key="4" icon={<UserOutlined />} title="管理员">
            <Menu.Item key="4-1"><SelectOutlined /> 小编名单</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content className="mycontent">
          {<Outlet />}
        </Content>
      </Layout>
    </Layout>
    <footer style={{
      textAlign:'center',
      color:'#fff',
      height:'70px',
      lineHeight:'70px',
      background:'#001529'
    }}>脚部</footer>
  </Layout>
  );
}

const mapStateToProps = (state:{key:number})=>{
  return{
    key:state.key
  }
}

const maoDispatchToProps= (dispatch:Dispatch)=>{
  return{
    changeKeyFn(){
      dispatch({type:"changeKey"})
    }
  }
}

export default connect(mapStateToProps)(App)