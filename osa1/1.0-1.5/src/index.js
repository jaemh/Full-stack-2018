import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const App = () => {

    const kurssi = {
        nimi: 'Half Stack -sovelluskehys',
        osat: [ 
            {
                nimi: 'Reactin pesuteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    const Otsikko = (props) => {
        return(
            <div>
            <p> {props.kurssi} </p>
            </div>
        )
    }

    const Sisalto = (props) => {
        return(
            <div>
                <p> {props.osat[0].nimi}</p>
                <p> {props.osat[1].nimi}</p>
                <p> {props.osat[2].nimi}</p>
            </div>
        )
    }

    const Yhteensa = (props) => {
        return(
        <p> {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia}</p>
        )
    }

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
