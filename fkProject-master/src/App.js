import React from 'react'
import "./index.css"
import Navbar from './Navbar/Navbar'
import { BrowserRouter, Routes } from 'react-router-dom';
import {   Route} from "react-router-dom";
import SideNavbar from './SideNavbar/SideNavbar';
import HumanResources from './HumanResources/HumanResources'
import Employee from './Employee/Employee'
import City from './HumanResources/HR-Components/City'
import Role from './Admin/Role';
import Department from './Admin/Department';
import Position from './Admin/Position';
import Home from './Admin/portalmaster/Home'
import HomeBidding from './Admin/projectbidding/HomeBidding'
import PersonalInfo from './Employee/EmployeeComponent/PersonalInfo'
import Education from './Employee/EmployeeComponent/Education/Education'
import WorkExp from './Employee/EmployeeComponent/WorkExp/WorkExp';
import Add2 from "./Admin/projectbidding/Add";
import Edit2 from "./Admin/projectbidding/Edit";
import Add from "./Admin/portalmaster/Add"
import Edit from "./Admin/portalmaster/Edit"
import Dependents from './Employee/EmployeeComponent/Depenents';
import LeaveApp from './Employee/EmployeeComponent/LeaveApp/LeaveApp';
import Country from './HumanResources/HR-Components/Country/Country';
import Salary from "./HumanResources/HR-Components/salary/ProductList"
import DepartmentHr from './HumanResources/HR-Components/Department/Department';
import PositionHr from './HumanResources/HR-Components/Position/Position.jsx'
import State from './HumanResources/HR-Components/State/State';

export default function App() {
  return (
    <div>
  
        <Navbar name="Aryan"/>
        <BrowserRouter>
        <Routes>
    {/* ADMIN PAFGE ROUTES */}
        <Route path='/role' element={<Role/>} />
        <Route path='/position' element={<Position/>} />
        <Route path='/department' element={<Department/>} />
        <Route path='/project_bidding' element={<HomeBidding/>} />
        <Route path='/portal_master' element={<Home/>} />
        <Route path='/add2' element={<Add2/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/edit' element={<Edit/>} />
        <Route path='/edit2' element={<Edit2/>} />
    {/* ADMIN PAFGE ROUTES */}

    {/* EMPLOYEE PAGE ROUTING */}
        <Route path='/employee/personal_info' element={<PersonalInfo/>} />
        <Route path='/employee/education' element={<Education/>} />
        <Route path='/employee/work_experience' element={<WorkExp/>} />
        <Route path='/employee/dependents' element={<Dependents/>} />
        <Route path='/employee/leave_application' element={<LeaveApp/>} />
    {/* EMPLOYEE PAGE ROUTING */}
        <Route path='/' element={<SideNavbar heading='Admin'/>}/>
        <Route path='/human-resources' element={<HumanResources heading='HR'/>}/>
        <Route path='/employee' element={<Employee heading='Employee'/>}/>
        <Route path='/human-resources/city' element={<City/>} />
        <Route path='/human-resources/country' element={<Country/>} />
        <Route path='/human-resources/salary' element={<Salary/>} />
        <Route path='/human-resources/department' element={<DepartmentHr/>} />
        <Route path='/human-resources/position' element={<PositionHr/>} />
        <Route path='/human-resources/state' element={<State/>} />
        <Route path='/human-resources/application' element={<LeaveApp/>} />
        <Route path='/human-resources/role' element={<Role/>} />
        <Route path='/human-resources/user' element={<PersonalInfo/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}
