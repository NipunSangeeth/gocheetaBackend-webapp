import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import DLogin from './components/driverLogin';
import DriverDashboard from './components/Dashboard';
import ShowCustomers from './components/customer/Show-all-customers';
import CustomerCreate from './components/customer/create-customer';
import CustomerEdit from './components/customer/edit-customer';

import CreateUser from './components/user/create-user';
import ShowAllUsers from './components/user/show-all-users';
import UserEdit from './components/user/edit-user';

import BranchesList from './components/branch/show-all-branches';

import CreateDriver from './components/driver/create-driver';
import ShowAllDriver from './components/driver/Show-all-driver';
import DriverEdit from './components/driver/edit-driver';

import ShowAllCat from './components/category/show-all-category';
import CreateCat from './components/category/create-category';
import CatEdit from './components/category/edit-category';

import ShowAllVehicle from './components/vehicle/Show-all-vehicle';
import CreateVehicle from './components/vehicle/create-vehicle';
import VehicleEdit from './components/vehicle/edit-vehicle';

import ShowAllBookings from './components/booking/show-all-bookings';


import Logout from './components/Logout';

function App() {

  var token = sessionStorage.getItem("token");
  var user_id = sessionStorage.getItem("user_id");

  const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  };

  return (

    <div className=''>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/driver-login" element={<DLogin />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          {/* <Route element={<ProtectedRoute isAllowed={!!user_id} />}> */}
          {/* <Route> */}

            <Route path='/create-customer' element={<CustomerCreate />} />
            <Route path='/show-all-customers' element={<ShowCustomers />} />
            <Route path='/customer-edit/:id' element={<CustomerEdit />} />

            <Route path='/user-edit/:id' element={<UserEdit />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='/show-users' element={<ShowAllUsers />} />

            <Route path='/branch-list' element={<BranchesList />} />

            <Route path='/driver-edit/:id' element={<DriverEdit />} />
            <Route path='/create-driver' element={<CreateDriver />} />
            <Route path='/show-driver' element={<ShowAllDriver />} />

            <Route path='/category-edit/:id' element={<CatEdit />} />
            <Route path='/create-category' element={<CreateCat />} />
            <Route path='/show-category' element={<ShowAllCat />} />

            <Route path='/vehicle-edit/:id' element={<VehicleEdit />} />
            <Route path='/create-vehicel' element={<CreateVehicle />} />
            <Route path='/show-vehicles' element={<ShowAllVehicle />} />
            
            <Route path='/show-bookings' element={<ShowAllBookings />} />

            <Route path='/logout' element={<Logout />} />
          {/* </Route> */}
        </Routes>
      </Router>
    </div>
  );

}

export default App;