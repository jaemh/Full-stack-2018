import React from 'react';

const Button = (props) => {
    const funktio = (index) => {
        props.lisaa(index);
        props.pos(index);
        props.avg(index);
    }

    return(
        <button onClick={() => funktio(props.index)}>{props.label}</button>  
    )
}

export default Button;