import './styles/portfolio.css'
import './styles/menu-anim.css'
import './styles/enhance.css'
import './styles/stack.css'
import './styles/work-shots.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { boot } from './lib/enhance'
import './lib/menu-anim'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

boot()
