import React from 'react'
import { DatePicker, Checkbox, Button, Table, Image } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { actions } from '@/api/index'
import styled from 'styled-components'
import update from '@/assets/update.png'
import dayjs from 'dayjs'
const UpdateCheck_style = styled.div`
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
  .ant-checkbox-group{
    padding-top: 10px;
  }
  .uploadCheck_content{
    padding-top: 20px;
    margin: 0 20px;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }
  .uploadCheck_content_center{
    border: 0;
    background: #fff;
    padding: 138px 0 70px 0;
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
      height: 275px !important;
      overflow-y: scroll;
    }
    .table_color{
      color: #d12343;
      font-size: 14px;
      border-bottom: 1px solid #d12343;
      cursor: pointer;
    }
  }
}
`
const { dataSynchronization, dataSynchronizationList } = { ...actions }
const { RangePicker } = DatePicker
type StateType = {
  options: any;
  dataSource: any;
  columns: any;
  startTime: string;
  endTime: string;
  checkedValues: string[]
};
type propType = {
  options: string;
  dataSource: number;
  columns: any;
  startTime: string;
  endTime: string;
  checkedValues: string[]
};
interface UpdateChecks {
  state: StateType;
  props: propType
}
interface IdataSource {
  createdBy: string;
  ip: string;
  createTime: string;
  title: string
}
const columns: ColumnsType<IdataSource> = [
  {
    title: '?????????',
    dataIndex: 'createdBy',
    key: 'createdBy'
  },
  {
    title: 'ip',
    dataIndex: 'ip',
    key: 'Ip'
  },
  {
    title: '??????',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '??????',
    dataIndex: 'title',
    key: 'title'
  }
]
const dataSource: IdataSource[] = [
]
class UpdateCheck extends React.Component {
  state: StateType = {
    options: [
      { label: '????????????', value: '10' },
      { label: '???????????????', value: '20' },
      { label: '????????????', value: '30' },
      { label: '????????????', value: '40' },
      { label: '????????????', value: '50' }
    ],
    dataSource,
    columns,
    startTime: '',
    endTime: '',
    checkedValues: []
  }

  componentDidMount () {
    this.getTableList()
  }

  setStateAsync (state: any) {
    return new Promise((resolve: any) => { this.setState(state, resolve) })
  }

  // ??????table
  getTableList = () => {
    dataSynchronizationList({}).then(async (res: any) => {
      await this.setStateAsync({
        dataSource: res.records
      })
    })
  }

  // ????????????
  getUpdate = () => {
    const payload = {
      startTime: dayjs(this.state.startTime).unix(),
      endTime: dayjs(this.state.endTime).unix(),
      type: this.state.checkedValues
    }
    dataSynchronization(payload).then(async (res: any) => {
      this.getTableList()
    })
  }

  // ??????????????????
  timehange = async (date: Array<any>, dateString: Array<string>) => {
    await this.setStateAsync({
      startTime: dateString[0],
      endTime: dateString[1]
    })
  }

  // ????????????
  checkChange = async (checkedValues: string[]) => {
    console.log(checkedValues)
    await this.setStateAsync({
      checkedValues
    })
  }

  render () {
    return <UpdateCheck_style>
      <div className="uploadCheck_title">
        <span className="downloadCheck_name">????????????</span>
      </div>
      <div className="uploadCheck_content">
        <div>
          <RangePicker placement={'bottomLeft'} onChange={this.timehange} style={{ marginRight: '20px' }}/>
          <Checkbox.Group options={this.state.options} defaultValue={['Pear']} onChange={this.checkChange} />
        </div>
        <div className="uploadCheck_content_center">
          <Image
              width={''}
              height={''}
              src={update}
              preview={false}
            />
            <div>
              <Button className="downloadCheck_btn" type="primary" size={'large'} disabled={this.state.checkedValues.length === 0} onClick={this.getUpdate}>
                ???&nbsp;&nbsp;&nbsp;???
              </Button>
            </div>
        </div>
      </div>
      <div className="uploadCheck_table">
          <p>???10???????????????</p>
          <Table<IdataSource> dataSource={this.state.dataSource} columns={this.state.columns} showHeader={false} size={'middle'} pagination={false} bordered={true}/>
        </div>
    </UpdateCheck_style>
  }
}
export default UpdateCheck
