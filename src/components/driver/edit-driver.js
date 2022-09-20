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
  const [dId, setDid] = useState('');
  const [fname, setfname] = useState('');
  const [nic, setnic] = useState('');
  const [lname, setlname] = useState('');
  const [uname, setUname] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState('');
  const [pass, setpassword] = useState('');
  const [conPass, setConPassword] = useState('');
  const [oldPass, setOldPassword] = useState('');
  let [branchId, setBranchId] = useState();
  let [vehicleId, setVehicleId] = useState();
  let [branch, setBranch] = useState([]);
  let [vehicle, setVehicle] = useState([]);


  React.useEffect(() => {

    axios.get('/driver/search/' + params.id)
      .then(res => {

        console.log(res.data.data);
        setdata(res.data.data)
        setDid(res.data.data.driver_id)

        console.log("users");
        console.log(data);


      })
      .catch((error) => {
      })

    axios.get('/branch/view-all')
      .then(res => {

        console.log("res");
        console.log(res.data.data);
        setBranch(res.data.data);
      })
      .catch((error) => {
      })

    axios.get('/vehicle/view-all')
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

    if (pass !== "") {

      if (!pass.match(/^[a-zA-Z0-9@#$]{6,12}$/)) {
        setPassError("New Password  length must best min 6 Chracters and Max 12 Chracters");
        formIsValid = false;
      } else {

        if (pass === conPass) {
          setPassError("");
        } else {
          setPassError("Passwords do not match!");
          formIsValid = false;
        }

      }

    } else {
      formIsValid = true;

    }

    return formIsValid;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    handleValidation();
    if (handleValidation() === true) {

      const userObject = {
        driver_id: dId !== "" ? dId : data.driver_id,
        first_name: fname !== "" ? fname : data.first_name,
        last_name: lname !== "" ? lname : data.last_name,
        vehicle_id: dId ? data.vehicle_id : vehicleId,
        nic: nic !== "" ? nic : data.nic,
        branch_id: branchId ? branchId : "",
        contact_number: contact !== "" ? contact : data.contact_number,
      };

      console.log("obj");
      console.log(dId);
      console.log(branchId);
      console.log(userObject);

      axios.put('/driver/update', userObject)
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

  }

  return (
    <>
      <Header />
      <Row className="">
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left  p-5">
          <h3 className="dashboard">Edit Driver</h3>
          <hr></hr>

          <Card className=" p-5 mt-2 ml-2">
            <Card.Body>
              <Form>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >First Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setfname(e.target.value)} defaultValue={data.first_name} type="text" placeholder="First name" />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicLastName" className="">
                      <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setlname(e.target.value)} type="text" defaultValue={data.last_name} placeholder="Last name" />
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
                      <Form.Label>Vehicle<span className="text-danger">*</span></Form.Label>
                      <select className='form-control' defaultValue={data.branch_id}  onClick={e => setVehicleId(e.target.value)}>
                        {vehicle.map((option) => (
                          <option value={option.vehicle_id} defaultValue={data.branch_id}>{option.vehicle_name}  ({option.vehicle_number})</option>
                        ))}
                      </select>

                    </Form.Group>
                  </div>
                </div>


                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>NIC Number<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setnic(e.target.value)} type="text" defaultValue={data.nic} placeholder="NIC" />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicNumber" className="mt-3">
                      <Form.Label>Contact Number <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setcontact(e.target.value)} defaultValue={data.contact_number} type="text" placeholder="Contact Number" />
                    </Form.Group>
                  </div>
                </div>

                <Col className="text-end mt-5">
                 
                  <Link className="edit-link" path="/show-driver"
                    to="/show-driver">
                    <Button className="editBtn" variant="danger"> Cancel</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/show-driver"
                    to="/show-driver">
                    <Button className="editBtn" variant="primary" >Back</Button>
                  </Link>{' '}
                  <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className="">
                    Update
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

