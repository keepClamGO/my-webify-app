import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const loadMoviesAPI = () =>
   fetch(
      'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48'
   ).then((res) => res.json());

export const loadData = createAsyncThunk('movie/loadData', async () => {
   const res = await loadMoviesAPI();
   return res; // 此处的返回结果会在 .fulfilled中作为payload的值
});

export const movieSLice = createSlice({
   name: 'movie',
   initialState: {
      list: [],
      totals: 0,
   },
   reducers: {
      loadDataEnd(state, { payload }) {
         state.list = payload;
         state.totals = payload.length;
      },
   },
   // 可以额外的触发其他slice中的数据关联改变
   extraReducers: (builder) => {
      builder
        .addCase(loadData.pending, (state) => {
          console.log('异步请求正在进行中!')
        })
        .addCase(loadData.rejected,(state)=>{
          console.log('异步请求失败!')
        })
        .addCase(loadData.fulfilled, (state, { payload }) => {
         state.list = payload.data.list;
        });
    }
});

export const { loadDataEnd } = movieSLice.actions;
export default movieSLice.reducer;