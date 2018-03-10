import React from 'react'
import ExpandedBlog from './ExpandedBlog'
import blogService from './../services/blogs';
import Navigation from './Navigation';
import { Link } from 'react-router'
import './style.css'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs:[],
      newBlog: {
        title: '',
        url: '',
        author: '',
        likes: 0
      }
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      let sortedBlogs = blogs.sort((a, b) => { 
        return a.likes < b.likes;
      });
      this.setState({ blogs: sortedBlogs });
    })
  }



 deleteBlog = (blogToDelete) => {   
  let deleteBlogMessage = window.confirm("Are you sure you want to delete blog?");
  
  if(deleteBlogMessage) {
      let foundBlogIndex = this.state.blogs.findIndex(blog => blogToDelete.id === blog.id);

      let deleted =  blogService
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
 
  
 expandBlog = (blogToExpand) => {
    let foundBlogIndex = this.state.blogs.findIndex(blog => blog.id === blogToExpand.id); 
    if (this.state.expandedBlogIndex === foundBlogIndex){
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
    return (
      <div>
        <Navigation />
        <h2> KAIKKI BLOGIT </h2>

            {this.state.blogs.map((blog, index)  => {
                if(index !== this.state.expandedBlogIndex) {
                  return(
                  <div>
                    <Link to={'/blogs' + '/' + blog.id}  onClick={() => this.expandBlog(blog)}>{blog.title}
                      <button onClick={() => this.deleteBlog(blog)} type="submit" >Delete</button>
                  </Link>
                </div>
                  )
                } else {
                   return <ExpandedBlog 
                      key={blog.id} blog={blog} 
                      likeBlog={this.likeBlog.bind(this)} 
                      removeExpand={this.expandBlog.bind(this)} />
                }
              })
            }
      </div>
    )}
}

export default Blog;