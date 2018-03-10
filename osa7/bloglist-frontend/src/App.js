import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }


    render() {
      
        return (
          
            <div>
                {this.props.children}
                <Notification errorMessage ={this.state.error} />
                
                { this.state.user === null ? 
                    <LoginForm /> :
                    <div>
                        <MainPage />
                      
                    </div>
                }
            </div>
        );
    }  
}



export default App;
