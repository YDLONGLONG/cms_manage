import React, {useState,useEffect} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { ReadOutlined, EditOutlined, UserOutlined, SelectOutlined } from '@ant-design/icons';
import "./App.less"
import { Outlet, Link, useLocation } from "react-router-dom";
import MyHeader from "components/MyHeader";
import { connect } from "react-redux";
//import { Dispatch } from "redux";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

interface IProps{
  key1:number;
}

function App(props:IProps) {
  //定义侧边栏当前项的值
  const [asidKey, setAsideKey] = useState("-1");
  const location = useLocation();
  //监听路由变化修改侧边栏当前值
  useEffect(()=>{
    switch(location.pathname){
        case "/list":
        setAsideKey("1");
        break;
        case "/edit":
        setAsideKey("2");
        break;
        case "/means":
        setAsideKey("3");
        break;
        case "/namelist":
        setAsideKey("4-1");
        break;
    }
  },[location.pathname])


  return (
    <Layout className="container">
    <MyHeader key={props.key1} />
    <Layout className="container_content">
      <Sider width={200}>
      <Menu
          selectedKeys={[asidKey]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          style={{height:'100%',borderRight:0}}
        >
            <Menu.Item key="1">
            <ReadOutlined /> <Link to={'/list'}>查看文章列表</Link>
            </Menu.Item>
            <Menu.Item key="2">
            <EditOutlined /> <Link to={'/edit'}>文章编辑</Link>
            </Menu.Item>
            <Menu.Item key="3">
            <ReadOutlined /> <Link to={'/means'}>修改资料</Link>
            </Menu.Item>
          <SubMenu key="4" icon={<UserOutlined />} title="管理员">
            <Menu.Item key="4-1">
            <SelectOutlined /> <Link to={'/namelist'}>小编名单</Link>
            </Menu.Item>
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
    key1:state.key
  }
}

// const mapDispatchToProps= (dispatch:Dispatch)=>{
//   return{
//     changeKeyFn(){
//       dispatch({type:"changeKey"})
//     }
//   }
// }

export default connect(mapStateToProps)(App)