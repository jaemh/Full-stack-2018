import React, { Component } from 'react';

const Sisalto = (props) => {
    return(
        <div>
            <p> {props.osat[0].nimi}: {props.osat[0].tehtavia}</p>
            <p> {props.osat[1].nimi}: {props.osat[1].tehtavia}</p>
            <p> {props.osat[2].nimi}: {props.osat[2].tehtavia}</p>
        </div>
    )
}
 export default Sisalto;