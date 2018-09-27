import React, { Component } from 'react';
import logo from '../../src/logo.svg';
import '../../src/App.css';
import { addRecipe } from '../actions';

class App extends Component {
  state = {
    calendar: null
  }
  //Pegar a nossa store de props
  componentDidMount() {
    const { store } = this.props
    // invocar o subscribe para qualquer mudança que acontecer dentro da nossa store do Redux
    // e sempre que algo mudar, nós chamamos setState
    store.subscribe(() => {
      this.setState(() => ({
        //pegar o stado da store e colocá-lo no estado do nosso componente local.
        calendar: store.getState()
      }))
    })
  }

  submitFood = () => {
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.input.value
      }
    }))
    this.input.value = ''
  }
  

  render() {
    return (
      <div>
        <input
          type='text'
          ref={(input) => this.input = input}
          placeholder="Monday's Breakfast"
        />
        <button onClick={this.submitFood}>Submit</button>

        <pre>
          Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    );
  }
}

export default App;
