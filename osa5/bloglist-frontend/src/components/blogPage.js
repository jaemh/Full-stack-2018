import React from 'react';



const blogPage = ({ createBlog, username, changeFields, title, url, logout }) => {
    let changeField = (e) => {
        changeFields(e.target.value, e.target.name)
    }

  return (
    <div>
        <h2>Blogs</h2>
        <p>{username} logged in</p>
          <button onClick={logout} type='submit'>Logout</button>
            
            <h2> Create new blog: </h2>
                <form onSubmit={createBlog}>
                    <div>
                        <input 
                            type='text' 
                            value={title}
                            placeholder='Title' 
                            onChange={changeField} 
                            value={title}
                            name='title'
                            required
                          />
                    </div>
                    <div>
                        <input 
                            type='text' 
                            value={url}
                            placeholder='Url'
                            onChange={changeField}  
                            value={url}
                            name='url'
                            required
                             />
                    </div>
                    <button type='submit'>Save</button>
                </form>
    </div>
  )  
}

export default blogPage;