import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '@/hooks/index'
import { getLoginAsync } from '../store/features/loginSlice' // 引入actions
import { useNavigate } from 'react-router-dom'
import bg from '@/assets/bg.png'
import styled from 'styled-components'
import { Ilogin } from '@/interface/types'
const Login = () => {
  const Login_style = styled.div`
      width: 100%;
      height: 100%;
      align-items: center;
      display: flex;
      justify-content: center;
      background-image: url(${bg});
      background-size: 100% 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: center;
      >.form_wrap{
        padding: 70px 65px;
        background-color: #ffffff;
        box-shadow: 0px 19px 34px 6px 
            rgba(0, 169, 218, 0.31);
        border-radius: 20px;
        text-align: center;
        >.title{
            font-size: 36px;
            color: #333;
            position: relative;
            padding-bottom: 12px;
            display: inline-block;
            margin-bottom: 56px;
            &::after{
                content: '';
                position: absolute;
                left: 50%;
                margin-left: -35px;
                bottom: 0;
                right: 0;
                width: 70px;
                height: 4px;
                background-color: #4256a7;
                border-radius: 2px;
            }
        }
        >.form_item{
            width: 340px;
            border-bottom: 1px solid #eeeeee;
            .ant-input{
                padding-left: 9px;
            }
        }
        >.ant-input-prefix {
            margin-right: 4px;
        }
        .anticon {
          color: #4256a7;
        }
        .login_button{
          background-color: #4256a7;
          border: 0;
          border-radius: 6px;
        }
        .ant-form-item-with-help .ant-form-item-explain {
          height: auto;
          min-height: 24px;
          opacity: 1;
          text-align: left;
          padding-left: 38px;
        }
      }
    `
  const navigate = useNavigate()
  // const { login } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const onFinish = async (values: Ilogin) => {
    await dispatch(getLoginAsync(values))
    navigate('/BasicLayout/UploadCheck', { state: { test: '1' } })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const title = '瑞思迈数据平台'

  return (
    <Login_style>
      <Form
        className="form_wrap"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <span className="title">{title}</span>
        <Form.Item
          label=""
          name="username"
          className="form_item"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input placeholder="请输入账号 (必填)" prefix={<UserOutlined />} bordered={false} />
        </Form.Item>
        <Form.Item
          label=""
          name="password"
          className="form_item"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input placeholder="请输入密码 (必填)" prefix={<UnlockOutlined />} bordered={false} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" className="login_button" block>
            立即登录
          </Button>
        </Form.Item>
      </Form>
    </Login_style>
  )
}
export default Login
