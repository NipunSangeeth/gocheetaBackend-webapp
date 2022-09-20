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
    const [name, setName] = useState('');
    const [type, setType] = useState('');


    let history = useNavigate();

    const handleValidation = (event) => {
        let formIsValid1 = true;
        let formIsValid2 = true;
        let formIsValid3 = true;

        if (id === "") {
            setfnameError("please enter id");
            formIsValid1 = false;
        } else {
            setfnameError("");
            formIsValid1 = true;

        }

        if (name === "") {
            setlnameError("please enter name");
            formIsValid2 = false;
        } else {
            setlnameError("");
            formIsValid2 = true;

        }

        if (type === "") {
            setunameError("please enter type");
            formIsValid3 = false;
        } else {
            setunameError("");
            formIsValid3 = true;

        }


        if (formIsValid1 === true && formIsValid2 === true && formIsValid3 === true) {
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

            const dataObject = {
                cat_id: id,
                cat_name: name,
                cat_type: type
            };

            axios.post('/vehicle_cat/save', dataObject,)
                .then((res) => {

                    console.log(res);

                    if (res.data.code === 200) {

                        toast.success('Vehicle Category create successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/show-category');

                    } else if (res.data.code === 500) {

                        toast.warn('Vehicle Category Already exist..!')

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

                    <h3 className="dashboard">Create Category</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>

                            <Form>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >Category Id<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setId(e.target.value)} type="text" placeholder="Category id" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {fnameError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicLastName">
                                            <Form.Label>Category Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Category name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {lnameError}
                                        </small>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicUserName" className="mt-3">
                                            <Form.Label>Category Type<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setType(e.target.value)} type="text" placeholder="Category type" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {unameError}
                                        </small>
                                    </div>

                                </div>

                                <small id="passworderror" className="text-danger form-text">
                                    {passwordError}
                                </small>

                                <Col className="text-end mt-5">

                                    <Link className="edit-link" path="/show-category"
                                        to="/show-category">
                                        <Button className="editBtn" variant="danger"> Cancel</Button>
                                    </Link>{' '}
                                    <Link className="edit-link" path="/show-category"
                                        to="/show-category">
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