import React from 'react';
import { AnecdoteForm, AnecdoteList } from './Anecdote'

class App extends React.Component {
  render() {
    return (
      <div>
        <AnecdoteForm store={this.props.store} />
        <AnecdoteList store={this.props.store} />
      </div>
    )
  }
}

export default App;