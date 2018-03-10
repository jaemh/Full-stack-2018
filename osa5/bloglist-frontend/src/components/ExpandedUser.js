import React from 'react';

const ExpandedUser= ({user, removeExpandUser }) => {
    
    let closeUserOnClick = (e) => {
        e.preventDefault();
        removeExpandUser(user);
    }
   
    return(
        <div >
           <ul onClick={closeUserOnClick}>
                <h2>Added blogs</h2>
                <li>{user.username}</li>
                <li>{user.blogs.title}</li>
                <li>{user.blogs.url}</li>
                <li>{user.blogs.author}</li>
            </ul>
        </div>
    )
}




export default ExpandedUser;