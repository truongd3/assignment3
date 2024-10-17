import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";
import Child1 from "./Child1";
import Child2 from "./Child2";
import tips from "./data/tips.csv";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data1: [], data2: []};
  }

  componentDidMount() {
    var self = this;
    d3.csv(tips, function(d) {
      return {
        tip: parseFloat(d.tip),
        total_bill: parseFloat(d.total_bill),
        day: d.day
      }
    }).then(function(csv_data) {
      self.setState({data1: csv_data});

      const groupedData = d3.groups(csv_data, d => d.day); // Group by day

      const avgTipData = groupedData.map(([day, values]) => {
        const totalTip = d3.sum(values, d => d.tip);  // Sum of tips for the day
        const avgTip = totalTip / values.length;      // Average tip for the day
        return { day, avgTip };
      });
      self.setState({data2: avgTipData});
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Truong Dang | Assignment 3</h1>
        <div style={{ textAlign: "center" }}>
          <Child1 data1={this.state.data1}></Child1>
          <Child2 data2={this.state.data2}></Child2>
        </div>
      </div>
    )
  }
}

export default App