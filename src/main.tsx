import ReactDOM from 'react-dom/client'
import 'reset-css';
import './less/index.less'
import './less/base.less'
import App from "./App";
import 'nprogress/nprogress.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)