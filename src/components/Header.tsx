import { Avatar, Dropdown, Layout, Menu, Space, Image } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
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
  .header_title{
    font-size: 20px;
    margin-left: 15px;
    vertical-align: -webkit-baseline-middle;
    font-weight: 600;
  }
`
const { Header } = Layout
const MyHeader: React.FC = () => {
  const userInfo = window.localStorage.getItem('userInfo')
  const login = JSON.parse(userInfo || '')
  const navigate = useNavigate()
  const handleChange = (e: { key: string }) => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userInfo')
    navigate('/Login', { state: { test: '1' } })
  }

  const menu = (
    <Menu onClick={handleChange}>
      <Menu.Item key="0">退出登录</Menu.Item>
    </Menu>
  )
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
            {login?.username}
          </Space>
        </Dropdown>
      </Header>
    </Header_style>
  )
}

export default MyHeader
