import { Avatar, Dropdown, Layout, Menu, Space, Image } from 'antd';
import React,{useState} from 'react';
import styled from 'styled-components'
import { UserOutlined } from '@ant-design/icons';
import logo from '@/assets/logo.png';
const Header_style = styled.div`
  height: 64px;
  line-height: 64px;
  text-align: right;
  background-color: #fff;
  box-shadow: 0 2px 8px #fff;
  .ant-layout-header {
    padding: 0 20px;
  }
  .ant-layout-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #3c3c44;
    color: #fff;
  }
  .ant-image-img{
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }
  .header_title{
    font-size: 20px;
    margin-left: 15px;
    vertical-align: middle;
    font-weight: 600;
  }
`
const { Header } = Layout;
const MyHeader: React.FC = () => {
  const [user] = useState({username:'田欣'});

  const handleChange = (e: { key: string }) => {
  };

  const menu = (
    <Menu onClick={handleChange}>
      <Menu.Item key="0">退出登录</Menu.Item>
    </Menu>
  );
  return (
    <Header_style>
      <Header>
        <div>        
          <Image
          width={''}
          src={logo}
          preview={false}
          />
          <span className="header_title">瑞思迈数据平台</span>
        </div>

        <Dropdown overlay={menu}>
          <Space>
            <Avatar icon={<UserOutlined />} />
            {user?.username}
          </Space>
        </Dropdown>
      </Header>
    </Header_style>
  );
};

export default MyHeader;
