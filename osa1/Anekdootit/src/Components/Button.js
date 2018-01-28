import React from 'react'

const Button = (props) => {
    const funktio = () => {
        props.add();
    }

    return(
        <div>
            <button onClick={() => props.press()}>Next anecdote</button>
            <button onClick={() => funktio()}>Vote</button>
        </div>
    )
}

export default Button;
