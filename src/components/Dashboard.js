import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Card, Row, Badge } from "react-bootstrap";
import { BsTextRight, BsFillTelephoneInboundFill, BsClock, BsFillTelephoneOutboundFill, BsHeadset } from "react-icons/bs";
import axios from "../Services/axio";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Header from './Header';
import Footer from './Footer';
import logout from './Logout';
import '../css/dashboard.css'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

var moment = require('moment');



function Dashboard() {

  let [bookings, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    axios.get('/booking/view-all')
      .then(res => {

        console.log("res");
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
      })
  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Container>
              <b>Reference Number : </b>#001
              <br></br>
              <b>Distance (Km)    : </b>100
              <br></br>
              <b>Amount (Rs)      : </b>1000.00 
              <br></br>
              <b>Branch           : </b>Colombo
              <br></br>
              <b>Vehicle          : </b>Suzuki Maruti
              <br></br>
            </Container>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Header />
      <Container>
        <h3 className='mt-5'>My Bookings</h3>
        <hr></hr>

        <Table striped bordered hover variant="dark" className='mt-5'>
          <thead>
            <tr>
              <th>Reservation Number</th>
              <th>Distance</th>
              <th className='text-end'>Amount (Rs)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((option) => (
              <tr>
                <td>{option.reservation_number}</td>
                <td>{option.duration}</td>
                <td className='text-end'>{option.amount}.00</td>
                <td className='text-success'>Confirmed</td>
                <td onClick={handleShow}>View</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>

  )
}

export default Dashboard