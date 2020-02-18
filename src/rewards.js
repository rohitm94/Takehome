import React, {Component } from "react";

// importing data from a json to replicate the form of NoSQL Database
import usertransactions from "./data/usertransactions.json";

class Rewards extends Component {

  constructor(props){
    super(props);

    //Binding to make this available inside event handlers
    this.getRewardSummary = this.getRewardSummary.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);

    this.state = {
      customer : "",
      total : 0,
      monthlyreward : []
    };
  }

  //Event handling for Input Form change
  onChange(e) {
    this.setState({
      customer: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let customer = this.state.customer;
    this.getRewardSummary(customer);
    
    // To keep input form Disabled until Reset is clicked
    document.getElementById("Customer-Id").disabled = true;
  }

  onReset(e) {
    e.preventDefault();
    this.setState({
      customer : "",
      total : 0,
      monthlyreward : []
    });
    // Make input form active when Reset is clicked
    document.getElementById("Customer-Id").disabled = false;
  }

  getRewardSummary(cust_id) {
    //Filter and assign data of the only given Customer id
    var cust_data = usertransactions.filter(data=> (data.id === cust_id));
    
    //Filtering the invalid transactions to consider only past 3 month transactions
    var valid_transactions = cust_data[0].transactions.filter(function (transaction) {
      let diff = (new Date().getTime() - new Date(transaction.date).getTime())/(1000 * 3600 * 24);
      if(diff<=30){
        transaction.monthindex = 0;
      }else if(diff>30 && diff<61){
        transaction.monthindex = 1;
      }else if(diff>61 && diff<91){
        transaction.monthindex = 2;
      }
      return (diff <= 90)
    });
    var total_rewards = 0;
    let past_30_day_reward = 0;
    var past_60_day_reward = 0;
    var past_90_day_reward = 0;

    //Calculate the rewards for the valid transactions of given customer
    valid_transactions.forEach(function(transaction){
      if(transaction.amountSpent <= 50){
          transaction.reward = 0;
      }
      else if(transaction.amountSpent>50 &&  transaction.amountSpent<=100){
        transaction.reward = parseInt(transaction.amountSpent - 50) * 1;
      }
      else if(transaction.amountSpent>100){
        transaction.reward = parseInt(transaction.amountSpent - 100) * 2 + 50;
      }

      //Evaluate Total rewards
      total_rewards += transaction.reward;

      //Consolidating rewards as per categorization based on purchases in past months / last 90 days
      if(transaction.monthindex === 0){
        past_30_day_reward += transaction.reward;
      }
      else if(transaction.monthindex === 1){
        past_60_day_reward += transaction.reward;
      }
      else if(transaction.monthindex === 2){
        past_90_day_reward += transaction.reward;
      }
    })

    this.setState({
      total : total_rewards,
      monthlyreward : [past_30_day_reward, past_60_day_reward, past_90_day_reward]
    });
  }

  render(){
    return (
    <div className="search-box">
      <form>
        <label htmlFor="Customer Id">
        Customer-ID
          <input
            id="Customer-Id"
            value= {this.state.customer}
            placeholder="enter your Customer Id"
            onChange={this.onChange}
          />
        </label>
        <button className="btn-small btn-primary"
                    onClick={this.onSubmit}
                  > Submit </button>
        <br />
        <button className="btn-small btn-primary"
                    onClick={this.onReset}
                  > Reset </button>
      </form>
      <div className="result">
      {this.state.total ===0 ? (
        <h1>No Transactions Found</h1>
      ) : (
        <div className="card" >
        <div className="card-body">
      <h3 className="card-title"><u>{this.state.customer}</u></h3>
          <p className="card-text">Total Rewards Earned: <u className="highlight">{this.state.total}</u></p>
          <p className="card-text">Rewards Earned in past 30 days: <u className="highlight">{this.state.monthlyreward[0]}</u></p>
          <p className="card-text">Rewards Earned in past 60 days: <u className="highlight">{this.state.monthlyreward[1]}</u></p>
          <p className="card-text">Rewards Earned in past 90 days: <u className="highlight">{this.state.monthlyreward[2]}</u></p>
        </div>
      </div>  
      )}
    </div>
    </div>
  )
}
}

export default Rewards;
