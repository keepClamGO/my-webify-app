import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// 导入子reducer
import loginSlice from './features/loginSlice'
export const store = configureStore({
  // 合并子reducer
  reducer: {
    login: loginSlice
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
