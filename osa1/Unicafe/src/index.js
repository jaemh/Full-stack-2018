import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Components/Button';
import Statistics from './Components/Statistics';


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