import React from 'react';
import type { MenuProps } from 'antd';
import { Menu, Switch, Divider } from 'antd';
import { Link } from "react-router-dom";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
  <Link to={'/login'}>
    go login路由
  </Link>, '1', <MailOutlined />),
  getItem('user', '2', <CalendarOutlined />),
  getItem('Login', 'sub1', <AppstoreOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('钝角', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  getItem(
    <Link to={'/user'}>
        go user路由
    </Link>,
    'link',
    <LinkOutlined />,
  ),
];

const Menus = () => {
  const [mode, setMode] = React.useState<'inline' | 'vertical'>('inline');
  const [theme, setTheme] = React.useState<'dark' | 'light'>('light');

  const changeMode = (value: boolean) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <>
      <div style={{height: '64px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      <Switch size="small" onChange={changeMode} />
      <Switch size="small" onChange={changeTheme} />
      </div>
      <Menu
        style={{}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
        items={items}
      />
    </>
  );
};

export default Menus;