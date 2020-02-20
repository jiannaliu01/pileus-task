import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";

class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      email: "",
      password: "",
      fullname: "",
      error: false
    };
  }

  async componentDidMount() {
    const users = (await axios.get("http://localhost:8081/")).data;
    this.setState({
      users
    });
  }

  returnLogin() {
    this.props.history.replace("/");
  }

  register() {
    var emailList = this.getEmailList(this.state.users);
    if (
      this.state.email == null ||
      this.state.password == null ||
      this.state.fullname == null ||
      emailList.includes(this.state.email)
    ) {
      this.setState({ error: true });
    } else {
      let objects = {
        method: "POST",
        url: "http://127.0.0.1:8081/newUser",
        data: {
          fullname: this.state.fullname,
          email: this.state.email,
          password: this.state.password,
          headers: null
        }
      };
      const users = axios(objects);
      this.props.history.replace("/statistics");
      this.setState({
        email: "",
        password: "",
        fullname: ""
      });
    }
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
  validateEmail = value => {
    var emailList = this.getEmailList(this.state.users);
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    } else if (emailList.includes(value)) {
      error = "Email already in use";
    }
    this.setState({ email: value });
    return error;
  };

  validateUsername = value => {
    let error;

    if (!value) {
      error = "Required";
    }
    this.setState({ fullname: value });
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

  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Register</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Formik initialValues={{ username: "", email: "", password: "" }}>
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="username">Full Name</label>
                    <Field
                      type="username"
                      name="username"
                      placeholder="Enter full name"
                      className={`form-control ${
                        touched.username && errors.username ? "is-invalid" : ""
                      }`}
                      validate={this.validateUsername}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                      validate={this.validateEmail}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
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
                      this.register();
                    }}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
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

export default RegisterView;
