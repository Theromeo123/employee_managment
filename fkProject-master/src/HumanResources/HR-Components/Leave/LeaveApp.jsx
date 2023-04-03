import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";


const LeaveApp = () => {
  const [tableData, setTableData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [fromeDate, setFromeDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  let navigate = useNavigate();

  const handleAdd = () => {
    setLeaveType("");
    setFromeDate("");
    setToDate("");
    setReason("");
    setStatus("");
    setShowAdd(true);
  };
  
  const handleAddSave = async ()=>{
    const response = await fetch("http://localhost:4000/api/hr/application/",{
      method: "POST",
      body: JSON.stringify({leaveType,fromeDate, toDate, reason, status }),
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

  const handleEdit = (id,index) => {
    setLeaveType(tableData[index].leaveType);
    setFromeDate(tableData[index].fromeDate);
    setToDate(tableData[index].toDate);
    setReason(tableData[index].reason);
    setStatus(tableData[index].status);
    setEditIndex(id);
    setShowEdit(true);
  };

  //handle edit save
const handleEditSave = async ()=>{
  const response = await fetch("http://localhost:4000/api/hr/applications/"+editIndex,{
    method: "PATCH",
    body: JSON.stringify({leaveType,fromeDate, toDate, reason, status}),
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


  //delete an entry
  const handleDelete = async (id) =>{
    const response = await fetch("http://localhost:4000/api/hr/application/"+id,{
      method:"DELETE"
    })
  
    if(response.ok){
      console.log("Entry deleted successfully")
    }else{
        console.log(response.error)
    }
    Swal.fire("Deleted!",  "success")
  }

  //initial data loading from the databse
 useEffect(()=>{
  const fetchData = async () =>{
    const response = await fetch("http://localhost:4000/api/hr/applications/")
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
      <Button onClick={() => navigate(-1)} className="back-button1">Back</Button> 
        <h3 className="text">Leave Application Details</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
        <i className="bi bi-plus-lg"></i>Add 
        </Button>
      </div>

      <Table bordered hover size="sm">
        <thead className="thead-light thead">
          <tr className="role-table-heading">
            <th>LeaveType</th>
            <th>FromeDate</th>
            <th>ToDate</th>
            <th>Reason</th>
            <th>Status</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.leaveType}</td>
              <td>{data.fromeDate}</td>
              <td>{data.toDate}</td>
              <td>{data.reason}</td>
              <td>{data.status}</td>
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
          <Modal.Title className="text">Add New Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>LeaveType</Form.Label>
              <Form.Control
                type="number"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>FromeDate</Form.Label>
              <Form.Control
                type="text"
                value={fromeDate}
                onChange={(e) =>setFromeDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>ToDate</Form.Label>
              <Form.Control
                type="text"
                value={toDate}
                onChange={(e) =>setToDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                value={reason}
                onChange={(e) =>setReason(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={status}
                onChange={(e) =>setStatus(e.target.value)}
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
          <Modal.Title className="text">Edit Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group>
              <Form.Label>LeaveType</Form.Label>
              <Form.Control
                type="text"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>FromeDate</Form.Label>
              <Form.Control
                type="text"
                value={fromeDate}
                onChange={(e) =>setFromeDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>ToDate</Form.Label>
              <Form.Control
                type="text"
                value={toDate}
                onChange={(e) =>setToDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                value={reason}
                onChange={(e) =>setReason(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={status}
                onChange={(e) =>setStatus(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleEditSave}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LeaveApp