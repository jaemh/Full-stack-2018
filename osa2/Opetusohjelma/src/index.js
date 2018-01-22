import React from 'react'
import ReactDOM, { render } from 'react-dom'


    const App = () => {
        const kurssi =[
        {
            nimi: 'Half Stack -sovelluskehitys',
            id: 1,
            osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            },
            {
                nimi: 'Redux',
                tehtavia: 7
            }
            ]
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
            {
                nimi: 'Routing',
                tehtavia: 3,
                id: 1
            },
            {
                nimi: 'Middlewaret',
                tehtavia: 7,
                id: 2
            }
            ]
        }
        ]

    


   
    const Kurssi = ({kurssi}) => {
        return (
            <div>
                <h2> {kurssi[1].nimi}</h2>
                <p>  {kurssi[1].osat[0].nimi} {kurssi[1].osat[0].tehtavia}</p>
                <p>  {kurssi[1].osat[1].nimi} {kurssi[1].osat[1].tehtavia}</p>
                <p>  yhteensa {kurssi[1].osat[0].tehtavia + kurssi[1].osat[1].tehtavia} tehtavää</p>
            </div>
        )
     }

     const Otsikko = ({otsikko}) => {
         return(
            <h2> {kurssi[0].nimi}</h2>
         )
     }

     const Sisalto = ({sisalto}) =>{
         return(
             <div>
                <p>{kurssi[0].osat[0].nimi} {kurssi[0].osat[0].tehtavia}</p>
                <p>{kurssi[0].osat[1].nimi} {kurssi[0].osat[1].tehtavia}</p>
                <p>{kurssi[0].osat[2].nimi} {kurssi[0].osat[2].tehtavia}</p>
                <p>{kurssi[0].osat[3].nimi} {kurssi[0].osat[3].tehtavia}</p>

             </div>
         )
     }

  
    return (
      <div>
        <Otsikko otsikko={kurssi}/>
        <Sisalto sisalto={kurssi}/>
        <Kurssi kurssi={kurssi}/>
        
      </div>
    )
  }



  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )