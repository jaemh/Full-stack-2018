import './style.css';

const ExpandedUser = ({ user })=>{

    const listOfBlogs = user.blogs.map(user => {
        return <div>
            <li>{user.title}</li> 
            <li>{user.url}</li> 
            <li>{user.likes}</li>
            <li>{user.author}</li> 
        </div>;
    });
    return(
        <div >
            <ul>
                <li className='user'>{listOfBlogs}</li>
            </ul>
        </div>
    );
};

export default ExpandedUser;