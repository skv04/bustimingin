import './App.css';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import BusRoutes from './components/BusRoutes';
import Signin from './components/Signin';
import Signup from './components/Signup';

import {Routes,Route, BrowserRouter} from 'react-router-dom';
import AddBusRoute from './components/AddBusRoute';
import BusLocation from './components/BusLocation';
import BusCompanyDetails from './components/BusCompanyDetails';
import DriverDetails from './components/DriverDetails';
import ManageCompanyDetails from './components/ManageCompanyDetail';
import ManageDriverDetails from './components/ManageDriverDetails';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/buscompany" element={<BusCompanyDetails/>}/>
        <Route path="/drivers" element={<DriverDetails/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/busroutes" element={<BusRoutes/>}/>
        <Route path="/admin" element={<AddBusRoute/>}/>
        <Route path="/admin/bus" element={<AddBusRoute/>}/>
        <Route path="/admin/buscompany" element={<ManageCompanyDetails/>}/>
        <Route path="/admin/driver" element={<ManageDriverDetails/>}/>
        <Route path="/buslocation" element={<BusLocation/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

