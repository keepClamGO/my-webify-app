import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number];

function getItem (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('数据上传', '1', <i className="iconfont iconupload"></i>, [
    getItem(<Link to={'/BasicLayout/UploadCheck'}>
      上传文件
    </Link>, '2', '')
  ]),
  getItem(<Link to={'/BasicLayout/UpdateCheck'}>
    数据同步
  </Link>, '3', <i className="iconfont icontest"></i>)
]

const Menus = () => {
  return (
    <>
      <Menu
        style={{ height: '100%', borderRight: '0', boxShadow: '0px 0px 13px 0px rgba(0, 0, 0, 0.07)' }}
        defaultSelectedKeys={['2']}
        defaultOpenKeys={['2']}
        mode={'inline'}
        theme={'light'}
        items={items}
      />
    </>
  )
}

export default Menus
