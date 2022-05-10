import { Avatar, Dropdown, Layout, Menu, Space } from 'antd';
import React,{useState} from 'react';
import cls from '@/components/header.module.less';
import logo from '@/assets/logo.jpg';

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
    <Header className={cls.layout_header}>
      <Dropdown overlay={menu}>
        <Space>
          <Avatar src={logo} />
          {user?.username}
        </Space>
      </Dropdown>
    </Header>
  );
};

export default MyHeader;
