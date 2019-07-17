import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import PizzaList from './PizzaList';


class App extends Component {
constructor(props) {
  super(props)
  this.state ={
    pizzas: [],
    pizzaType: '',
    pizzaTopping: ''
}
  this.handlePizzaTypeChange = this.handlePizzaTypeChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
}

handleSubmit(e) {
  e.preventDefault()
  axios.post('/pizza', {
    type: this.state.pizzaType
  }).then( (response) => {
    axios.get('/pizza').then((response) => {
      this.setState({
        pizzas: response.data
        })
      })
  })
}

handlePizzaTypeChange(e) {
  e.preventDefault()
  this.setState({
    pizzaType: e.target.value
  })
}

componentDidMount() {
axios.get("/pizza")
.then(res => {
  this.setState({
    pizzas: res.data
  })
})
}

render() {
  return (
    <div className="App">
      <PizzaList pizzas={this.state.pizzas}
                 handlePizzaTypeChange={this.handlePizzaTypeChange} 
                 type={this.state.pizzaType} 
                 handleSubmit={this.handleSubmit} />
    </div> 
  );
 }
} 



export default App;
