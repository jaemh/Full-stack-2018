import React from 'react'
import ExpandedBlog from './ExpandedBlog'
import blogService from './../services/blogs';
import Navigation from './Navigation';

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      comment: [],
      newComment: null
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

 /*showDeleteButton = () => {
   this.state.blogs.map(blog => {
    return !blog.user || blog.user.username === user.username;
   })
  }
 */
  
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

   addCommentToBlog = async (blog) => {
      let newComment = await blogService.createComments(blog, this.state.newComment);
      if(newComment) {
        let comment = this.state.comment;
        comment.push(newComment);
    
        this.setState({comment});
      }
  }

  changeComment = (event) => {
    event.preventDefault();
    this.setState({comment: event.target.value});
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
                    <div onClick={() => this.expandBlog(blog)}>{blog.title}
                      <button onClick={() => this.deleteBlog(blog)} type="submit" >Delete</button>
                  </div>
                </div>
                  )
                } else {
                   return <ExpandedBlog blog={blog} changeComment={this.changeComment} comment={() => this.addCommentToBlog(blog)} likeBlog={this.likeBlog.bind(this)} removeExpand={this.expandBlog.bind(this)} />
                }
              })
            }
      </div>
    )}
}

export default Blog;