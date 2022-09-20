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
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');


  const reqBody = {
    id: params.id
  };


  React.useEffect(() => {

    axios.get('/vehicle_cat/search/' + params.id)
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
    let formIsValid = true;
    return formIsValid;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    handleValidation();
    if (handleValidation() === true) {

      const userObject = {
        cat_id: id !== "" ? id : data.cat_id,
        cat_name: name !== "" ? name : data.cat_name,
        cat_type: type !== "" ? type : data.cat_type,
      };

      console.log("obj");
      console.log(userObject);


      axios.put('/vehicle_cat/update', userObject)
        .then((res) => {

          console.log("res");
          console.log(res);
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
          <h3 className="dashboard">Edit Category</h3>
          <hr></hr>

          <Card className=" p-5 mt-2 ml-2">
            <Card.Body>
              <Form>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Category Id<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setId(e.target.value)} defaultValue={data.cat_id} type="text" placeholder="First name" readOnly/>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicLastName" className="">
                      <Form.Label>Category Name<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setName(e.target.value)} type="text" defaultValue={data.cat_name} placeholder="Last name" />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Category Type<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setType(e.target.value)} type="text" defaultValue={data.cat_type} placeholder="Address Line" />
                    </Form.Group>
                  </div>
                </div>

                <Col className="text-end mt-5">
               
                  <Link className="edit-link" path="/show-category"
                    to="/show-category">
                    <Button className="editBtn" variant="danger"> Cancel</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/show-category"
                    to="/show-category">
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

