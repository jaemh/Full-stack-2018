import React from 'react';
import Statistic from './Statistic';

const Statistics = (props) => {
    let rows = props.state.statistiikka.lista[0,1,2,3,4].arvo > 0 ? 
        <div>
            <Statistic name={props.state.statistiikka.lista[0].nimi} value={props.state.statistiikka.lista[0].arvo} />
            <Statistic name={props.state.statistiikka.lista[1].nimi} value={props.state.statistiikka.lista[1].arvo} />
            <Statistic name={props.state.statistiikka.lista[2].nimi} value={props.state.statistiikka.lista[2].arvo} />
            <Statistic name={props.state.statistiikka.lista[3].nimi} value={(props.state.statistiikka.lista[3].arvo).toFixed(1)} />
            <Statistic name={props.state.statistiikka.lista[4].nimi} value={Math.round(props.state.statistiikka.lista[4].arvo * 100 / 100).toFixed(1) + "%"} />
        </div>
        : "Ei yhtään palautetta annettu";

    return(
        <div>
            <h2>Statistiikka</h2>
            {rows}
        </div>
    )
}

export default Statistics;