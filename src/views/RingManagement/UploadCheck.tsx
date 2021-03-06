import React, { useEffect, useState } from 'react'
import { Upload, message, Button, Radio, Image, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { actions } from '@/api/index'
import { DownloadFileFn } from '@/until/until'
import styled from 'styled-components'
import upload from '@/assets/upload.png'
import excel from '@/assets/excel.png'
const UploadCheck_style = styled.div`
.uploadCheck_title{
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
}
.downloadCheck_name{
  font-size: 16px;
  color: #333333;
  position: relative;
  padding-left: 20px;
  &:before{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 4px;
    width: 8px;
    height: 20px;
    background-color: #4256a7;
    border-radius: 2px;
  }
}
.downloadCheck_btn{
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #4256a7;
  font-size: 14px;
  color: #4256a7;
}
.downloadCheck_btn2 {
  border-radius: 6px;
  border: solid 1px #4256a7;
  margin-top: 30px;
  font-size: 14px;
  background-color: #4256a7;
  color: #fff;
}
.downloadCheck_btn2_cancel{
  color: #4256a7;
  background-color: #ffffff;
}
.uploadCheck_content{
  margin: 0 20px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.ant-upload-drag{
  border: 0 !important;
  background: #fff !important;
  padding: 70px 0 !important;
  .ant-image{
    margin-bottom: 40px;
  }
}
.ant-upload-wraps{
  border: 0 !important;
  background: #fff !important;
  padding: 70px 0 !important;
  text-align: center;
  .ant-image{
    margin-bottom: 40px;
  }
}
.uploadCheck_table{
  padding: 0 20px;
  p{
    display: inline-block;
    height: 60px;
    line-height: 60px;
    padding: 0 0 0 15px;
    margin: 0;
    position: relative;
    &:before{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 22px;
      width: 6px;
      height: 14px;
      background-color: #4256a7;
      border-radius: 2px;
    }
  }
  .ant-table-wrapper{
    height: 320px !important;
    overflow-y: scroll;
  }
  .table_color{
    color: #d12343;
    font-size: 14px;
    border-bottom: 1px solid #d12343;
    cursor: pointer;
  }
}
`
const { Dragger } = Upload
const { downloadTemplate, uploadTable } = { ...actions }
interface IdataSource {
  key: string;
  name: string;
  ip: string;
  createdBy: string;
  createTime: string;
}
const columns: ColumnsType<IdataSource> = [
  {
    title: '?????????',
    dataIndex: 'name',
    key: 'Name',
    render: (text: string) => <span className='table_color'>{text}</span>
  },
  {
    title: 'ip',
    dataIndex: 'ip',
    key: 'Ip'
  },
  {
    title: '?????????',
    dataIndex: 'createdBy',
    key: 'CreatedBy'
  },
  {
    title: '??????',
    dataIndex: 'createTime',
    key: 'CreateTime'
  }
]
const dataSource: IdataSource[] = [
]
class UploadCheck extends React.Component {
  state = {
    fileList: [],
    dataSource,
    columns
  }

  // ???????????????
  componentDidMount () {
    this.getTableList()
  }

  // ???????????? state
  setStateAsync (state: any) {
    return new Promise((resolve: any) => { this.setState(state, resolve) })
  }

  // ??????table
  getTableList = () => {
    uploadTable({}).then(async (res: any) => {
      await this.setStateAsync({
        dataSource: res.data.records
      })
    })
  }

  // ????????????
  downTemp = () => {
    const blobType = 'application/vnd.ms-excel'
    downloadTemplate({}).then((res: any) => {
      DownloadFileFn(res, blobType)
    })
  }

  // ??????????????????
  handleUnUpload = () => {
    this.setState({
      fileList: []
    })
  }

  // ??????????????????
  handleUpload = () => {
    const { fileList } = this.state
    const formData = new FormData()
    fileList.forEach(file => {
      formData.append('multipartFile', file)
    })
    fetch('http://127.0.0.1:8081/api/o/file/uploadFile', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: localStorage.getItem('token') || ''
      }
    })
      .then(
        res => {
          return res.json()
        })
      .then(() => {
        this.setState({
          fileList: []
        })
        this.getTableList()
        message.success('????????????')
      })
      .catch(() => {
        message.error('????????????')
      })
      .finally(() => {
      })
  }

  render () {
    const { fileList } = this.state
    const props = {
      name: 'file',
      multiple: true,
      // ???????????????
      beforeUpload: (file: any) => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }))
        console.log('11111')
        return false
      },
      fileList
    }
    return <UploadCheck_style>
      <div className="uploadCheck_title">
        <span className="downloadCheck_name">????????????</span>
        <Button className="downloadCheck_btn" type="primary" size={'small'} onClick={this.downTemp}>
          ????????????
        </Button>
      </div>
      {fileList.length === 0 && <div className="uploadCheck_content">
        <Dragger {...props}>
          <Image
            width={'88px'}
            height={'88px'}
            src={upload}
            preview={false}
          />
          <p className="ant-upload-text">???????????????????????????????????????????????????????????????????????????</p>
          <Button className="downloadCheck_btn2" type="primary" size={'large'}>
            ????????????
          </Button>
        </Dragger>
      </div>}
      {fileList.length !== 0 && <div className="uploadCheck_content">
        <div className="ant-upload-wraps">
        <Image
          src={excel}
          preview={false}
        />
        {fileList.map((x) =>
          <p className="ant-upload-text" key={x.uid}>
            {x.name}
          </p>
        )}
        {/* <p className="ant-upload-text">{fileList[0].name}</p> */}
        <div>
          <Button
            className="downloadCheck_btn2 downloadCheck_btn2_cancel"
            onClick={this.handleUnUpload}
            disabled={fileList.length === 0}
          >
            ??????
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            className="downloadCheck_btn2"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
          >
            ??????
          </Button>
        </div>
        </div>
      </div>
      }
      <div className="uploadCheck_table">
        <p>???10???????????????</p>
        <Table<IdataSource> dataSource={this.state.dataSource} columns={this.state.columns} showHeader={false} size={'middle'} pagination={false} bordered={true}/>
      </div>
    </UploadCheck_style>
  }
}
export default UploadCheck
