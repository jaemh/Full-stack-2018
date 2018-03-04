import React from 'react'
import actionFor from './actionCreator'


class AnecdoteForm extends React.Component {
    
    addAnecdote = (event) => {
        event.preventDefault();
        this.props.store.dispatch(
            actionFor.createAnecdote(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''
    }
    render() {
        return (
            <div>
                <h2>Create new anecdote</h2>
                <form onSubmit={this.addAnecdote}>
                    <input name="anecdote" />
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

class AnecdoteList extends React.Component {
    vote = (id) => () => {
        this.props.store.dispatch(
            actionFor.voteAnecdote(id)
        )
    }


    render() {
        return (
            <div>
                <h2>Anecdotes</h2>
                {this.props.store.getState().map(anecdote =>
                    <div>
                        <div>{anecdote.content} </div>
                         has {anecdote.votes}
                        <button onClick={this.vote(anecdote.id)}>vote</button>
                    </div>
                )}
                
                
                
            </div>
        )
    }
}

export { AnecdoteForm, AnecdoteList } ;
