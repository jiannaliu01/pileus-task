import React, { Component } from "react";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import Statistics from "./components/Statistics";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={LoginView} />
        <Route exact path="/register" component={RegisterView} />
        <Route exact path="/statistics" component={Statistics} />
      </div>
    );
  }
}

export default App;
