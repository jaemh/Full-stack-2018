import React from 'react';

class EnsureLoggedIn extends React.Component {
    componentDidMount() {
      const { dispatch, currentURL, router } = this.props
  
      let isLoggedIn = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));

      if (!isLoggedIn) {
        router.push('/login');
      }
    }
  
    render() {
        let isLoggedIn = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));
        
        if (isLoggedIn) {
            console.log(this.props)
            if(this.props.children) {
                return this.props.children
            }
            this.props.router.push('/users');
        } else {
            return null
        }
    }
}

  export default EnsureLoggedIn;