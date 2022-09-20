import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../Services/axio";
import { Container, Row, Col, Card } from 'react-bootstrap'

import Header from '../Header';
import Slider from '../Slider';
import Footer from '../Footer';
import LogoutModel from '../LogoutModel';
import '../../css/addUser.css'
import Logout from '../Logout';

function Register() {

    const [passwordError, setpasswordError] = useState("");
    const [logError, setlogError] = useState("");
    const [emailError, setemailError] = useState("");
    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [unameError, setunameError] = useState('');
    const [contactError, setcontactError] = useState('');
    const [nicError, setNicError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(0);
    const [showLogout, setShowLogout] = useState(false);

    const [id, setId] = useState('');
    const [fname, setfname] = useState('');
    const [nic, setnic] = useState('');
    const [lname, setlname] = useState('');
    const [uname, setuname] = useState('');
    const [email, setemail] = useState('');
    const [contact, setcontact] = useState('');
    const [pass, setpassword] = useState('');
    const [conPass, setConPassword] = useState('');


    let history = useNavigate();

    const handleValidation = (event) => {
        let formIsValid1 = true;
        let formIsValid2 = true;
        let formIsValid3 = true;
        let formIsValid4 = true;
        let formIsValid5 = true;
        let formIsValid6 = true;
        let formIsValid7 = true;

        if (fname === "") {
            setfnameError("please enter first name");
            formIsValid1 = false;
        } else {
            setfnameError("");
            formIsValid1 = true;

        }

        if (lname === "") {
            setlnameError("please enter last name");
            formIsValid2 = false;
        } else {
            setlnameError("");
            formIsValid2 = true;

        }

        if (uname === "") {
            setunameError("please enter user name");
            formIsValid3 = false;
        } else {
            setunameError("");
            formIsValid3 = true;

        }

        if (nic.length === 10 && !isNaN(nic.substr(0, 9)) && isNaN(nic.substr(9, 1).toLowerCase()) && ['x', 'v'].includes(nic.substr(9, 1).toLowerCase())) {
            setNicError("");
            formIsValid4 = true;
        } else if (nic.length === 12 && !isNaN(nic)) {
            setNicError("");
            formIsValid4 = true;
        } else {
            setNicError("please enter valid NIC");
            formIsValid4 = false;
        }

        if (!contact.match(/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/)) {
            setcontactError("please enter valid number!");
            formIsValid5 = false;

        } else {
            setcontactError("");
            formIsValid5 = true;

        }

        if (email === "") {
            setemailError("please enter valid email");
            formIsValid6 = false;
        }
        else if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formIsValid6 = false;
            setemailError("Email Not Valid");
        } else {
            setemailError("");
            formIsValid6 = true;
        }

        if (!pass.match(/^[a-zA-Z0-9@#$]{6,12}$/)) {
            formIsValid7 = false;
            setpasswordError("Please enter length must best min 6 Chracters and Max 12 Chracters");
            return false;
        } else {
            if (pass === conPass) {
                setpasswordError("");
                formIsValid7 = true;
            } else {
                setpasswordError("Passwords do not match!");
                formIsValid7 = false;
            }
        }

        if (formIsValid1 === true && formIsValid2 === true && formIsValid3 === true && formIsValid4 === true && formIsValid5 === true && formIsValid6 === true && formIsValid7 === true) {
            return true;
        } else {
            return false
        }

    };

    const handelSubmit = (e) => {
        e.preventDefault();

        if (handleValidation() === true) {
            var token = sessionStorage.getItem("token");
            setBtnDisabled(1);

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }

            const dataObject = {
                user_id: id,
                first_name: fname,
                last_name: lname,
                addressLine_01: uname,
                nic: nic,
                email: email,
                contact_number: contact,
                password: pass,
            };

            axios.post('/user/save', dataObject,)
                .then((res) => {

                    console.log(res);

                    if (res.data.code === 200) {

                        toast.success('User create successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/show-users');

                    } else if (res.data.code === 500) {

                        toast.warn('User Already exist..!')

                    } else {
                        toast.warn('please enter valid details', { position: toast.POSITION.TOP_RIGHT })

                    }

                }
                ).catch((error) => {
                })

        }

    }

    return (
        <>
            <Header />
            <Row className="">
                <Slider />
                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">

                    <h3 className="dashboard">Create User</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>

                            <Form>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >First Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setId(e.target.value)} type="text" placeholder="Enter id" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {fnameError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >First Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setfname(e.target.value)} type="text" placeholder="Enter first name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {fnameError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicLastName">
                                            <Form.Label>Last Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setlname(e.target.value)} type="text" placeholder="Enter last name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {lnameError}
                                        </small>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicUserName" className="mt-3">
                                            <Form.Label>Address Line<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setuname(e.target.value)} type="text" placeholder="Username" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {unameError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicUserName" className="mt-3">
                                            <Form.Label>NIC Number<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setnic(e.target.value)} type="text" placeholder="NIC" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {nicError}
                                        </small>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicEmail" className="mt-3">
                                            <Form.Label>Email Address<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setemail(e.target.value)} type="email" placeholder="Enter email" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {emailError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>Contact Number<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcontact(e.target.value)} type="text" placeholder="Enter Contact Number" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {contactError}
                                        </small>

                                    </div>
                                </div>


                                <h4 className="dashboard mt-5">Password</h4>
                                <hr></hr>


                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicPassword" className="mt-3">
                                            <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setpassword(e.target.value)} type="password" placeholder="Password" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicConfPassword" className="mt-3">
                                            <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setConPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                                        </Form.Group>
                                    </div>
                                </div>

                                <small id="passworderror" className="text-danger form-text">
                                    {passwordError}
                                </small>

                                <Col className="text-end mt-5">

                                    <Link className="edit-link" path="/show-users"
                                        to="/show-users">
                                        <Button className="editBtn" variant="danger"> Cancel</Button>
                                    </Link>{' '}
                                    <Link className="edit-link" path="/show-users"
                                        to="/show-users">
                                        <Button className="editBtn" variant="primary" >Back</Button>
                                    </Link>{' '}
                                    <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className={btnDisabled === 1 ? "disabled" : ""}>
                                        Save
                                    </Button>

                                </Col>
                            </Form>

                            <ToastContainer />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Footer />

            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>
    );
}

export default Register