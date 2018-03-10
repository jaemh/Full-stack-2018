import React from 'react';

class EnsureLoggedIn extends React.Component {
    componentDidMount() {
        const { router } = this.props;
  
        let isLoggedIn = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));

        if (!isLoggedIn) {
            router.push('/login');
        }
    }
  
    render() {
        let isLoggedIn = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));
        
        if (isLoggedIn) {
            if(this.props.children) {
                return this.props.children;
            }
            this.props.router.push('/users');
        } else {
            return null;
        }
    }
}

export default EnsureLoggedIn;