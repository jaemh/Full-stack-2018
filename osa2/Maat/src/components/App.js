import React from 'react';
import axios from 'axios';
import Countries from './Countries'
import Country from './Country'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        maat: [],
        search: ''
        }
    }

    componentWillMount() {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            this.setState({maat: response.data
            })
        })    
    }

    updateSearch(event) {
        this.setState({search: event.target.value})
    }

    filter() {
        let filtered = this.state.maat.filter(filter => 
            filter.name.indexOf(this.state.search) !== -1)
            
        if(filtered.length > 10) return <div>too many maches, specify another filter</div>;
        if(filtered.length === 1) return <div>{filtered.map(country => <Country country={country} key={country.name}/>)}</div>; 
        
        return <div>{filtered.map(countries => <Countries click={this.showCountry.bind(this)} countries={countries} key={countries.name}/>)}</div>    
    }

    showCountry(showCountryClick){
        let foundCountry= this.state.maat.some(country => country.name === showCountryClick.name)
        
        if(foundCountry) {
            return <div>{country => <Country country={country} key={country.name}/>}</div>;       
        }
    }
   

    render() {
        return(
            <div>
              Find countries: <input 
                type="text" 
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}/>
              <div>{this.filter()}</div>
            </div>
        )
        
    }
}

export default App;
