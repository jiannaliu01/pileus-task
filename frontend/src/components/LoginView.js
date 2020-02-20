import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import * as EmailValidator from "email-validator";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Input, Button } from "@material-ui/core";

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      username: "",
      password: "",
      error: false
    };
  }

  async componentDidMount() {
    const users = (await axios.get("http://localhost:8081/")).data;
    console.log(users, "USerS");
    this.setState({
      users
    });
  }

  updateUsername(value) {
    this.setState({
      username: value
    });
  }

  updatePassword(value) {
    this.setState({
      password: value
    });
  }

  login() {
    //this.props.submitAnswer(this.state.answer);
    let objects = {
      method: "POST",
      url: "http://127.0.0.1:8081/newUser",
      headers: null,
      data: { username: this.state.username, password: this.state.password }
    };
    if (this.state.users.keys(this.state.username) == null) {
      this.setState({ error: true });
    } else {
      this.props.history.replace("/statistics");
      this.setState({
        username: "",
        password: ""
      });
    }
  }

  register() {
    this.props.history.replace("/register");
  }

  render() {
    var loginView = (
      <form>
        <input
          type="username"
          onChange={event => {
            this.updateUsername(event.target.value);
          }}
          value={this.state.username}
        />
        <input
          type="password"
          onChange={event => {
            this.updatePassword(event.target.value);
          }}
          value={this.state.password}
        />
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            this.login();
          }}
        >
          Login
        </button>
      </form>
    );
    var errorView = (
      <form>
        <Input
          error
          type="username"
          onChange={event => {
            this.updateUsername(event.target.value);
          }}
          value={this.state.username}
        />
        <Input
          error
          type="password"
          onChange={event => {
            this.updatePassword(event.target.value);
          }}
          value={this.state.password}
        />
        <Button
          type="button"
          onClick={e => {
            e.preventDefault();
            this.login();
          }}
        >
          Login
        </Button>
      </form>
    );
    return (
      // <div className="container">
      //   <div className="row">
      //     {this.state.questions === null && <p>Loading questions...</p>}
      //     {this.state.questions &&
      //       this.state.questions.map(question => (
      //         <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
      //           <Link to={`/question/${question.id}`}>
      //             <div className="card text-white bg-success mb-3">
      //               <div className="card-header">
      //                 Answers: {question.answers}
      //               </div>
      //               <div className="card-body">
      //                 <h4 className="card-title">{question.title}</h4>
      //                 <p className="card-text">{question.description}</p>
      //               </div>
      //             </div>
      //           </Link>
      //         </div>
      //       ))}
      //   </div>
      // </div>
      <React.Fragment>
        {this.state.error ? errorView : loginView}
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            this.register();
          }}
        >
          Register
        </button>
      </React.Fragment>
    );
  }
}
export default LoginView;
