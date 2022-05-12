import { Layout } from 'antd';
import React from 'react';
import Menus from '@/components/Menu'
import Headers from '@/components/Header'
import { Outlet } from 'react-router-dom';
import styled from 'styled-components'
const { Sider, Content } = Layout;
const Content_style = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f6f6f6;
  .site-layout-background {
    height: 100%;
  }
`
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
        <Headers />
        <Layout>
          <Sider width={180} theme='light'>
            <Menus />
          </Sider>
          <Content_style>
            <Content className="site-layout-background">
              <Outlet />
            </Content>
          </Content_style>
        </Layout>
      </Layout>
    );
  }
}

export default () => <SiderDemo />;