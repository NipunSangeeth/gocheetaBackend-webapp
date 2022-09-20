import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react'

import { Nav, NavLink, Row, Col, Button, Card, Navbar, NavItem, NavDropdown, Collapse } from 'react-bootstrap'
import { Link ,useLocation} from "react-router-dom";
import '../css/sideNav.css'
import {BsMinecart, BsFillPinMapFill, BsFillRssFill, BsPersonFill, BsPersonPlusFill, BsFillHouseDoorFill,BsFillPenFill,BsArrowDownLeft,BsFillRecordFill, BsFillFileEarmarkTextFill, BsPersonLinesFill, BsTextRight, BsPeople, BsPauseFill, BsFillTelephoneFill, BsFillTelephoneForwardFill } from "react-icons/bs";


function Slider() {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const { pathname } = useLocation()
    return (
        <>
            <Col lg={2} md={3} sm={3} className="shadow-sm rounded-lg test-left slide_w p-1">
                <Nav defaultActiveKey="/dashboard" className="flex-column justify-content-end flex-grow-1 pe-3">
                    {/* <Nav.Link to="/dashboard">Dashboard</Nav.Link> */}
                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen1(!open1)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open1}
                    >
                        <BsPersonFill></BsPersonFill>&nbsp;&nbsp;Users
                    </Button>
                    <Collapse in={pathname ==="/create-user" || pathname==="/show-user"? () => setOpen1(!open1):open1}>
                        <div id="example-collapse-text">
                            <Link className={pathname ==="/create-user"?"sideNavItemOpen":"sideNavItem"} to={'/create-user'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Add User
                            </Link  ><br></br><br></br>

                            <Link className={pathname ==="/show-users"?"sideNavItemOpen":"sideNavItem"} to={'/show-users'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Users List
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        <BsPeople></BsPeople>&nbsp;&nbsp;Customer Management
                    </Button>
                    <Collapse in={pathname ==="/create-user" || pathname==="/show-all-users"? () => setOpen(!open):open}>
                        <div id="example-collapse-text">
                            <Link className={pathname ==="/create-customer"?"sideNavItemOpen":"sideNavItem"} to={'/create-customer'}>
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp;Add Customer
                            </Link  ><br></br><br></br>

                            <Link className={pathname ==="/show-all-customers"?"sideNavItemOpen":"sideNavItem"} to={'/show-all-customers'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Customer List
                            </Link  >
                        </div>
                    </Collapse>



                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen2(!open2)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open2}
                    >
                        <BsFillRssFill></BsFillRssFill>&nbsp;&nbsp;Branch
                    </Button>
                    <Collapse in={pathname ==="/branch" || pathname==="/branch-list"? () => setOpen2(!open2):open2}>
                        <div id="example-collapse-text">
                            <Link className={pathname ==="/branch-list"?"sideNavItemOpen":"sideNavItem"} to={'/branch-list'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Branch List
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen3(!open3)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open3}
                    >
                        <BsFillPinMapFill></BsFillPinMapFill>&nbsp;&nbsp;Drivers
                    </Button>
                    <Collapse in={pathname ==="/show-driver" || pathname==="/show-driver"? () => setOpen3(!open3):open3}>
                        <div id="example-collapse-text">
                        <Link className={pathname ==="/create-driver"?"sideNavItemOpen":"sideNavItem"} to={'/create-driver'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Add Driver
                            </Link  ><br></br><br></br>
                            <Link className={pathname ==="/show-driver"?"sideNavItemOpen":"sideNavItem"} to={'/show-driver'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp;Driver List
                            </Link  ><br></br><br></br>
                    
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen4(!open4)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open4}
                    >
                        <BsMinecart></BsMinecart>&nbsp;&nbsp;Vehicle category
                    </Button>
                    <Collapse in={pathname ==="/create-category" || pathname==="/create-category" || pathname==="/create-category"? () => setOpen4(!open4):open4}>
                    <div id="example-collapse-text">
                            <Link className={pathname ==="/create-category"?"sideNavItemOpen":"sideNavItem"} to={'/create-category'}>
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp;Add Category
                            </Link  ><br></br><br></br>

                            <Link className={pathname ==="/show-category"?"sideNavItemOpen":"sideNavItem"} to={'/show-category'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Category List
                            </Link  >
                        </div>
                    </Collapse>
                

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen5(!open5)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open5}
                    >
                        <BsMinecart></BsMinecart>&nbsp;&nbsp;Vehicle
                    </Button>
                    <Collapse in={pathname ==="/report-call-logs" || pathname==="/report-logs" || pathname==="/report-remark"? () => setOpen5(!open5):open5}>
                    <div id="example-collapse-text">
                            <Link className={pathname ==="/create-customer"?"sideNavItemOpen":"sideNavItem"} to={'/create-customer'}>
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp;Add Vehicle
                            </Link  ><br></br><br></br>

                            <Link className={pathname ==="/show-vehicles"?"sideNavItemOpen":"sideNavItem"} to={'/show-vehicles'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Vehicle List
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen6(!open6)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open5}
                    >
                        <BsMinecart></BsMinecart>&nbsp;&nbsp;Bookings
                    </Button>
                    <Collapse in={pathname ==="/show-bookings" || pathname==="/show-bookings" || pathname==="/show-bookings"? () => setOpen5(!open6):open6}>
                    <div id="example-collapse-text">
                            <Link className={pathname ==="/show-bookings"?"sideNavItemOpen":"sideNavItem"} to={'/show-bookings'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Booking List
                            </Link  >
                        </div>
                    </Collapse>

                </Nav>
            </Col>

        </>
    )
}

export default Slider