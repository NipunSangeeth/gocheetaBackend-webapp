import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useRef } from 'react'
import { Col, Row, Table, Container, Card, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import axios from "../../Services/axio";
import Header from '../Header';
import Slider from '../Slider';
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/userList.css'
import LogoutModel from '../LogoutModel';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill } from "react-icons/bs";

var _ = require('lodash');

function ShowDrivers() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cusId, setCusId] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [showLogout, setShowLogout] = useState(false);
    let [users, setusers] = useState([]);

    React.useEffect(() => {
        axios.get('/vehicle/view-all')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setusers(res.data.data);
            })
            .catch((error) => {
            })
    }, []);

    function handelSubmitDelete(id) {
        setShow(true);
        setCusId(id);

        console.log("id");
        console.log(cusId);
    }

    function confirmDelete() {
        setShow(false);

        axios.delete('/driver/delete/' + cusId)
            .then(res => {

                if (res.data.code == 200) {
                    toast.success("Deleted Sucessfully!", { position: toast.POSITION.TOP_RIGHT })
                    window.location.reload(false)
                }else{
                    toast.warn('try again', { position: toast.POSITION.TOP_RIGHT })
                }

                console.log(res.data.data);
                setusers(([res.data.data]));

            })
            .catch((error) => {
            })


    }

    const handelSubmitSearch = (e) => {

        console.log("e");
        console.log(e);
        e.preventDefault();

        axios.get('/vehicle/search/' + searchVal)
            .then(res => {

                console.log(res.data.data);
                // setusers(res.data.data);

                setusers(([res.data.data]));
                // setpageNumArr([]);

                console.log("users");
                console.log(users);


            })
            .catch((error) => {
            })

    }

    return (
        <>
            <Header />
            <Row className="">
                <Slider />

                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">

                    <h3 className="dashboard">Driver</h3>
                    <hr></hr>
                    <Row>
                        <Col lg={4} md={4}>
                            <Form.Group controlId="formBasicRole" className="mt-3">
                                <Form.Control type="test" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" />
                            </Form.Group>
                        </Col>
                        <Col lg={1} md={2} className="mt-3">
                            <Button onClick={e => handelSubmitSearch(e)} variant="success btn-block" type="submit" className="">
                                Search
                            </Button>
                        </Col>
                        <Col lg={1} md={2} className="mt-3">
                            <Button onClick={e => window.location.reload(false)} variant="warning btn-block" type="submit" className="">
                            <i className="fa fa-times"></i>
                            </Button>
                        </Col>

                        <Col lg={6} md={4} className="mt-3">
                            <Link to={'/create-vehicel'} >
                                <Button variant="success" className="mr-auto"><BsPersonPlusFill></BsPersonPlusFill> Add New</Button>{' '}
                            </Link>
                        </Col>
                    </Row>

                    <br></br>
                    <br></br>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Vehicle Name</th>
                                <th>Vehicle Number</th>
                                <th>Category</th>
                                <th>Branch Id</th>
                                <th>Driver Id</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.vehicle_id}</td>
                                        <td>{item.vehicle_name}</td>
                                        <td>{item.vehicle_number}</td>
                                        <td>{item.vehicle_cat}</td>
                                        <td>{item.branch_id}</td>
                                        <td>{item.driver_id}</td>

                                        <td>
                                            <Link className="edit-link" path={"vehicle-edit/:id"}
                                                to={'/vehicle-edit/' + item.vehicle_id}>
                                                <Button className="editBtn" variant="info" size="md"><i className="fa fa-edit"></i></Button>
                                            </Link>
                                            {' '}
                                            <Button className="editBtn" variant="danger" size="md" onClick={e => handelSubmitDelete(item.driver_id)}><i className="fa fa-trash"></i></Button>
                                            {' '}
                                        </td>


                                    </tr>
                                )
                            }) : <tr className="text-center"><td colSpan={8} >Data Not Found!</td></tr>}
                        </tbody>
                    </Table>
                    <ToastContainer />
                </Col>
            </Row>
            <Footer />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action cannot be undone, are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={e => confirmDelete()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>


            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>

    );
}

export default ShowDrivers