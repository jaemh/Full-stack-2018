import React from 'react';

const Text = (props) => {
    return (
        <div>
            <p>{props.anecdote.text}</p>
            <p>has {props.anecdote.votes} votes</p>
            
        </div>
    )
}

export default Text;