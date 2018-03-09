import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './App'
import User from './components/User'
import Blog from './components/Blog';
import MainPage from './components/MainPage';
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation';
import EnsureLoggedIn from './components/EnsureLoggedIn'

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}></Route>
        <Route path="login" component={LoginForm}></Route>
            
        <Route component={EnsureLoggedIn}>
            <Route path="blogs" component={Blog}></Route>
            <Route path="main" component={MainPage}></Route>
            <Route path="users" component={Blog}></Route>
        </Route>
    </Router>,
document.getElementById('root'));
