import React from 'react';
import ReactDOM from 'react-dom';
import counterReducer from './reducer';
import { createStore } from 'redux';

const store = createStore(counterReducer)


const Statistiikka = ({nolla}) => {
  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }


  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td></td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button onClick={nolla}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  click = (nappi) => () => {
    store.dispatch({ type: nappi })

  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.click('good')}>hyvä</button>
        <button onClick={this.click('ok')}>neutraali</button>
        <button onClick={this.click('bad')}>huono</button>
        <Statistiikka nolla={this.click('zero')} />
      </div>
    )
  }
}
const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}
renderApp()
store.subscribe(renderApp);
