import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Otsikko from './Components/Otsikko';
import Sisalto from './Components/Sisalto';
import Yhteensa from './Components/Yhteensa';


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

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
