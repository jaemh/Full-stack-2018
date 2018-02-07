import React from 'react';

const Countries = ({countries, click, country}) => {
	let showCountry = () => {
	   click(country);
	} 

	return (
	 <div>
	   <p style={{cursor:'pointer'}} onClick={showCountry}>{countries.name}</p>
         </div>
	);
}

export default Countries;