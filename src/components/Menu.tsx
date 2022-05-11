import React from 'react';
import type { MenuProps } from 'antd';
import { Menu, Image } from 'antd';
import { Link } from "react-router-dom";
import {
  SettingOutlined,
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
  getItem('指环检测', '1', <SettingOutlined />, [
    getItem(<Link to={'/BasicLayout/Home'}>
    上传文件
  </Link>,'2'),
    getItem(<Link to={'/BasicLayout/User'}>
    数据同步
  </Link>, '3')
  ])
];

const Menus = () => {
  return (
    <>
      <div style={{ height: '64px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <Image
        width={132}
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png"
        preview={false}
      />
      </div>
      <Menu
        style={{}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={'inline'}
        theme={'light'}
        items={items}
      />
    </>
  );
};

export default Menus;