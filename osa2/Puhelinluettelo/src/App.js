import React from 'react';
import Contact from './Contact.js';
import contactService from './services/contactService';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            persons: [],
            search: '',
            message: ''
        }
    }

    componentWillMount() {
        contactService
            .getAll()
            .then(response => {
            this.setState({ persons: response.data });
        })
    } 
    
    updateSearch(event){
        this.setState({search: event.target.value});
    }

    deleteContact(personToDelete) {   
        let foundPersonIndex = this.state.persons.findIndex(person => person.id === personToDelete.id); 

        let reallyDeletePerson = window.confirm("Really delete person?");
        
        if(reallyDeletePerson) {
            contactService
            .deleteContact(personToDelete.id)
            .then(() => {
                let newPersons = this.state.persons;

                newPersons.splice(foundPersonIndex, 1);

                this.setState({
                    message: `Contact ${personToDelete.name} is removed`,
                    persons: newPersons
                });
                setTimeout(() => {
                    this.setState({message: null})
                  }, 5000)
            });
        }
    }

    addContact(event) {
        event.preventDefault();
        let name = this.refs.name.value;
        let number = this.refs.number.value;
        let saveToTheServer = {name, number};

        if(!number) {
            alert('Please add number!');
            return false;
        }
        
        let foundName = this.state.persons.findIndex(person => {
            return person.name.indexOf(name) !== -1;
        });

        if(foundName === -1) {
            contactService
                .create(saveToTheServer)
                .then(response => {
                this.setState({
                    message:`Contact ${name} has been added.`,
                    persons: this.state.persons.concat(response)})
                });
                setTimeout(() => {
                    this.setState({message: null})
                  }, 5000)
            
        } else {
            let changePersonsNumber = window.confirm(name + ' is already in puhelinluettelo, do you want to change the number?');

            if(changePersonsNumber) {
                let contact = this.state.persons[foundName];
                contact.number = number;

                contactService
                .updateContact(contact)
                .then(
                    //Kun promise onnistuu (onfulfilled)
                    (contactData) => {
                        let modifiedPersons = this.state.persons;
                        
                        modifiedPersons[foundName] = contactData;

                        this.setState({
                            message: 'Number has been changed.',
                            persons: modifiedPersons
                        });
                        setTimeout(() => {
                            this.setState({message: null})
                          }, 5000)
                    }, 
                    //Kun promise epäonnistuu (onrejected)
                    (reason) => {
                        window.alert('Failed to edit user by error code '+reason.response.status+ '. Someone else has probably deleted the contact.');
                    }
                );
            }
        }

        this.refs.name.value = '';
        this.refs.number.value = '';
        
    }
        

    render() {
        let filtered = this.state.persons.filter(person => 
        person.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
        
        return(
            <div>
               <div class='message'>{this.state.message}</div>
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
                  {filtered.map(person => <Contact onDelete={this.deleteContact.bind(this)} person={person} 
                   key={person.id}/>)}
                </ul>
            </div>
        )
    }
}

export default App;
