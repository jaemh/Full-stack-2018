import React from 'react';
import { Link } from 'react-router';


export default class Navigation extends React.Component {

    render(){
        return(
            <ul className='navi'>
                <li><Link to={"/main"}>Home</Link></li>
                <li><Link to={"/users"}>User</Link></li>
                <li><Link to={"/blogs"}>Blogs</Link></li>
                
            </ul>
        )
    }
}
