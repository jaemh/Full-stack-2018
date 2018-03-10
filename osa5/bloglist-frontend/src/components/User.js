import React from 'react'
import ExpandedUser from './ExpandedUser'
import blogService from './../services/blogs';
import Navigation from './Navigation'
import { Link } from 'react-router'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({user})
    }

    blogService.getAllUsers().then(users => {
     this.setState({users: users});
    })
  }   
  
  
    expandUser = (userToExpand) => {
      let foundUserIndex = this.state.users.findIndex(user => user.id === userToExpand.id); 
      if(this.state.expandedUserIndex === foundUserIndex){
        this.setState({expandedUserIndex: null});
      }else {
      this.setState({expandedUserIndex: foundUserIndex});
      }
    }
    
    render() {
        return (
          <div>
          <Navigation />
          <h2>Käyttäjät</h2>
              {this.state.users.map((user, index) => {
                if(index === this.state.expandedUserIndex){
                  return <ExpandedUser key={user.id} user={user} blog={user.blogs} removeExpandUser={this.expandUser.bind(this)} />
                }else {
                  return <div><Link to={"/blogs"}>{user.username}</Link></div>
                }
              })}
          </div>
        )  
      }
    }
  


export default User;