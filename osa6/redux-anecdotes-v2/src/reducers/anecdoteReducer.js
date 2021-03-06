const anecdotesAtStart = [

    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)

      return [...old, { ...voted, votes: voted.votes + 1} ]
     
   
    case 'CREATE':
      const newAnecdote = asObject(action.data.content)
      return store.concat(newAnecdote)
      
    default: 
      console.log('didn\'t map to any action');
  }
  return store
}

export const actionForm = {
    
    createAnecdote(content) {
        return {
            type:'CREATE',
            data: {
                content,
                id: getId()
            }
        }
    },
    voteAnecdote(id) {
        return {
            type: 'VOTE',
            data: { id }
        }
    },
}

export default reducer ;