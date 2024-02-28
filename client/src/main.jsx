import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {AuthProvider} from './utils/Auth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    <ToastContainer />
  </HashRouter>,
  </React.StrictMode>,
)
