import ReactDOM from 'react-dom/client'
import 'reset-css';
import './less/index.less'
import './less/base.less'
import '@ant-design/flowchart/dist/index.css'
import moment from 'moment';
import App from "./App";
import { useRoutes, BrowserRouter as Router, Route, Navigate } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'
moment.locale('zh-cn')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)