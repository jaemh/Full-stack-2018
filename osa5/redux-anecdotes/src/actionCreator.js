const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const actionFor = {
    
    createAnecdote(content) {
        return {
            type:'NEW_ANECDOTE',
            data: {
                content,
                id: generateId()
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

export default actionFor;