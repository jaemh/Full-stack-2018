import React from 'react'


    const Kurssi = ({kurssi}) => {
        return (
            <div>
                <h2>{kurssi.nimi}</h2>
                <Sisalto sisalto={kurssi.osat}/>
                <Yhteensa yhteensa={kurssi.osat}/>
            </div>
        )
    }


    const Sisalto = ({sisalto}) =>{
        return(
            <ul>
                {sisalto.map(osat => <li key={osat.id}>{osat.nimi}: {osat.tehtavia}</li>)}
            </ul>
        )
    }

    const Yhteensa = ({yhteensa}) => {
        return(
            <ul>
                <li>
                    {
                        yhteensa.reduce((summa, tehtava) => {
                            return summa + tehtava.tehtavia;
                        }, 0)
                    }
                </li>
            </ul>
        )

    }


export default Kurssi
