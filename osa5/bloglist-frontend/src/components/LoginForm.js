import React from 'react';
import loginService from './../services/login'
import { browserHistory } from 'react-router';

class LoginForm extends React.Component {
   constructor(props){
       super(props);
       this.state = {
        showLoginForm: null,
        username: '',
        password: '',
        user: null,
       }
   }


 login = async (event) => {
    event.preventDefault();
 
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user});
      browserHistory.replace("/main");
    } catch(exeption) {
      this.setState({
        error: 'Username or password is incorect'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000);
    } 
  }

  changeUsername = (event) => {
    this.setState({username: event.target.value});
    }

changePasswors = (event) => {
    this.setState({password: event.target.value});
    }

   form = () => {
    return (
        <div>
          <h2>Log in to application</h2>
            <form onSubmit={this.login.bind(this)}>
                <div>
                    Username:
                    <input 
                        type='text' 
                        name='username'
                        value={this.state.username}
                        onChange={this.changeUsername}/>
                </div>
                <div> Password:
                <input 
                    type='password' 
                    name='password'
                    value={this.state.password}
                    onChange={this.changePasswors}/>
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )}
    

    toggleLoginForm = () => {
         this.setState({showLoginForm: !this.state.showLoginForm});
        }

    render() {
        
        const showForm = this.state.showLoginForm;
            
            return(
                showForm ?
                    <div>
                        <div>
                            <div>{this.form()}</div>
                            
                            <button onClick={this.toggleLoginForm}>cancel</button> 
                        </div>
                    </div>
                    :
                        <div>
                            <button onClick={this.toggleLoginForm}>log in</button>
                        </div>
            )
        
        
    }
}

export default LoginForm;