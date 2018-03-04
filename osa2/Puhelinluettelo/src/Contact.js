import React from 'react';


const Contact = ({person, onDelete}) => {
    let deleteContact = () => {
        onDelete(person);
    }
    return 
    <li>
        {person.name} {person.number}
        <button onClick={deleteContact} type="submit" >Delete</button>
    </li>
}

export default Contact;
