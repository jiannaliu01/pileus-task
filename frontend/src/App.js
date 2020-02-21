import React, { Component } from "react";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import Statistics from "./components/Statistics";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  setIsLoggedIn = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    return (
      <div>
        <NavBar />
        <Route
          path="/"
          exact
          render={props => (
            <LoginView {...props} isLoggedIn={this.setIsLoggedIn} />
          )}
        />
        <Route
          path="/register"
          exact
          render={props => (
            <RegisterView {...props} isLoggedIn={this.setIsLoggedIn} />
          )}
        />
        <Route
          path="/statistics"
          exact
          render={props => (
            <Statistics {...props} isLoggedIn={this.state.isLoggedIn} />
          )}
        />
      </div>
    );
  }
}

export default App;
