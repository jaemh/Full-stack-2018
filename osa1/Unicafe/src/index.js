import React from 'react';
import ReactDOM from 'react-dom';


const Button = (props) => {
    const funktio = (index) => {
        props.lisaa(index);
        props.pos(index);
        props.avg(index);
    }

    return(
        <div>
            <h2>Anna palautetta</h2>
            <button onClick={() => funktio(0)}>Hyvä</button>  
            <button onClick={() => funktio(1)}>Neutraali</button>
            <button onClick={() => funktio(2)}>Huono</button>
        </div>  
    )
}


class Nimi extends React.Component {
    
    render()  { 
            return(
            
        <div>
            <h2>Statistiikka</h2>
            <p>{this.props.lista[0].nimi}: {this.props.lista[0].arvo}</p>        
            <p>{this.props.lista[1].nimi}: {this.props.lista[1].arvo}</p>
            <p>{this.props.lista[2].nimi}: {this.props.lista[2].arvo}</p>
            <p>{this.props.lista[3].nimi}: {(this.props.lista[3].arvo).toFixed(1)}</p>
            <p>{this.props.lista[4].nimi}: {Math.round(this.props.lista[4].arvo * 100 / 100).toFixed(1)} {'%'}</p>
       
        </div>);
    }
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
                <Button lisaa={this.lisaaArvoon} pos={this.positive} avg={this.average}/>
                <Nimi lista={this.state.statistiikka.lista}/>
            </div>
        );
    }

}

ReactDOM.render(<App/>, document.getElementById('root'));