import React from 'react'
import { Button, Table } from 'react-bootstrap';
import Employee from './role';
import { FaEdit } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
//import '../Home.css';

//import "bootstrap/dist/css/bootstrap.min.css";

function Home(id) {
  let history = useNavigate();
  const handleEdit = (id, company, role) => {
    localStorage.setItem('company', company);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
  }
  const handleDelete = (e) => {
    Employee.filter((item) => {
      console.log(item.id)
      console.log(e)

      // return item.id
    })
    console.log(Employee)
    // Employee.splice(id,1)
    history('/portal_master')
  }
  return (
    <>
      <div>
        <nav className='navbar shadow-sm'>
          <div className="container-fluid header">
            <Button onClick={() => history(-1)} className="back-button1">Back</Button>
            <h3>Portal Details</h3>
            <Link to="/add">
              <button type="button" className="add-button btn-dark">+Add</button>
            </Link>
          </div>
        </nav>
        <Table striped border hover size='sm'>
          <thead className="thead">
            <tr className="role-table-heading">
              <th>Portal </th>
              <th className='text-center'>Status</th>
              <th className='text-center actions-column'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Employee && Employee.length > 0
                ?
                Employee.map((item) => {
                  return (
                    <tr>

                      <td>{item.company}</td>
                      <td className='text-center' >{item.role}</td>
                      <td className='text-end actions-column'>
                        <Link to={'/edit'}>
                          <FaEdit style={{fontSize:"25px",color:"#333"}} onClick={() => handleEdit(item.id, item.company, item.role)} />
                        </Link>
                        &nbsp;
                        <BsFillTrashFill style={{fontSize:"25px"}}  onClick={(e) => handleDelete(item.id)} alert='are you sure' />
                      </td>
                    </tr>
                  )

                })
                :
                "No data available"
            }
          </tbody>
        </Table>
      </div>
    </>

  )
}

export default Home



