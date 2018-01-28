import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Components/Button';
import Text from './Components/Text';

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

    mostVoted = (props) => {
        let mostVotedAnecdote;

        this.props.anecdotes.forEach((anecdote => {
            if(mostVotedAnecdote) {
                mostVotedAnecdote = (anecdote.votes > mostVotedAnecdote.votes) ? anecdote : mostVotedAnecdote;
            } else {
                mostVotedAnecdote = anecdote;
            }        
        }));
    
        return mostVotedAnecdote ? mostVotedAnecdote.text  + 'Votes: ' + mostVotedAnecdote.votes  : ""
    }
    
    render() {

        return (
        <div>
            <Text anecdote={this.props.anecdotes[this.state.selected]} />
            <Button press={this.valitse} add={this.addVote} anecdote={this.props.anecdotes[this.state.selected]}/>
            <h2>Anecdote with most vote:</h2>
            <p>{this.mostVoted()}</p>
        </div>
        )
    }
}   

    const anecdotes =  [
        {
            text: 'If it hurts, do it more often.',
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