import ReactDOM from 'react-dom/client'
import 'reset-css';
import './less/index.less'
import './less/base.less'
import moment from 'moment';
import App from "./App";
import { useRoutes, BrowserRouter as Router} from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'
moment.locale('zh-cn')
// import { extendMoment } from 'moment-range';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)