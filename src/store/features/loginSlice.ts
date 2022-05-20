import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post } from '../../http/index'
interface commonState {
  [prop: string]: any
}
export interface LoginState {
  account: commonState,
  jwt: string
}
const initialState: LoginState = {
  account: {},
  jwt: ''
}
export const getLoginAsync = createAsyncThunk(
  'login',
  async (payload: LoginState) => {
    const { code, data } = await post('/login', payload)
    if (code === 200) {
      return data
    }
  }
)
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginAsync.pending, (state) => {
        console.log('异步请求正在进行中!')
      })
      .addCase(getLoginAsync.rejected, (state) => {
        console.log('异步请求失败!')
      })
      .addCase(getLoginAsync.fulfilled, (state, action) => {
        console.log('异步请求成功!')
        window.localStorage.setItem('userInfo', JSON.stringify(action.payload.account))
        state.account = action.payload.account
        window.localStorage.setItem('token', action.payload.jwt)
        state.jwt = action.payload.jwt
      })
  }
})
export default loginSlice.reducer
