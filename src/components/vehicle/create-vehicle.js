import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../../Services/axio";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Card } from 'react-bootstrap'
import Header from '../Header';
import Slider from '../Slider';
import Footer from '../Footer';
import '../../css/userEdit.css'
import LogoutModel from '../LogoutModel';

function UserEdit() {
  const [data, setdata] = useState({});
  const [passError, setPassError] = useState("");
  const params = useParams();
  const [emailError, setemailError] = useState("");
  const [oldPassStatus, setOldPasswordStatus] = useState(false);

  const [showLogout, setShowLogout] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [catId, setCatId] = useState('');
  let [branchId, setBranchId] = useState();
  let [driverId, setDriverId] = useState();

  let [branch, setBranch] = useState([]);
  let [vehicle, setVehicle] = useState([]);
  let [vehicleCat, setVehicleCat] = useState([]);


  React.useEffect(() => {

    axios.get('/branch/view-all')
      .then(res => {

        console.log("res");
        console.log(res.data.data);
        setBranch(res.data.data);
      })
      .catch((error) => {
      })

    axios.get('/vehicle_cat/view-all')
      .then(res => {

        console.log("res");
        console.log(res.data.data);
        setVehicleCat(res.data.data);
      })
      .catch((error) => {
      })

    axios.get('/driver/view-all')
      .then(res => {

        console.log("res");
        console.log(res.data.data);
        setVehicle(res.data.data);
      })
      .catch((error) => {
      })

  }, []);

  const handleValidation = (event) => {
    let formIsValid = false;

    return formIsValid;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    handleValidation();

    const userObject = {
      vehicle_id: id,
      vehicle_name: name,
      vehicle_number: number,
      vehicle_cat: catId,
      driver_id: driverId,
      branch_id: branchId,
    };

    console.log("obj");
    console.log(branchId);
    console.log(userObject);

    axios.post('/vehicle/save', userObject)
      .then((res) => {
        console.log("res");
        console.log(res);
        if (res.data.code === 200) {
          toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })

        } else {

          toast.warn(res.data.message, { position: toast.POSITION.TOP_RIGHT })
        }

      }).catch((error) => {
        if (error.response.data.error) {

          if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {

            setShowLogout(true);
          }

        }
      })

  }

  return (
    <>
      <Header />
      <Row className="">
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left  p-5">
          <h3 className="dashboard">Create Vehicle</h3>
          <hr></hr>

          <Card className=" p-5 mt-2 ml-2">
            <Card.Body>
              <Form>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Id<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setId(e.target.value)} defaultValue={data.vehicle_id} type="text" placeholder="id" required/>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicLastName" className="">
                      <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setName(e.target.value)} type="text" defaultValue={data.vehicle_name} placeholder="name" />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Number<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setNumber(e.target.value)} defaultValue={data.vehicle_number} type="text" placeholder="" />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Category<span className="text-danger">*</span></Form.Label>
                      <select className='form-control' defaultValue={data.vehicle_cat} onClick={e => setCatId(e.target.value)}>
                        {vehicleCat.map((option) => (
                          <option value={option.cat_id} defaultValue={data.vehicle_cat} >{option.cat_name}</option>
                        ))}
                      </select>
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Branch<span className="text-danger">*</span></Form.Label>
                      <select className='form-control' defaultValue={data.branch_id} onClick={e => setBranchId(e.target.value)}>
                        {branch.map((option) => (
                          <option value={option.code} defaultValue={data.code} >{option.name}</option>
                        ))}
                      </select>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Driver<span className="text-danger">*</span></Form.Label>
                      <select className='form-control' defaultValue={data.driver_id} onClick={e => setDriverId(e.target.value)}>
                        {vehicle.map((option) => (
                          <option value={option.driver_id} defaultValue={data.driver_id}>{option.first_name} {option.last_name}</option>
                        ))}
                      </select>

                    </Form.Group>
                  </div>
                </div>

                <Col className="text-end mt-5">
             
                  <Link className="edit-link" path="/show-vehicles"
                    to="/show-vehicles">
                    <Button className="editBtn" variant="danger"> Cancel</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/show-vehicles"
                    to="/show-vehicles">
                    <Button className="editBtn" variant="primary" >Back</Button>
                  </Link>{' '}
                  <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className="">
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
  )
}

export default UserEdit

