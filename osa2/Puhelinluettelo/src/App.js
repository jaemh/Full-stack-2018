import React from 'react';
import Contact from './Contact.js';
import contactService from './services/contactService';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            persons: [],
            search: ''
        }
    }

    componentWillMount() {
        contactService
            .getAll()
            .then(response => {
            this.setState({ persons: response.data })
        })
    } 
    
    updateSearch(event){
        this.setState({search: event.target.value});
    }

   /* deleteContact(n){}*/

    

    addContact(event) {
        event.preventDefault();
        let name = this.refs.name.value;
        let number = this.refs.number.value;
        let saveToTheServer = {name, number};
        
        contactService
            .create(saveToTheServer)
            .then(response => {
            this.setState({
                persons: this.state.persons.concat(response)})
            })
        
            this.refs.name.value = '';
            this.refs.number.value = '';
    }

    render() {
        let filtered = this.state.persons.filter(person => 
        person.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
        
        return(
            <div>
               <h2>Puhelinluettelo</h2>
                <input type='text'
                    placeholder = 'Search' 
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}/>
                <form onSubmit={this.addContact.bind(this)}>
                <div>
                    <input type='text' ref='name' placeholder = 'Name' />
                </div>
                <div>
                    <input type='text' ref='number' placeholder = 'Phone' />
                </div>
                <button type='submit'>Add</button>
                </form>
                <ul>
                  {filtered.map(person => <Contact person={person} 
                   key={person.id}/>)}
                </ul>
            </div>
        )
    }
}

export default App;
