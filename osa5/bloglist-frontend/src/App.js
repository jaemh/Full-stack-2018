import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './services/Notification';
import LoginForm from './components/loginFrom';
import BlogPage from './components/blogPage';
import ExpandedBlog from './components/ExpandedBlog';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      newBlog: {
        title: '',
        url: ''
      },
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      let sortedBlogs = blogs.sort((a, b) => { 
        return a.likes < b.likes;
      });
      this.setState({ blogs: sortedBlogs });
    })
  

    const loggedUser = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({user})
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
    } catch(exeption) {
      this.setState({
        error: 'Username or password is incorect'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000);
    } 
  }

  async deleteBlog(blogToDelete) {   
    let deleteBlogMessage = window.confirm("Are you sure you want to delete blog?");
    
    if(deleteBlogMessage) {
        let foundBlogIndex = this.state.blogs.findIndex(blog => blogToDelete.id === blog.id);

        let deleted = await blogService
        .deleteBlog(blogToDelete.id)
          
        if(deleted) {
          let blogs = this.state.blogs;

          blogs.splice(foundBlogIndex, 1);

          this.setState({
              errorMessage: `Contact ${blogToDelete.title} is removed`,
              blogs
          });
        } else {
          this.setState({ errorMessage: 'Error while deleting blog'})
        }
        
        setTimeout(() => {
            this.setState({errorMessage: null})
        }, 5000);
        
    }
}

logOutFromBlog = async (event) => {
  event.preventDefault();
  let user = window.localStorage.getItem('loggedBlogAppUser');
  if(user) {
    window.localStorage.removeItem('loggedBlogAppUser');
    this.setState({ error: 'You logged out', user: null });
  }    
}
  


  /* changeLoginFields = (event) => {
    if(event.target.name === 'username'){
      this.setState({name: event.target.value});
    } else if ( event.target.name === 'password' ){
      this.setState({ password: event.target.value });
    }
  }
  */

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
}

changeFields = (value, field) => {
  var newBlog = this.state.newBlog;
  
  newBlog[field] = value;

  this.setState({ 
    newBlog
  })
}
  changeUsername = (event) => {
    this.setState({username: event.target.value});
  }

  changePasswors = (event) => {
    this.setState({password: event.target.value});
  }

  toggleLoginForm = () => {
    this.setState({showLoginForm: !this.state.showLoginForm});
  }

  expandBlog = (blogToExpand) => {
    let foundBlogIndex = this.state.blogs.findIndex(blog => blog.id === blogToExpand.id); 
    if(this.state.expandedBlogIndex === foundBlogIndex){
      this.setState({expandedBlogIndex: null});
    }else {
    this.setState({expandedBlogIndex: foundBlogIndex});
    }
    
  }

  likeBlog = async (blogToLike) => {
    let blogs = this.state.blogs;
    let foundBlogIndex = blogs.findIndex(blog => blog.id === blogToLike.id);
    

    blogToLike.likes++;
    let liked = await blogService.update(blogToLike.id, blogToLike);

    if(liked) {
      blogs[foundBlogIndex] = blogToLike;
      this.setState({blogs});
    } else {
      this.setState({error: 'Liking blog failed'});
    }
  }

  render() {

    const loginForm = () => {
      const showForm = this.state.showLoginForm;

      return(
        showForm ?
          <div>
            <div>
              <LoginForm
                username={this.state.username}
                password={this.state.password}
                changePasswors={this.changePasswors}
                changeUsername={this.changeUsername}
                createBlog={this.createNewBlog}
                login={this.login}
              />
              <button onClick={this.toggleLoginForm}>cancel</button> 
            </div>
          </div>
        :
          <div>
            <button onClick={this.toggleLoginForm}>log in</button>
          </div>
      )}

    const loginBlog = () => (
      <BlogPage 
        createBlog={this.createNewBlog.bind(this)}
        username={this.state.user ? this.state.user.username : null}
        title={this.state.newBlog.title}
        url={this.state.newBlog.url}
        logout={this.logOutFromBlog}
        changeFields={this.changeFields}
      />
    )
  
    return (
      <div>
        <Notification errorMessage ={this.state.error} />
        
        {this.state.user === null ? 
          loginForm() :
          
          <div> 
            {
              this.state.blogs.map((blog, index)  => {
                if(index === this.state.expandedBlogIndex){
                  return <ExpandedBlog blog={blog} likeBlog={this.likeBlog.bind(this)} removeExpand={this.expandBlog.bind(this)} />
                }else {
                  return <Blog key={blog.id} user={this.state.user} blog={blog} expand={this.expandBlog.bind(this)} onDelete={this.deleteBlog.bind(this)}/>
                }
              })
            }
            {loginBlog()}
          </div>
        }
  </div>
  )
  }  
}

export default App;
