import React from 'react';

const LoginForm = (props) => {
    return (
        <div>
          <h2>Log in to application</h2>
            <form onSubmit={props.login}>
                <div>
                    Username:
                    <input 
                        type='text' 
                        name='username'
                        value={props.username}
                        onChange={props.changeUsername}/>
                </div>
                <div> Password:
                <input 
                    type='password' 
                    name='password'
                    value={props.password}
                    onChange={props.changePasswors}/>
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )}

    export default LoginForm;