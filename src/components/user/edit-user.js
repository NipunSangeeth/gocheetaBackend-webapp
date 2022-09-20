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
import { BsPersonLinesFill } from "react-icons/bs";
import LogoutModel from '../LogoutModel';

function UserEdit() {
  const [data, setdata] = useState({});
  const [role, setRole] = useState([]);
  const [passError, setPassError] = useState("");
  const params = useParams();
  const [emailError, setemailError] = useState("");
  const [oldpasswordError, setOldpasswordError] = useState("");
  const [oldPassStatus, setOldPasswordStatus] = useState(false);

  const [showLogout, setShowLogout] = useState(false);
  const [fname, setfname] = useState('');
  const [nic, setnic] = useState('');
  const [lname, setlname] = useState('');
  const [uname, setuname] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState('');
  const [pass, setpassword] = useState('');
  const [conPass, setConPassword] = useState('');
  const [oldPass, setOldPassword] = useState('');
  const [userRole, setSelectrole] = useState('');

  const reqBody = {
    id: params.id
  };


  React.useEffect(() => {

    axios.get('/user/search/' + params.id)
      .then(res => {

        console.log(res.data.data);
        setdata(res.data.data)

        console.log("users");
        console.log(data);


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
        formIsValid = true;
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
        user_id: data.user_id,
        first_name: fname !== "" ? fname : data.first_name,
        last_name: lname !== "" ? lname : data.last_name,
        addressLine_01: uname !== "" ? uname : data.addressLine_01,
        nic: nic !== "" ? nic : data.nic,
        email: email !== "" ? email : data.email,
        contact_number: contact !== "" ? contact : data.contact_number,
        password: pass !== "" ? pass : "",

      };

      console.log("obj");
      console.log(userObject);


      axios.put('/user/update-cust', userObject)
        .then((res) => {
          if (res.data.code === 200) {
            toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })

            //history('/show-all-users')

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

    } else {
      //toast.warn('not valid', { position: toast.POSITION.TOP_RIGHT })
    }

  }

  return (
    <>
      <Header />
      <Row className="">
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left  p-5">
          <h3 className="dashboard">Edit User</h3>
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
                      <Form.Label>Address Line<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setuname(e.target.value)} type="text" defaultValue={data.addressLine_01} placeholder="Address Line" />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>NIC Number<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setnic(e.target.value)} type="text" defaultValue={data.nic} placeholder="NIC" />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicEmail" className="mt-3">
                      <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setemail(e.target.value)} type="email" defaultValue={data.email} placeholder="Email" />
                    </Form.Group>

                    <small id="emailHelp" className="text-danger form-text">
                      {emailError}
                    </small>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicNumber" className="mt-3">
                      <Form.Label>Contact Number <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setcontact(e.target.value)} defaultValue={data.contact_number} type="text" placeholder="Contact Number" />
                    </Form.Group>
                  </div>
                </div>

                <div className='pwSection'>

                  <h5>Password</h5>
                  <hr></hr>
                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control onChange={e => setpassword(e.target.value)} type="password" placeholder="New Password" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={e => setConPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                  </Form.Group>
                  <small id="emailHelp" className="text-danger form-text">
                    {passError}
                  </small>

                </div>

                <Col className="text-end mt-5">
               
                  <Link className="edit-link" path="/show-users"
                    to="/show-users">
                    <Button className="editBtn" variant="danger"> Cancel</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/show-users"
                    to="/show-users">
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

