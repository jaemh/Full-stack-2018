import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import App from './App'
import User from './components/User'
import Blog from './components/Blog';
import MainPage from './components/MainPage';
import LoginForm from './components/LoginForm';
import EnsureLoggedIn from './components/EnsureLoggedIn'

ReactDOM.render(
    <Router path='/' history={browserHistory}>
      <Route path="/" component={App}></Route>
        <Route path="login" component={LoginForm}></Route>
            
        <Route component={EnsureLoggedIn}>
            <Route path="main" component={MainPage}></Route>
            <Route path="blogs" component={Blog}></Route>
            <Route path="users" component={User}></Route>
        </Route>
    </Router>,
document.getElementById('root'));
