import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";

//import "./style.css";

const Position = () => {
  const [tableData, setTableData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  let navigate = useNavigate();

  const handleAdd = () => {
    setCompany("");
    setPosition("");
    setShowAdd(true);
  };

  const handleAddSave = async ()=>{
    const response = await fetch("http://localhost:4000/api/hr/position/",{
      method: "POST",
      body: JSON.stringify({company, position}),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json()
    setTableData([]);
    setShowAdd(false);
    if(response.ok){
      console.log("New entry added")
    }else{
      console.log(response.error)
    }
    Swal.fire("Added!",  "success")
  }

 //delete an entry
 const handleDelete = async (id) =>{
  const response = await fetch("http://localhost:4000/api/hr/position/"+id,{
    method:"DELETE"
  })

  if(response.ok){
    console.log("Entry deleted successfully")
  }else{
      console.log(response.error)
  }
  Swal.fire("Deleted!",  "success")
}

 //edit an entry
 const handleEdit = (id,index) =>{
      setCompany(tableData[index].company);
      setPosition(tableData[index].position);
      setEditIndex(id)
      setShowEdit(true)
}

//handle edit save
const handleEditSave = async ()=>{
  const response = await fetch("http://localhost:4000/api/hr/position/"+editIndex,{
    method: "PATCH",
    body: JSON.stringify({company, position}),
    headers: {
      "content-type": "application/json"
    }
    
  })
  
  const data = await response.json()
  setTableData([]);
  setShowEdit(false);
  if(response.ok){
    console.log("Entry edited")
  }else{
    console.log(response.error)
  }
  Swal.fire("Updated!",  "success")
}
 //initial data loading from the databse
 useEffect(()=>{
  const fetchData = async () =>{
    const response = await fetch("http://localhost:4000/api/hr/position/")
    const data = await response.json()

    if(response.ok){
      setTableData(data)
    }
  }
  fetchData()
},[tableData])


  return (
    <div className="table-container">
      <div className="header">
      <Button onClick={() => navigate(-1)} className="bi bi-skip-backward-fill add-button btn-dark"></Button> 
        <h3 className="text">Position Details</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
        <i className="bi bi-database-add"></i>Add 
        </Button>
      </div>

      <Table bordered hover size="sm">
        <thead className="thead-light thead">
          <tr className="role-table-heading">
            <th>Company </th>
            <th>Position</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.company}</td>
              <td>{data.position}</td>
              <td className="actions-column">
                <i className="bi bi-pencil action-icons" onClick={() => handleEdit(data._id,index)}></i>
                <i className="bi bi-person-x-fill action-icons" onClick={() => handleDelete(data._id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text">Add New Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleAddSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text">Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Position;