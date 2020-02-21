import React, { Component } from "react";
import BarChart from "./BarChart";
import { Redirect } from "react-router";

class Statistics extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return <BarChart />;
  }
}
export default Statistics;
