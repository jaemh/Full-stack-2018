import React from 'react'
import Notification from './services/Notification';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';

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
                
              </div>
            }
          </div>
        )
    }  
}



export default App;
