import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';

//import filterReducer from './reducers/filterReducer';
//import anecdoteReducer from './reducers/anecdoteReducer';

/*const reducer = combineReducers({
  content: anecdoteReducer,
  filter: filterReducer,
})
*/

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)