import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";

//import "./style.css";

const TableData = [
  { company: "Alpha",  department: "1" },
  { company: "Cogni",  department: "2" },
  { company: "Apple",  department: "3" },
  { company: "Google",  department: "4" },
  
];

const Department = () => {
  const [tableData, setTableData] = useState(TableData);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  let navigate = useNavigate();

  const handleAdd = () => {
    setCompany("");
    setDepartment("");
    setShowAdd(true);
  };

  const handleAddSave = () => {
    setTableData([...tableData, { company, department }]);
    setShowAdd(false);
    Swal.fire("Submitted!",  "success")

  };

  const handleEdit = (index) => {
    setCompany(tableData[index].company);
    setDepartment(tableData[index].department);
    setEditIndex(index);
    setShowEdit(true);
  };

  const handleEditSave = () => {
    const newData = [...tableData];
    newData[editIndex] = { company, department };
    setTableData(newData);
    setShowEdit(false);
    Swal.fire("Submitted!",  "success")

  };

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };


  return (
    <div className="table-container">
      <div className="header">
      <Button onClick={() => navigate(-1)} className="bi bi-skip-backward-fill add-button btn-dark"></Button> 
        <h3 className="text">Department Details</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
        <i className="bi bi-database-add"></i>Add 
        </Button>
      </div>

      <Table bordered hover size="sm">
        <thead className="thead-light thead">
          <tr className="role-table-heading">
            <th>Company name</th>
            <th>Department</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.company}</td>
              <td>{data.department}</td>
              <td className="actions-column">
                <i className="bi bi-pencil action-icons" onClick={() => handleEdit(index)}></i>
                <i className="bi bi-person-x-fill action-icons" onClick={() => handleDelete(index)}></i>
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
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={department}
                onChange={(e) =>setDepartment(e.target.value)}
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
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
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

export default Department