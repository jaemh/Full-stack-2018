import React from 'react';
import { actionForm } from './../reducers/anecdoteReducer';

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.store.dispatch(
      actionForm.createAnecdote(e.target.anecdote.value)
    )
    e.target.anecdote.value = ''
  }

   render() {
     return (
       <div>
      <h2>Create new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button type="submit">create</button> 
        </form>
      </div>
     )
   }
}

export default AnecdoteForm;
