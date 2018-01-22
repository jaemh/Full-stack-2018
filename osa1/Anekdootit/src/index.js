import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        selected: 0,
        votes: 0,
        
        }
    }

    valitse = () => {

        let randomAnecdote = Math.floor(Math.random() * this.props.anecdotes.length);
        
        this.setState({
        selected: randomAnecdote
        });
    }

    addVote = () => {
        let newVote = this.state.selected;
        this.props.anecdotes[newVote].votes++;

        this.setState({
            votes: newVote
        })
    }

    mostVote = (props) => {
        let list = this.state.selected;
        Math.max(this.props.anecdotes[list].votes)
    
        this.setState({
        votes: list
        })
    }
    
    render() {

        return (
        <div>
            <Text anecdote={this.props.anecdotes[this.state.selected]} />
            <Button press={this.valitse} add={this.addVote} anecdote={this.props.anecdotes[this.state.selected]} toinen={this.mostVote}/>
        </div>
        )
    }
}   

    const Button = (props) => {
        const funktio = () => {
            props.add();
            
        }

        const toinen = () => {
            props.mostVote();
           }

        return(
            <div>
                <button onClick={() => props.press()}>Next anecdote</button>
                <button onClick={() => funktio()}>Vote</button>
                <h2>Anecdote with most vote:</h2>
                <p>{toinen}</p>
            </div>
        )
    }

    const Text = (props) => {
        
        return (
            <div>
                <p>{props.anecdote.text}</p>
                <p>has {props.anecdote.votes} votes</p>
                <p>has {} votes</p>
            </div>
        )
    }
    

    const anecdotes =  [
        {
            text: 'If it hurts, do it more often',
            votes: 0,
            
        },
        {
            text: 'Adding manpower to a late software project makes it later!',
            votes: 0,
            
        },
        {
            text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            votes: 0,
            
        },
        {
            text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            votes: 0
        },
        {
            text: 'Premature optimization is the root of all evil.',
            votes: 0
        },
        {
            text:  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
            votes: 0
        }
    ]


    ReactDOM.render(
        <App anecdotes={anecdotes} />,
        document.getElementById('root')
    )