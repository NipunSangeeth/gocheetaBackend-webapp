import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, Redirect, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

// import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../Services/axio";
import '../css/Login.css'

function Login() {
  const [isLogged, setIsLogged] = useState(false)
  const [email, setemail] = useState('');
  const [pass, setpassword] = useState('');
  const [passwordError, setpasswordError] = useState("");
  const [logError, setlogError] = useState("");
  const [emailError, setemailError] = useState("");
  const [show, setShow] = useState(false);

  const [loginUsername, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  function validateForm() {
    return email.length > 0 && pass.length > 0;
  }

  let history = useNavigate();

  const handleValidation = (event) => {
    let formIsValid = true;
    if (email === "") {
      setemailError("please enter valid email");
      return false;
    }
    else if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!pass.match(/^[a-zA-Z]{8,12}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 12 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginfail = (event) => {
    setlogError(
      "Please enter valid login credentials."
    );
  }


  const handelSubmit = (e) => {

    try {

      var form = new FormData();
      form.append("username", loginUsername);
      form.append("password", loginPassword);

      var settings = {
        "url": "http://localhost:8080/api/v1/go-cheeta/driver/login",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };

      $.ajax(settings).done(function (response) {
        console.log("response");
        console.log(response);
        setIsLogged(true);

        if (response == 'true') {
          toast.success("Login Success", { position: toast.POSITION.TOP_RIGHT })
          window.location.href = "/driver-dashboard";
        } else {
          toast.warning("Lgin Details Invalid", { position: toast.POSITION.TOP_RIGHT })
        }



      });

      console.log("isLogged");
      console.log(isLogged);


    } catch (error) {
      console.log(error)
    }

  }

  return (

    <>



      <Container>

              <Row className="mt-5 ">
                <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                  <Form id="loginform" onSubmit={e => handelSubmit(e)}>
                    <h5 className='text-center'>Go Cheeta Driver Console</h5>
                    <hr></hr>
                    <div className="form-group">
                      <label>Email address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="EmailInput"
                        name="EmailInput"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={(event) => setLoginUserName(event.target.value)}
                      />
                      <small id="emailHelp" className="text-danger form-text">
                        {emailError}
                      </small>
                    </div>

                    <div className="form-group pt-3 pb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={(event) => setLoginPassword(event.target.value)}
                      />

                    </div>

                    <div className="form-group form-check pb-3">
                      <small id="logerror" className="text-danger form-text">
                        {logError}
                      </small>
                    </div>
                    <div className="form-group text-center">
                      <button type="button" className="btn btn-success login w-100" onClick={handelSubmit}>
                        Login
                      </button>
                    </div>
                    <br></br>
                  </Form>
                  <ToastContainer />
                </Col>
              </Row>
            </Container>
          </>
          )
}

          export default Login