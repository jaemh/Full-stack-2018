import React from 'react';
import ReactDOM from 'react-dom'



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

const Statistic = (props) => {
    return (
        <p>{props.name}: {props.value} </p>
    )
}

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


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            statistiikka: {
                lista: [
                    {
                        nimi: 'Hyvä', 
                        arvo: 0
                    },
                    {
                        nimi: 'Neutraali',
                        arvo: 0
                    },
                    {
                        nimi: 'Huono',
                        arvo: 0
                    },
                    {
                        nimi: 'Keskiarvo',
                        arvo: 0
                    },
                    {
                        nimi: 'Positiivisia',
                        arvo: 0
                    }
                
                ],
             }
        }
    }

    
    lisaaArvoon = (index) => {
        let newStatistics = this.state.statistiikka;
        newStatistics.lista[index].arvo += 1;

        this.setState({
            statistiikka: newStatistics
        });
    }

    positive = () => {
        let newStatistics = this.state.statistiikka;
        
        let hyva = newStatistics.lista[0].arvo;
        let neutraali = newStatistics.lista[1].arvo;
        let huono = newStatistics.lista[2].arvo;

        newStatistics.lista[4].arvo = (hyva / (hyva + neutraali + huono) * 100);

       this.setState({
            statistiikka: newStatistics
        });
    }
    
   average = () => {
       let newStatistics = this.state.statistiikka;
       let hyva = newStatistics.lista[0].arvo;
       let neutraali = newStatistics.lista[1].arvo;
       let huono = newStatistics.lista[2].arvo;
       let kaikki = hyva + huono + neutraali;

       newStatistics.lista[3].arvo = ((hyva + (huono * (-1)))/kaikki);

       this.setState({
        statistiikka: newStatistics
        });

   }  


    render() {

        return (
            <div>
                <h2>Anna palautetta</h2>
                <Button lisaa={this.lisaaArvoon} pos={this.positive} avg={this.average} index="0" label="Hyvä"/>
                <Button lisaa={this.lisaaArvoon} pos={this.positive} avg={this.average} index="1" label="Neutraali"/>
                <Button lisaa={this.lisaaArvoon} pos={this.positive} avg={this.average} index="2" label="Huono"/>
                <Statistics state={this.state}/>
            </div>
        );
            
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));