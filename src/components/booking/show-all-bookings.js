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


function ShowBranches() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cusId, setCusId] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [showLogout, setShowLogout] = useState(false);
    let [users, setusers] = useState([]);

    React.useEffect(() => {
        axios.get('/booking/view-all')
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
        console.log(id);
    }

    function confirmDelete() {
        setShow(false);

        axios.delete('/customer/' + cusId)
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

        axios.get('/customer/search/' + searchVal)
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

                    <h3 className="dashboard">Booking Details</h3>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Reservation Number</th>
                                <th>Duratin</th>
                                <th>Amount (RS)</th>
                                <th>Customer</th>
                                <th>Branch</th>
                                <th>Driver</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.reservation_number}</td>
                                        <td>{item.duration}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.customer_id}</td>
                                        <td>{item.branch_id}</td>
                                        <td>{item.vehicle_id}</td>
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

export default ShowBranches