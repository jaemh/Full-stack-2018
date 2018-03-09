import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './services/Notification';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
import User from './components/User';
import ExpandedUser from './components/ExpandedUser'
import ExpandedBlog from './components/ExpandedBlog';
import Blog from './components/Blog'
import Navigation from './components/Navigation'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      newBlog: {
        title: '',
        url: '',
        author: '',
        comment: ''
      },
      error: null
    }
  }


    render() {
      
        return (
          
          <div>
            {this.props.children}
            <Notification errorMessage ={this.state.error} />
            
            { this.state.user === null ? 
              <LoginForm /> :
              <div>
                <MainPage />} 
                <User />
              </div>
            }
          </div>
        )
    }  
}



export default App;
