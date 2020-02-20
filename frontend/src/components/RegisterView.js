import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      username: "",
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

  updateFullName(value) {
    this.setState({
      fullname: value
    });
  }

  updatePassword(value) {
    this.setState({
      password: value
    });
  }

  updateUsername(value) {
    this.setState({
      username: value
    });
  }

  returnLogin() {
    this.props.history.replace("/");
  }

  register() {
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
    if (
      this.state.email == null ||
      this.state.password == null ||
      this.state.fullname == null ||
      this.state.users.keys(this.state.email).length != null
    ) {
      this.setState({ error: true });
    } else {
      const users = axios(objects);
      this.props.history.replace("/statistics");
      this.setState({
        email: "",
        password: "",
        fullname: ""
      });
    }
  }

  render() {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (
      // <div className="row">
      //   <div className="col-lg-12">
      //     <Formik
      //       //  initialValues={{ username: "", email: "", password: "" }}
      //       // validationSchema={Yup.object().shape({
      //       //   username: Yup.string()
      //       //     .email()
      //       //     .required("Required"),
      //       //   password: Yup.string()
      //       //     .required("No password provided.")
      //       //     .min(8, "Password is too short - should be 8 chars minimum.")
      //       //     .matches(/(?=.*[0-9])/, "Password must contain a number.")
      //       // })}
      //       validate={values => {
      //         let errors = {};
      //         if (values.fullname == "") {
      //           errors.fullname = "Username is required";
      //         }
      //         // } else if (this.state.users.keys(this.state.username) != null) {
      //         //   errors.username = "Username is already taken";
      //         // }
      //         if (values.username === "") {
      //           errors.username = "Email is required";
      //         } else if (!emailTest.test(values.username)) {
      //           errors.username = "Invalid email address format";
      //         }
      //         if (values.password === "") {
      //           errors.password = "Password is required";
      //         } else if (values.password.length < 3) {
      //           errors.password = "Password must be 3 characters at minimum";
      //         }
      //         return errors;
      //       }}
      //       onSubmit={({ setRegistering }) => {
      //         alert("Form is validated! Submitting the form...");
      //         setRegistering(false);
      //       }}
      //     >
      //       {({ touched, errors, isRegistering }) => (
      //         <form>
      //           <Field name="email" validate={this.validateUsername} />
      //           {errors.username && touched.username && (
      //             <div>{errors.username}</div>
      //           )}
      //           <div className="form-group">
      //             <label htmlFor="email">Full Name</label>
      //             <input
      //               name="fullname"
      //               type="text"
      //               placeholder="Enter your full name"
      //               className={`form-control ${
      //                 touched.fullname && errors.fullname ? "is-invalid" : ""
      //               }`}
      //               onChange={event => {
      //                 this.updateFullName(event.target.value);
      //               }}
      //               // className={errors.email && touched.email && "error"}
      //             />
      //             <label htmlFor="email">Username</label>
      //             <input
      //               name="username"
      //               type="text"
      //               placeholder="Enter email"
      //               value={this.state.email}
      //               className={`form-control ${
      //                 touched.username && errors.username ? "is-invalid" : ""
      //               }`}
      //               onChange={event => {
      //                 console.log(errors.username, "ERROR");
      //                 this.updateUsername(event.target.value);
      //               }}
      //             />
      //             {/* <ErrorMessage
      //               component="div"
      //               name="username"
      //               className="invalid-feedback"
      //             /> */}
      //           </div>

      //           <div className="form-group">
      //             <label htmlFor="password">Password</label>
      //             <input
      //               type="password"
      //               name="password"
      //               placeholder="Enter password"
      //               className={`form-control ${
      //                 touched.password && errors.password ? "is-invalid" : ""
      //               }`}
      //               onChange={event => {
      //                 this.updatePassword(event.target.value);
      //               }}
      //             />
      //             {/* <ErrorMessage
      //               component="div"
      //               name="password"
      //               className="invalid-feedback"
      //             /> */}
      //           </div>
      //           <button
      //             type="Register"
      //             className="btn btn-primary btn-block"
      //             // disabled={isRegistering}
      //             onClick={e => {
      //               e.preventDefault();
      //               this.register();
      //             }}
      //           >
      //             {isRegistering ? "Please wait..." : "Register"}
      //           </button>
      //         </form>
      //       )}
      //     </Formik>
      //   </div>
      // </div>
      //  // {/* <React.Fragment>
      //     {this.state.error ? errorView : registerView}
      //     <Button
      //       type="button"
      //       onClick={e => {
      //         e.preventDefault();
      //         this.returnLogin();
      //       }}
      //     >
      //       Go Back to Login
      //     </Button>
      //   </React.Fragment> */}
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Register Form</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              validate={values => {
                let errors = {};
                if (values.username === "") {
                  errors.username = "Email is required";
                }
                if (values.email === "") {
                  errors.email = "Email is required";
                } else if (!emailTest.test(values.email)) {
                  errors.email = "Invalid email address format";
                } else if (
                  this.state.users.keys(this.state.email).length != null
                ) {
                  errors.email = "Someone already has this email";
                }
                if (values.password === "") {
                  errors.password = "Password is required";
                } else if (values.password.length < 3) {
                  errors.password = "Password must be 3 characters at minimum";
                }
                return errors;
              }}
              onSubmit={({ setSubmitting }) => {
                alert("Form is validated! Submitting the form...");
                setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="username">Full Name</label>
                    <Field
                      type="name"
                      name="name"
                      placeholder="Enter full name"
                      className={`form-control ${
                        touched.username && errors.username ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
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
