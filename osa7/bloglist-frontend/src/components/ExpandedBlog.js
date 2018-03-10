import './style.css';



const ExpandedBlog = ({blog, removeExpand, likeBlog}) => {
    let closeOnClick = (e) => {
        e.preventDefault();
        removeExpand(blog);
    };

    let likeBlogClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        likeBlog(blog);
    };
 

    return(
        <div>
            <ul onClick={closeOnClick}>
                <li>{blog.title}</li>
                <li>{blog.url}</li>
                <li>Likes: {blog.likes}</li>
                <li><button onClick={likeBlogClick}>Like</button></li>
            </ul>
            <div> comments </div>
            <input type='text'/>
            <button >Add</button>

        
        </div>
    );
};

export default ExpandedBlog;