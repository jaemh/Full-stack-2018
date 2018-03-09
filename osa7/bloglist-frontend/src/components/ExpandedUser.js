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
                <li>{user.blogs[0].title}</li>
                <li>{user.blogs[0].url}</li>
                <li>{user.blogs[0].author}</li>
            </ul>
        </div>
    )
}




export default ExpandedUser;