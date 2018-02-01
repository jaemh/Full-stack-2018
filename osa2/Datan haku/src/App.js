import React from 'react';
import { render } from 'react-dom';

const Person = ({person}) => {
  return(
    <div>
      <p>{person.name} {person.number}</p>
      <p>{person.newName} {person.newNumber}</p>
     
      
    </div>

  )
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '0000' }
      ],
      newName: '',
      newNumber: '',

    }
  }

  addPerson = (props) => {    
    props.preventDefault()  
        
        const personObject = {
          newName: this.state.newName,
          newNumber: this.state.newNumber
        }
      
        const persons = this.state.persons.concat(personObject)
      
      
      this.setState({persons,
      newName: '',
      newNumber: ''})  
  
  }
  


  handleNameChange = (e) => {
    this.setState({newName: e.target.value})
  }

  handleNumberChange = (e) => {
    this.setState({newNumber: e.target.value})
  }
  
  render() {
    return (
      <div>
        <h2> Puhelinluettelo: </h2>
        <form onSubmit={this.addPerson}>
          <div>
           Nimi: <input 
            value={this.state.newName}
            onChange={this.handleNameChange} />
          </div>
           <div> 
           Numero: <input 
            value={this.state.newNumber}
            onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type='submit'>Lisää</button>
          </div>
        </form> 
        <h3> Numerot </h3>
          {this.state.persons.map(person => <Person key={person.id} person={person}/>)}
      </div>
    );
  }
}

export default App
