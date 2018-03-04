const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  }
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'good': return { ...state, [action.type]: + 1 }
      case 'ok': return { ...state, [action.type]: + 1 }
      case 'bad': return { ...state, [action.type]: + 1 }
      case 'zero':
        return initialState;
    }
    return state
  }
  
  export default counterReducer;