import React from 'react';
import blogService from './../services/blogs'
import Navigation from './Navigation'

class MainPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          blogs: [],
          newBlog: {
            title: '',
            url: '',
            author: '',
            comment: ''
          },
          error: null
        }
      }


    createNewBlog = async(e) => {
        e.preventDefault();
        if(this.state.newBlog.title && this.state.newBlog.url) {
          let newBlog = await blogService.create(this.state.newBlog);
          if(newBlog) {
            let blogs = this.state.blogs;
            blogs.push(newBlog);
        
            this.setState({blogs});
          }
        }
        this.state.blogs.title = '';
        this.state.blogs.url = '';
      }

      logOutFromBlog = async (event) => {
        event.preventDefault();
        let user = window.localStorage.getItem('loggedBlogAppUser');
        if(user) {
          window.localStorage.removeItem('loggedBlogAppUser');
          this.props.router.push('/login');
        }    
      }
        
      
      changeFields = (value, field) => {
        var newBlog = this.state.newBlog;
        
        newBlog[field] = value;
      
        this.setState({ 
          newBlog
        })
      }
      
      changeTitle = (event) => {
        event.preventDefault();
        this.setState({title: event.target.value});
        }
    
      changeUrl = (event) => {
        event.preventDefault();
        this.setState({url: event.target.value});
        }
    

    render(){
        return (
            <div>
                <Navigation />
                <h2>Blogs</h2>
                <p>{this.state.username} logged in</p>
                <button onClick={this.logOutFromBlog} type='submit'>Logout</button>
                    
                    <h2> Create new blog: </h2>
                      
                        <form onSubmit={this.createNewBlog}>
                            <div>
                                <input 
                                    type='text' 
                                    placeholder='Title' 
                                    onChange={this.changeTitle.bind(this)} 
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type='text'
                                    placeholder='Url'
                                    onChange={this.changeUrl.bind(this)}  
                                    required
                                    />
                            </div>
                            <button type='submit'>Save</button>
                        </form>
                        
                </div>
        )  
    }
    
}

export default MainPage;