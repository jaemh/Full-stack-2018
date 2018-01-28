import React, { Component } from 'react';

const Yhteensa = (props) => {
    return(
    <p> {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia}</p>
    )
}
 export default Yhteensa;

 