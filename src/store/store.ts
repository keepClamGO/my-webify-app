import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// 导入子reducer
import counterSlice from './features/counterSlice'
import movieSlice  from './features/movieSlice'
export const store = configureStore({
  // 合并子reducer
  reducer: {
    counter: counterSlice,
    movie: movieSlice,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;