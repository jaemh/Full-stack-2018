import React from 'react';
import { Link } from 'react-router';
import './style.css';

export default class Navigation extends React.Component {

    render(){
        return(
            <ul className='navi'>
                {this.props.children}
                <li className ='navia'><Link to={'/main'}>Home</Link></li>
                <li className ='navia'><Link to={'/users'}>User</Link></li>
                <li className ='navia'><Link to={'/blogs'}>Blogs</Link></li>
            </ul>
        );
    }
}
