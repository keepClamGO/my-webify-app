import { Layout } from 'antd';
import React from 'react';
import Menus from '@/components/Menu'
import Headers from '@/components/Header'
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme='light'>
          <Menus/>
        </Sider>
        <Layout className="site-layout">
          <Headers />
          <Content className="site-layout-background">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default () => <SiderDemo />;