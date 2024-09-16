import { createRoot } from 'react-dom/client'
import { store } from './redux/store.js'
import {Provider} from "react-redux"

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
