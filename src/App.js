import React from 'react';
import './App.css';

// Component to manage application's state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      tipPercent: "20",
      tipAmount: "0.00",
      totalAmount: "0.00"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formatValue = this.formatValue.bind(this);
  }

  // Takes a number as input, returns a string in the format of a dollar amount
  formatValue(num) {
    // If num is NaN: return 0.00
    if (isNaN(num)) {
        return "0.00";
    }
    // Converting num to a string
    let numStr = num.toString()
    if (numStr.match(/\.\d{2}$/)) {   
      // If already exactly two decimal places: return as-is
      return numStr;
    } else if (numStr.match(/\.\d$/)) {
      // If only one decimal place: add "0" to end
      return numStr + "0";
    } else if (!numStr.match(/\./)) {
      // If no decimal, add decimal point with two 0s
      return numStr + ".00";
    } else {
      // At this point: there must be > 2 decimal places, so trim string
      let decimal = numStr.indexOf(".");
      return numStr.slice(0, (decimal + 3));
    }
  }

  // Updates state of tipAmount and totalAmount
  // Called when <form> in <InputBox /> is submitted, through pressing enter or clicking submit button
  handleSubmit(event) {
    // Must convert this.state.price and this.state.tipPercent to tipAmt/totalAmt, then parse with formatValue
    // price and tipPercent are entered as strings, so convert to numbers
    event.preventDefault();
    // Multiply by 100 to prevent floating point math errors
    let priceCalc = Number(this.state.price) * 100
    let tipCalc = Number(this.state.tipPercent);
    let tipAmt = (priceCalc * tipCalc) / 10000;
    let totalAmt = tipAmt + (priceCalc / 100);
    this.setState({
      tipAmount: this.formatValue(tipAmt),
      totalAmount: this.formatValue(totalAmt)
    });

  }

  // Updates state of price and tipPercent
  // Called when <input>s in <InputBox /> are changed by user
  handleChange(event) {
    // Pop-up warning if value is outside permitted range
    this.setState({
      // key will be price or tipPercent; value will be value entered by user
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <div className="App">
        <AppInterface price={this.state.price} tipPercent={this.state.tipPercent} tipAmount={this.state.tipAmount} totalAmount={this.state.totalAmount} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
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
        <div className="flex-container"> 
          <label className="flex-item">
            Price:<br />
            <span className="input-prefix">$</span>
            <input type="number" name="price" placeholder="0.00" min="0.00" step="0.01" value={props.price} onChange={props.handleChange} />
          </label>
          <label className="flex-item">
            Tip Amount: <br />
            <select name="tipPercent" value={props.tipPercent} onChange={props.handleChange} >
              <option value="15">15%</option>
              <option value="18">18%</option>
              <option value="20">20%</option>
              <option value="22">22%</option>
              <option value="25">25%</option>
            </select>
          </label>
        </div>
        <input className="flex-item" type="submit" value="Submit" onClick={props.handleSubmit} />
      </form>

    </div>
  )
}

// Component to render the application's output
const OutputBox = props => {
  return (
    <div className="flex-container">
      <span className="flex-item">Tip Amount: ${props.tipAmount}</span>
      <span className="flex-item">Total Amount: ${props.totalAmount}</span>
    </div>
  )
}


export default App;
