import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

import 'normalize.css';
import './styles/basic.css';

ReactDOM.render(
    <App />, 
    document.getElementById('app') as HTMLElement
)