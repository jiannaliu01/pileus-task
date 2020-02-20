import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      email: "",
      password: "",
      error: false
    };
  }

  async componentDidMount() {
    const users = (await axios.get("http://localhost:8081/")).data;
    this.setState({
      users
    });
  }

  getEmailList = object => {
    var emails = [];
    if (object == null) {
      return [];
    }
    for (var i = 0; i < object.length; i++) {
      emails.push(object[i].email);
    }
    return emails;
  };

  validEmailPassword = object => {
    if (object == null) {
      return false;
    }
    for (var i = 0; i < object.length; i++) {
      if (
        object[i].email === this.state.email &&
        object[i].password === this.state.password
      ) {
        return true;
      }
    }
    return false;
  };

  validateEmail = value => {
    var emailList = this.getEmailList(this.state.users);
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    } else if (!emailList.includes(value)) {
      error = "There is no account with this email!";
    }
    this.setState({ email: value });
    return error;
  };

  validatePassword = value => {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length < 8) {
      error = "Password needs to have more than 8 characters";
    }
    this.setState({ password: value });
    return error;
  };

  login() {
    var validLogin = this.validEmailPassword(this.state.users);

    if (!validLogin) {
      this.setState({ error: true });
    } else {
      this.props.history.replace("/statistics");
      this.setState({
        username: "",
        password: ""
      });
    }
  }

  returnRegister() {
    this.props.history.replace("/register");
  }

  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Formik initialValues={{ username: "", email: "", password: "" }}>
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      id="email"
                      type="tel"
                      name="email"
                      placeholder="Enter email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                      validate={this.validateEmail}
                    />
                    <ErrorMessage
                      component="div"
                      name="emailError"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="tel"
                      name="password"
                      placeholder="Enter password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                      validate={this.validatePassword}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                    onClick={e => {
                      e.preventDefault();
                      this.login();
                    }}
                  >
                    Login
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                    onClick={e => {
                      e.preventDefault();
                      this.returnRegister();
                    }}
                  >
                    Have Not Logged In? Register!
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginView;
