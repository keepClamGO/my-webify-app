import React, { useEffect, useState } from 'react';
import { Button, Input  } from 'antd';
import { useAppSelector, useAppDispatch } from '@/hooks/index'
import { increment, incrementAsync, getIpAsync} from '../store/features/counterSlice'; // 引入actions
import {api, actions} from '../api/index'
let payload = {
  appid: '94425585',  
  appsecret: 'URGFq8pN',
  version: 'history',
  city: '青岛',
  year: '2018',
  month: '5'
}
let payload2 = {
  username: 'admin@ceshi.com',
  password: 'qwe123456'
}
function User() {
 const [incrementAmount] = useState('2');
 console.log({...api, ...actions})
 let {comeleaveYears, login} = {...actions}
 login(payload2).then((res: any) => {
  console.log('res111111111111', res)
 })
 const getdata = (payload: any) =>{
  login(payload2).then((res: any) => {
   console.log('res', res)
  })
 }
 const { count, info } = useAppSelector((state) => state.counter);
 const dispatch = useAppDispatch();
//  const aaa = useEffect(() => {dispatch(getIpAsync(payload))},[])
 return (
    <div>
      <Button type="primary" onClick={() => {
          dispatch(increment()); // dispatch派发action
        }}>
        同步增加
        {count}
      </Button>
      <Button type="primary" onClick={getdata}>
      getdata
      </Button>
      <hr />
      <Button type="primary" onClick={() => dispatch( incrementAsync(Number(incrementAmount) || 0))}>
        异步增加
        {count}
      </Button>
      <Button type="primary" onClick={() => dispatch( getIpAsync(payload))}>
        调用接口
        {/* {info} */}
      </Button>
    </div>
  );
}
export default User;