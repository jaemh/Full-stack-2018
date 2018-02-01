import React from 'react';


const Contact = ({person}) => 
    <li>
        {person.name} {person.number}
        <button type="submit">Delete</button>
    </li>


export default Contact;
