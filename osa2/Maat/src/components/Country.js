import React from 'react';



const Country = ({country}) => {
    let style = {
        width: 200,
        heigh: 200,
    }

   return ( 
            <div>
                <h3>{country.name}</h3>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <img style={style} src={country.flag} alt="name"></img>
            </div>
         
        )
}   
     
	export default Country;