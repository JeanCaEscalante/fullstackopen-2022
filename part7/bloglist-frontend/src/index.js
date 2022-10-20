import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App'

import CssBaseline from '@mui/material/CssBaseline';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render( <Provider store={store}><CssBaseline /><App /></Provider>)
