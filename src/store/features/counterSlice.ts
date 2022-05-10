import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {fetch} from "../../http/index";
import {RootState, AppThunk} from '../store'
interface testState {
  [prop: string]: any
}
export interface CounterState {
  count: number,
  info: any
}
const initialState: CounterState = {
  count: 0,
  info: {}
}
export const getIpAsync = createAsyncThunk(
  'counter',
  async (payload: testState) => {
    const {data} = await fetch('/api/', payload);
    return data.data
  }
);
export const counterSlice = createSlice({
  name: 'counter', // 命名空间，在调用action的时候会默认的设置为action的前缀
  // 初始值
  initialState,
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIpAsync.pending, (state) => {
        console.log('异步请求正在进行中!')
      })
      .addCase(getIpAsync.rejected,(state)=>{
        console.log('异步请求失败!')
      })
      .addCase(getIpAsync.fulfilled, (state, action) => {
        console.log('异步请求成功!')
        state.info = state.info;
        console.log(state.info)
      });
  },
});

// 导出actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 内置了thunk插件，可以直接处理异步请求
export const incrementAsync = (amount: number): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = (state: RootState) => state.counter.count;
export default counterSlice.reducer;