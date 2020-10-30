import React from 'react';
import './App.css';

// Component to manage application's state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      tipPercent: 20,
      tipAmount: 0,
      totalAmount: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Updates state of price and tipPercent
  handleChange(event) {
    this.setState({
      // key will be price or tipPercent; value will be
      [event.target.name]: event.target.value
    });
  }
  // Updates state of tipAmount and totalAmount
  // This method is not yet working. Is currently written to test whether the UI rendering components work
  handleSubmit(event) {
    console.log(this.state.price, this.state.tipPercent);
    this.setState({
      tipAmount: 1,
      totalAmount: 1
    });
    event.preventDefault();

  }
  render() {
    return (
      <div className="App">
        <AppInterface price={this.state.price} tipPercent={this.state.tipPercent} tipAmount={this.state.tipAmount} totalAmount={this.state.totalAmount} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <AppFooter />
      </div>
    );
  }
}

// Component to render application's main interface
const AppInterface = props => {
  return (
    <main className="AppInterface">
      <h1>Tip Calculator</h1>
      <InputBox price={props.price} tipPercent={props.tipPercent} handleChange={props.handleChange} handleSubmit={props.handleSubmit} />
      <OutputBox tipAmount={props.tipAmount} totalAmount={props.totalAmount} />
    </main>
  )
}

// Component to render the application's input
const InputBox = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>
          Price:
          <input type="number" name="price" placeholder="0.00" min="0.00" step="0.01" value={props.price} onChange={props.handleChange} />
        </label>
        <label>
          Tip Amount:
          <select name="tipPercent" value={props.tipPercent} onChange={props.handleChange} >
            <option value="15">15%</option>
            <option value="18">18%</option>
            <option value="20">20%</option>
            <option value="22">22%</option>
            <option value="25">25%</option>
          </select>
        </label>
        <input type="submit" value="Submit" onClick={props.handleSubmit} />
      </form>

    </div>
  )
}

// Component to render the application's output
const OutputBox = props => {
  return (
    <div>
      <h2>Tip Amount: ${props.tipAmount}</h2>
      <h2>Total Amount: ${props.totalAmount}</h2>
    </div>
  )
}

// Component to render the application's footer
const AppFooter = () => {
  return (
    <footer className="AppFooter">
      <p>&copy; 2020 Jon Rutter.</p>
    </footer>
  )
}

export default App;
